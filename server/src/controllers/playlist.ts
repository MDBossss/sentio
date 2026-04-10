import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createPlaylist, getPlaylistsByUserId, getPlaylistById, addSharedPlaylist, getSharedPlaylistsByUserId } from "../service/playlist";
import { getPresetsForUser } from "../service/presets";
import { enrichSongsWithYouTube } from "../service/youtube";
import { mockSongs } from "../mocks/songs";
import { PlaylistRequest } from "../types";

const prisma = new PrismaClient();

export async function generatePlaylist(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { prompt, userId } = req.body as {
      prompt: string;
      userId: string;
    };

    // Validation
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      res.status(400).json({ error: "Valid prompt is required" });
      return;
    }

    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      res.status(400).json({ error: "Valid userId is required" });
      return;
    }

    // Fetch user preferences from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Parse user preferences to extract genres and familiarity
    let genres: string[] = ["Pop", "Rock", "Hip-Hop"]; // Default genres
    let familiarity: "mainstream" | "discovery" | "mixed" = "mixed";

    if (user.preferences) {
      try {
        const preferences = JSON.parse(user.preferences) as {
          genres?: string[];
          familiarity?: string;
        };
        if (
          Array.isArray(preferences.genres) &&
          preferences.genres.length > 0
        ) {
          genres = preferences.genres;
        }
        if (
          preferences.familiarity === "mainstream" ||
          preferences.familiarity === "discovery" ||
          preferences.familiarity === "mixed"
        ) {
          familiarity = preferences.familiarity;
        }
      } catch (e) {
        console.warn("Failed to parse user preferences, using defaults:", e);
      }
    }

    // Call service to handle business logic with genres from preferences
    const playlist = await createPlaylist(prompt, genres, userId, familiarity);

    res.status(201).json(playlist);
  } catch (error) {
    console.error("Error in generatePlaylist controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}

export async function testYouTubeEnrichment(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { songs, userId } = req.body as {
      songs?: Array<{ artist: string; title: string }>;
      userId?: string;
    };

    // Use provided songs or mock songs for testing
    const songsToEnrich = songs || mockSongs;

    if (!Array.isArray(songsToEnrich) || songsToEnrich.length === 0) {
      res.status(400).json({ error: "At least one song is required" });
      return;
    }

    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      res.status(400).json({ error: "Valid userId is required" });
      return;
    }

    console.log(
      `Testing YouTube enrichment with ${songsToEnrich.length} songs...`,
    );

    // Enrich with YouTube data
    const enrichedSongs = await enrichSongsWithYouTube(songsToEnrich);

    if (enrichedSongs.length === 0) {
      res.status(400).json({ error: "Failed to enrich any songs" });
      return;
    }

    // Save to database as a playlist
    const title = "Test Playlist";
    const prompt = "YouTube enrichment test";

    const playlist = await prisma.playlist.create({
      data: {
        prompt,
        title,
        userId,
        songs: {
          create: enrichedSongs.map((song) => ({
            title: song.title,
            artist: song.artist,
            videoId: song.videoId,
            thumbnail: song.thumbnail,
          })),
        },
      },
      include: {
        songs: true,
      },
    });

    res.status(201).json({
      id: playlist.id,
      prompt: playlist.prompt,
      title: playlist.title,
      songs: playlist.songs.map((song) => ({
        title: song.title,
        artist: song.artist,
        videoId: song.videoId,
        thumbnail: song.thumbnail || "",
      })),
      createdAt: playlist.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Error in testYouTubeEnrichment controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}

export async function getUserPlaylists(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { userId } = req.params as { userId: string };

    // Validation
    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      res.status(400).json({ error: "Valid userId is required" });
      return;
    }

    // Call service to get playlists
    const playlists = await getPlaylistsByUserId(userId);

    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error in getUserPlaylists controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}

export async function getPresets(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params as { userId: string };

    // Validation
    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      res.status(400).json({ error: "Valid userId is required" });
      return;
    }

    // Call service to get presets
    const presets = await getPresetsForUser(userId);

    // Return presets - can be empty if user has no preferences
    res.status(200).json({ presets });
  } catch (error) {
    console.error("Error in getPresets controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}

export async function getSharedPlaylist(req: Request, res: Response): Promise<void> {
  try {
    const { playlistId } = req.params as { playlistId: string };

    if (!playlistId || typeof playlistId !== "string" || playlistId.trim().length === 0) {
      res.status(400).json({ error: "Valid playlistId is required" });
      return;
    }

    const playlist = await getPlaylistById(playlistId);

    if (!playlist) {
      res.status(404).json({ error: "Playlist not found" });
      return;
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error in getSharedPlaylist controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}

export async function addShared(req: Request, res: Response): Promise<void> {
  try {
    const { playlistId, userId } = req.body as {
      playlistId: string;
      userId: string;
    };

    if (!playlistId || typeof playlistId !== "string" || playlistId.trim().length === 0) {
      res.status(400).json({ error: "Valid playlistId is required" });
      return;
    }

    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      res.status(400).json({ error: "Valid userId is required" });
      return;
    }

    const sharedPlaylist = await addSharedPlaylist(playlistId, userId);

    res.status(201).json(sharedPlaylist);
  } catch (error) {
    console.error("Error in addShared controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}

export async function getUserSharedPlaylists(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params as { userId: string };

    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      res.status(400).json({ error: "Valid userId is required" });
      return;
    }

    const sharedPlaylists = await getSharedPlaylistsByUserId(userId);

    res.status(200).json(sharedPlaylists);
  } catch (error) {
    console.error("Error in getUserSharedPlaylists controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}
