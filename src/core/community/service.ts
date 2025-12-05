import type { User } from "../user/types.js";
import type { CreateCommunityRequest } from "./requests.js";
import type { Community as CommunityT } from "./types.js";
import { Community, Subscription } from "./models.js";
import { Post } from "../post/models.js";
import type { Post as PostT } from "../post/types.js";

const createNewCommunity = async (data: CreateCommunityRequest, user: User): Promise<CommunityT> => {
    const exists = await Community.findOne({ name: data.name });

    if (exists)
        throw new Error('Community with given name already exists');

    const community = await Community.create({
        name: data.name,
        title: data.title,
        description: data.description || '',
        createdBy: user.id
    });

    await Subscription.create({
        communityId: community._id,
        userId: user.id,
    });

    return community;
}

const subscribeToCommunity = async (communityName: string, user: User): Promise<void> => {
    const community = await Community.findOne({ name: communityName });

    if (!community) {
        throw new Error('Community not found');
    }

    const existingSubscription = await Subscription.findOne({
        communityId: community._id,
        userId: user.id
    });

    if (existingSubscription) {
        throw new Error('User already subscribed to this community');
    }

    await Subscription.create({
        communityId: community._id,
        userId: user.id
    });
}

const getCommunityByName = async (name: string): Promise<CommunityT | null> => {
    return await Community.findOne({ name });
}

const getPostsByCommunity = async (communityName: string): Promise<PostT[]> => {
    const community = await Community.findOne({ name: communityName });

    if (!community) {
        throw new Error('Community not found');
    }

    const posts = await Post.find({ community: community._id }).populate('createdBy', 'username').sort({ createdAt: -1 });
    return posts;
}

export {
    createNewCommunity,
    subscribeToCommunity,
    getCommunityByName,
    getPostsByCommunity
};