import { PrismaClient } from "@prisma/client";
import { generatePlaylistSongs } from "./openai";
import { enrichSongsWithYouTube } from "./youtube";
import { PlaylistResponse } from "../types";

const prisma = new PrismaClient();

export async function createPlaylist(
  prompt: string,
  genres: string[],
  userId: string,
  familiarity: "mainstream" | "discovery" | "mixed" = "mixed",
): Promise<PlaylistResponse> {
  // Generate songs using OpenAI with user preferences
  console.log(
    `Generating songs for prompt: "${prompt}" with genres: ${genres.join(", ")} and familiarity: ${familiarity}`,
  );
  const aiResult = await generatePlaylistSongs(prompt, genres, familiarity);

  const songsList = aiResult.songs || [];

  if (songsList.length === 0) {
    throw new Error("Failed to generate songs from OpenAI");
  }

  console.log(
    `Generated ${songsList.length} songs, enriching with YouTube data...`,
  );

  // Enrich songs with YouTube data
  const enrichedSongs = await enrichSongsWithYouTube(songsList);

  if (enrichedSongs.length === 0) {
    throw new Error("Failed to enrich songs with YouTube data");
  }

  // Prefer title returned by AI; otherwise fall back to the prompt-derived title
  const aiTitle = aiResult.title?.trim();
  const title =
    (aiTitle && aiTitle.substring(0, 100)) ||
    prompt.split(".")[0].substring(0, 100) ||
    "New Playlist";

  // Save to database
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

  return {
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
  };
}

export async function getPlaylistsByUserId(
  userId: string,
): Promise<PlaylistResponse[]> {
  // Fetch all playlists for the user
  const playlists = await prisma.playlist.findMany({
    where: {
      userId,
    },
    include: {
      songs: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Transform to response format
  return playlists.map((playlist) => ({
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
  }));
}
