import OpenAI from "openai";
import { OpenAISongResponse } from "../types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePlaylistSongs(
  prompt: string,
  genres: string[],
  familiarity: "mainstream" | "discovery" | "mixed" = "mixed",
): Promise<OpenAISongResponse> {
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
            'You are a music expert. Return ONLY a JSON object with the following shape: { "title": "<playlist title>", "songs": [{ "artist": "...", "title": "..." }, ...] }. The "title" should be a short, catchy playlist title derived from the prompt (max 100 chars). Do NOT include any extra prose or commentary — return only valid JSON.',
        },
        {
          role: "user",
          content: `Generate 10 songs based on this prompt: "${prompt}". Genres: ${genresList}. Music discovery preference: ${familiarityGuide[familiarity]}. Return only JSON with a top-level title and a songs array.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = message.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(content) as OpenAISongResponse;
    return parsed;
  } catch (error) {
    console.error("Error generating playlist songs:", error);
    throw new Error(
      `Failed to generate playlist: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
