import { Router, Router as ExpressRouter } from "express";
import {
  generatePlaylist,
  testYouTubeEnrichment,
} from "../controllers/playlist";

const router: ExpressRouter = Router();

router.post("/api/generate-playlist", generatePlaylist);
router.post("/api/test/enrich-youtube", testYouTubeEnrichment);

export default router;
