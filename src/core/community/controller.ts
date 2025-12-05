import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { validateCreateCommunityBody } from "./utils.js";
import type { CreateCommunityRequest } from "./requests.js";
import { createNewCommunity, subscribeToCommunity as subscribeToCommunityService, getCommunityByName as getCommunityByNameService, getPostsByCommunity as getPostsByCommunityService } from "./service.js";

const createCommunity = asyncHandler(async (req: Request, res: Response) => {
    const error = validateCreateCommunityBody(req.body);

    if (error) {
        res.status(400).json({ message: error });
        return;
    }

    const request = req.body as CreateCommunityRequest;

    try {
        const community = await createNewCommunity(request, req.user!);

        res.status(201).json({
            data: {
                community
            },
            error: false
        });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }

});

const subscribeToCommunity = asyncHandler(async (req: Request, res: Response) => {
    const { communityName } = req.params;

    if (!communityName) {
        res.status(400).json({ message: "Community name is required" });
        return;
    }

    try {
        await subscribeToCommunityService(communityName, req.user!);

        res.status(200).json({
            data: {
                success: true
            },
            error: false
        });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

const getCommunityByName = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;

    if (!name) {
        res.status(400).json({ message: "Community name is required" });
        return;
    }

    try {
        const community = await getCommunityByNameService(name);

        if (!community) {
            res.status(404).json({ message: "Community not found" });
            return;
        }

        res.status(200).json({
            data: {
                community
            },
            error: false
        });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

const getPostsByCommunity = asyncHandler(async (req: Request, res: Response) => {
    const { communityName } = req.params;

    if (!communityName) {
        res.status(400).json({ message: "Community name is required" });
        return;
    }

    try {
        const posts = await getPostsByCommunityService(communityName);
        res.status(200).json({
            data: {
                posts
            },
            error: false
        });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export {
    createCommunity,
    subscribeToCommunity,
    getCommunityByName,
    getPostsByCommunity
};