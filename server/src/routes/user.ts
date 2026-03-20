import { Router, Router as ExpressRouter } from "express";
import {
  createUser,
  getUserById,
  getUserPreferences,
  updateUserPreferences,
} from "../controllers/user";

const router: ExpressRouter = Router();

/**
 * POST /api/users - Create a new user
 * Body: { id, firstName, lastName, email, imageUrl? }
 */
router.post("/api/users", createUser);

/**
 * GET /api/users/:id - Get user by ID (Clerk ID)
 * POST /api/users/:id - Get user or create if needed
 * Body (POST): { firstName, lastName, email }
 */
router.get("/api/users/:id", getUserById);
router.post("/api/users/:id", getUserById); // Reuse same handler for both GET and POST

/**
 * GET /api/users/:id/preferences - Get user preferences
 * Returns: { preferences: null | { familiarity, genres } }
 */
router.get("/api/users/:id/preferences", getUserPreferences);

/**
 * PUT /api/users/:id/preferences - Update user preferences
 * Body: { familiarity: "mainstream" | "discovery" | "mixed", genres: string[] }
 */
router.put("/api/users/:id/preferences", updateUserPreferences);

export default router;
