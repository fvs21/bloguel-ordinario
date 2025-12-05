import { updateProfileController } from "./controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.put("/profile", updateProfileController);

export default userRouter;