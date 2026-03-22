import OpenAI from "openai";
import { OpenAISongResponse } from "../types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePlaylistSongs(
  prompt: string,
  genres: string[],
  familiarity: "mainstream" | "discovery" | "mixed" = "mixed",
): Promise<Array<{ artist: string; title: string }>> {
  try {
    const genresList = genres.join(", ");
    const familiarityGuide = {
      mainstream: "well-known, popular artists and songs",
      discovery: "lesser-known gems and underrated artists",
      mixed: "mix of both popular and lesser-known songs",
    };

    const message = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            'You are a music expert. Return ONLY a JSON array of objects with "songs" key containing array of objects with "artist" and "title" keys. No prose, only valid JSON.',
        },
        {
          role: "user",
          content: `Generate 10 songs based on this prompt: "${prompt}". Genres: ${genresList}. Music discovery preference: ${familiarityGuide[familiarity]}. Return only JSON.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = message.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(content) as OpenAISongResponse;
    return parsed.songs;
  } catch (error) {
    console.error("Error generating playlist songs:", error);
    throw new Error(
      `Failed to generate playlist: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
