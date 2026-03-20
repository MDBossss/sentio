import { Router, Router as ExpressRouter } from "express";
import {
  generatePlaylist,
  testYouTubeEnrichment,
  getUserPlaylists,
  getPresets,
} from "../controllers/playlist";

const router: ExpressRouter = Router();

router.post("/api/generate-playlist", generatePlaylist);
router.get("/api/playlists/:userId", getUserPlaylists);
router.get("/api/presets/:userId", getPresets);
router.post("/api/test/enrich-youtube", testYouTubeEnrichment);

export default router;
