import { PrismaClient } from "@prisma/client";
import { genrePresets, TimeOfDay, Preset } from "../constants/presets";

const prisma = new PrismaClient();

export interface UserPreferences {
  familiarity: "mainstream" | "discovery" | "mixed";
  genres: string[];
}

export interface PresetSuggestion extends Preset {
  genre: string;
}

/**
 * Calculate current time of day on server
 * morning: 5-11, afternoon: 11-17, evening: 17-22, night: 22-5
 */
function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

/**
 * Randomly select n items from an array
 */
function getRandomItems<T>(array: T[], count: number): T[] {
  if (array.length === 0) return [];

  const result: T[] = [];
  const remaining = [...array];

  for (let i = 0; i < Math.min(count, array.length); i++) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    result.push(remaining[randomIndex]);
    remaining.splice(randomIndex, 1);
  }

  return result;
}

/**
 * Get user preferences from database
 */
async function getUserPreferences(
  userId: string,
): Promise<UserPreferences | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true },
    });

    if (!user || !user.preferences) {
      return null;
    }

    return JSON.parse(user.preferences);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return null;
  }
}

/**
 * Get 3 preset suggestions for user based on their preferences and current time
 * Returns presets personalized by genre and time of day
 */
export async function getPresetsForUser(
  userId: string,
): Promise<PresetSuggestion[]> {
  // Get user preferences
  const preferences = await getUserPreferences(userId);

  if (!preferences || preferences.genres.length === 0) {
    console.warn(`User ${userId} has no preferences or genres set`);
    return [];
  }

  // Get current time of day
  const timeOfDay = getTimeOfDay();
  console.log(
    `Getting presets for user ${userId}, time: ${timeOfDay}, genres: ${preferences.genres.join(", ")}`,
  );

  // Randomly select up to 3 genres from user's preferences
  // If user has fewer than 3 genres, may get duplicates in presets
  const selectedGenres = getRandomItems(preferences.genres, 3);

  // Build presets from selected genres
  const presets: PresetSuggestion[] = [];

  for (const genre of selectedGenres) {
    // Get presets for this genre at this time
    const genreTimePresets = genrePresets[genre]?.[timeOfDay];

    if (genreTimePresets && genreTimePresets.length > 0) {
      // Pick one random preset from available options
      const randomPreset =
        genreTimePresets[Math.floor(Math.random() * genreTimePresets.length)];

      presets.push({
        emoji: randomPreset.emoji,
        text: randomPreset.text,
        description: randomPreset.description,
        genre,
      });
    }
  }

  return presets;
}
