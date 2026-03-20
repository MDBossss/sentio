import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { id, firstName, lastName, email, imageUrl } = req.body;

    // Validation
    if (!id || !email || !firstName || !lastName) {
      res.status(400).json({
        error: "Missing required fields: id, firstName, lastName, email",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    // Create new user with preferences initialized as null
    const newUser = await prisma.user.create({
      data: {
        id,
        firstName,
        lastName,
        email,
        imageUrl: imageUrl || null,
        preferences: null, // Preferences will be filled after onboarding questionnaire
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Error) {
      // Handle Prisma unique constraint error
      if (error.message.includes("Unique constraint failed")) {
        res.status(409).json({ error: "Email already exists" });
        return;
      }
    }
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    let user = await prisma.user.findUnique({
      where: { id },
    });

    // If user doesn't exist and we have user info, create them
    if (!user && (firstName || lastName || email)) {
      console.log(`[UserController] Auto-creating user: ${id}`);
      user = await prisma.user.create({
        data: {
          id,
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          preferences: null,
        },
      });
      res.status(201).json(user);
      return;
    }

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

/**
 * Get user preferences
 * Returns { preferences: null | { familiarity, genres } }
 */
export async function getUserPreferences(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { preferences: true },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Parse preferences JSON string or return null
    const preferences = user.preferences ? JSON.parse(user.preferences) : null;

    res.status(200).json({ preferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
}

/**
 * Update user preferences
 * Body: { familiarity: "mainstream" | "discovery" | "mixed", genres: string[], firstName?, lastName?, email? }
 */
export async function updateUserPreferences(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = req.params;
    const { familiarity, genres, firstName, lastName, email } = req.body;

    // Validation
    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const validFamiliarities = ["mainstream", "discovery", "mixed"];
    if (!familiarity || !validFamiliarities.includes(familiarity)) {
      res.status(400).json({
        error: `Familiarity must be one of: ${validFamiliarities.join(", ")}`,
      });
      return;
    }

    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      res.status(400).json({
        error: "Genres must be a non-empty array of strings",
      });
      return;
    }

    // Store preferences as JSON string
    const preferencesJson = JSON.stringify({ familiarity, genres });

    // Check if user exists
    let existingUser = await prisma.user.findUnique({
      where: { id },
    });

    // If user doesn't exist, create them with provided info
    if (!existingUser) {
      if (!firstName || !lastName || !email) {
        res.status(400).json({
          error:
            "New user requires firstName, lastName, and email to be provided",
        });
        return;
      }

      console.log(`[UserController] Auto-creating new user: ${id}`);
      existingUser = await prisma.user.create({
        data: {
          id,
          firstName,
          lastName,
          email,
          preferences: preferencesJson,
        },
      });

      res.status(201).json(existingUser);
      return;
    }

    // Update existing user's preferences
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { preferences: preferencesJson },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ error: "Failed to update preferences" });
  }
}
