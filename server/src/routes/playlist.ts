import { Router, Router as ExpressRouter } from "express";
import {
  generatePlaylist,
  testYouTubeEnrichment,
  getUserPlaylists,
  getPresets,
  getSharedPlaylist,
  addShared,
  getUserSharedPlaylists,
} from "../controllers/playlist";

const router: ExpressRouter = Router();

router.post("/api/generate-playlist", generatePlaylist);
router.get("/api/playlists/:userId", getUserPlaylists);
router.get("/api/presets/:userId", getPresets);
router.post("/api/test/enrich-youtube", testYouTubeEnrichment);
router.get("/api/playlists/shared/:playlistId", getSharedPlaylist);
router.post("/api/playlists/shared", addShared);
router.get("/api/shared/:userId", getUserSharedPlaylists);

export default router;
