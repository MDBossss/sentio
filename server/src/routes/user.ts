import { Router, Router as ExpressRouter } from "express";
import { createUser, getUserById } from "../controllers/user";

const router: ExpressRouter = Router();

/**
 * POST /api/users - Create a new user
 * Body: { id, firstName, lastName, email, imageUrl? }
 */
router.post("/api/users", createUser);

/**
 * GET /api/users/:id - Get user by ID (Clerk ID)
 */
router.get("/api/users/:id", getUserById);

export default router;
