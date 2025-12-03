import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { validateCreateCommunityBody } from "./utils.js";
import type { CreateCommunityRequest } from "./requests.js";
import { createNewCommunity } from "./service.js";

const createCommunity = asyncHandler(async (req: Request, res: Response) => {
    const error = validateCreateCommunityBody(req.body);

    if (error) {
        res.status(400);
        throw new Error(error);
    }

    const request = req.body as CreateCommunityRequest;

    const community = await createNewCommunity(request, req.user!);

    res.status(201).json({
        data: {
            community
        },
        error: false
    });

});

export {
    createCommunity
};