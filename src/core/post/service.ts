import type { User as UT } from "../user/types.js"
import type { CreatePostRequest } from "./requests.js"
import { Community } from "../community/models.js"
import { Subscription } from "../community/models.js"
import { Post } from "./models.js"
import type { Post as PT } from "./types.js"
import { Vote } from "./models.js"
import { Comment } from "./models.js"
import type { Comment as CT } from "./types.js"

const createPost = async (user: UT, data: CreatePostRequest): Promise<PT> => {
    const community = await Community.findById(data.communityId);

    if (!community) {
        throw new Error("Community not found");
    }

    const isSubscribed = await Subscription.findOne({
        userId: user._id,
        communityId: community._id
    });

    if (!isSubscribed) {
        throw new Error("User is not subscribed to the community");
    }

    const post = await Post.create({
        community: community._id,
        title: data.title,
        content: data.content,
        createdBy: user._id
    });

    return post;
}

const votePost = async (user: UT, postId: string, voteType: 'upvote' | 'downvote') => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post not found");
    }

    let vote = await Vote.findOne({
        userId: user._id,
        postId: post._id
    });

    if (vote) {
        if (vote.voteType === voteType) {
            vote.deleteOne();
            return;
        }

        vote.voteType = voteType;
        await vote.save();
        return;
    }

    vote = await Vote.create({
        userId: user._id,
        postId: post._id,
        voteType: voteType
    });

    if (voteType === 'upvote') {
        post.upvoteCount += 1;
    } else if (voteType === 'downvote') {
        post.downvoteCount += 1;
    } else {
        throw new Error("Invalid vote type");
    }

    await post.save();
}

const commentOnPost = async (user: UT, postId: string, content: string): Promise<CT> => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post not found");
    }

    const comment = await Comment.create({
        postId: post._id,
        userId: user._id,
        content: content
    });

    return comment;
}

export {
    createPost,
    votePost,
    commentOnPost
};