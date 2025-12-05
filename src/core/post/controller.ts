import asyncHandler from 'express-async-handler';
import { createPost, votePost, commentOnPost } from './service.js';
import { validateCreatePostData } from './utils.js';

const createPostController = asyncHandler(async (req, res) => {
    const user = req.user;
    const data = req.body;

    const error = validateCreatePostData(data);

    if (error) {
        res.status(400).json({ message: error });
        return;
    }

    try {
        const post = await createPost(user, data);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error });
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

export {
    createPostController,
    votePostController,
    commentController
}