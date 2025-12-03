import express from "express";
import protect from "../../middleware/auth.js";
import { createCommunity } from "./controller.js";

const router = express.Router();

router.post("/", protect, createCommunity);

export default router;