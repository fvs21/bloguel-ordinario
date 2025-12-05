import express from "express";
import protect from "../../middleware/auth.js";
import { createCommunity, subscribeToCommunity, getCommunityByName, getPostsByCommunity } from "./controller.js";

const router = express.Router();

router.post("/", protect, createCommunity);
router.post("/:communityName/subscribe", protect, subscribeToCommunity);
router.get("/:name", getCommunityByName);
router.get("/:communityName/posts", getPostsByCommunity);

export default router;