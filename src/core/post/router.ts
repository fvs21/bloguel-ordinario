import express from 'express';
import { createPostController, votePostController, commentController, getPostController } from '../post/controller.js';
import protect from '../../middleware/auth.js';

const postRouter = express.Router();

postRouter.post('/:communityName', protect, createPostController);
postRouter.get('/:postId', protect, getPostController);
postRouter.post('/:postId/vote', protect, votePostController);
postRouter.post('/:postId/comment', protect, commentController);

export default postRouter;