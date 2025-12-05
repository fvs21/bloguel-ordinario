import asyncHandler from 'express-async-handler';
import { createPost, votePost, commentOnPost, getPost } from './service.js';
import { validateCreatePostData } from './utils.js';

const createPostController = asyncHandler(async (req, res) => {
    const user = req.user;
    const data = req.body;
    const communityName = req.params.communityName;

    if (!communityName) {
        res.status(400).json({ message: "Community name is required" });
        return;
    }

    const error = validateCreatePostData(data);

    if (error) {
        res.status(400).json({ message: error });
        return;
    }

    try {
        const post = await createPost(user, communityName, data);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

const votePostController = asyncHandler(async (req, res) => {
    const user = req.user;
    const body = req.body;
    const postId = req.params.postId;

    if (!body || !postId || !body.voteType || (body.voteType !== 'upvote' && body.voteType !== 'downvote')) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    try {
        await votePost(user, postId, body.voteType);
        res.status(200).json({ message: "Vote recorded successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

const commentController = asyncHandler(async (req, res) => {
    const user = req.user;
    const body = req.body;

    const postId = req.params.postId;

    if (!body || !postId || !body.content) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    try {
        const comment = await commentOnPost(user, postId, body.content);
        res.status(201).json(comment);
    } catch(error) {
        res.status(400).json({ message: error });
    }
});

const getPostController = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        res.status(400).json({ message: "Post ID is required" });
        return;
    }

    try {
        const post = await getPost(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }

});

export {
    createPostController,
    votePostController,
    commentController,
    getPostController
}