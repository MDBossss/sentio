import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import playlistRouter from "./routes/playlist";
import userRouter from "./routes/user";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3010;

// CORS configuration for MFE ports
const corsOptions = {
  origin: [
    "http://localhost:3000", // Shell app
    "http://localhost:3001", // Player app
    "http://localhost:3002", // Search app
    "http://localhost:3003", // Library app
  ],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// User routes
app.use(userRouter);

// Playlist routes
app.use(playlistRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CORS enabled for: ${corsOptions.origin.join(", ")}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});
