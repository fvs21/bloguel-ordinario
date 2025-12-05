import express from 'express';
import { createPostController, votePostController, commentController } from '../post/controller.js';
import protect from '../../middleware/auth.js';

const postRouter = express.Router();

postRouter.post('/', protect, createPostController);
postRouter.post('/:postId/vote', protect, votePostController);
postRouter.post('/:postId/comment', protect, commentController);

export default postRouter;