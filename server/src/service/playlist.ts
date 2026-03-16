import { PrismaClient } from "@prisma/client";
import { generatePlaylistSongs } from "./openai";
import { enrichSongsWithYouTube } from "./youtube";
import { PlaylistResponse } from "../types";

const prisma = new PrismaClient();

export async function createPlaylist(
  prompt: string,
  genres: string[],
): Promise<PlaylistResponse> {
  // Generate songs using OpenAI
  console.log(
    `Generating songs for prompt: "${prompt}" with genres: ${genres.join(", ")}`,
  );
  const songsList = await generatePlaylistSongs(prompt, genres);

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

  // Generate title from prompt (take first part or use default)
  const title = prompt.split(".")[0].substring(0, 100) || "New Playlist";

  // Save to database
  const playlist = await prisma.playlist.create({
    data: {
      prompt,
      title,
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
