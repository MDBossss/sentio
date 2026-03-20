import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createPlaylist, getPlaylistsByUserId } from "../service/playlist";
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
    const { prompt, genres, userId } = req.body as PlaylistRequest & {
      userId: string;
    };

    // Validation
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      res.status(400).json({ error: "Valid prompt is required" });
      return;
    }

    if (!Array.isArray(genres) || genres.length === 0) {
      res.status(400).json({ error: "At least one genre is required" });
      return;
    }

    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
      res.status(400).json({ error: "Valid userId is required" });
      return;
    }

    // Call service to handle business logic
    const playlist = await createPlaylist(prompt, genres, userId);

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
