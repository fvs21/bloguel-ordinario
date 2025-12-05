import protect from "../../middleware/auth.js";
import { updateProfileController } from "./controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.put("/profile", protect, updateProfileController);

export default userRouter;