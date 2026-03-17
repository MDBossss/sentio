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

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        id,
        firstName,
        lastName,
        email,
        imageUrl: imageUrl || null,
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

    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

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
