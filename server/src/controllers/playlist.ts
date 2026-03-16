import { Request, Response } from "express";
import { createPlaylist } from "../service/playlist";
import { enrichSongsWithYouTube } from "../service/youtube";
import { mockSongs } from "../mocks/songs";
import { PlaylistRequest } from "../types";

export async function generatePlaylist(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { prompt, genres } = req.body as PlaylistRequest;

    // Validation
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      res.status(400).json({ error: "Valid prompt is required" });
      return;
    }

    if (!Array.isArray(genres) || genres.length === 0) {
      res.status(400).json({ error: "At least one genre is required" });
      return;
    }

    // Call service to handle business logic
    const playlist = await createPlaylist(prompt, genres);

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
    const { songs } = req.body as {
      songs?: Array<{ artist: string; title: string }>;
    };

    // Use provided songs or mock songs for testing
    const songsToEnrich = songs || mockSongs;

    if (!Array.isArray(songsToEnrich) || songsToEnrich.length === 0) {
      res.status(400).json({ error: "At least one song is required" });
      return;
    }

    console.log(
      `Testing YouTube enrichment with ${songsToEnrich.length} songs...`,
    );

    // Enrich with YouTube data only
    const enrichedSongs = await enrichSongsWithYouTube(songsToEnrich);

    res.status(200).json({
      message: `Successfully enriched ${enrichedSongs.length} songs`,
      songs: enrichedSongs,
    });
  } catch (error) {
    console.error("Error in testYouTubeEnrichment controller:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
}
