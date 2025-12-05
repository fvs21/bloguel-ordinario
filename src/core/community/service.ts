import type { User } from "../user/types.js";
import type { CreateCommunityRequest } from "./requests.js";
import type { Community as CommunityT } from "./types.js";
import { Community } from "./models.js";

const createNewCommunity = async (data: CreateCommunityRequest, user: User): Promise<CommunityT> => {
    const exists = await Community.findOne({ name: data.name });

    if (exists)
        throw new Error('Community with given name already exists');

    const community = Community.create({
        name: data.name,
        title: data.title,
        description: data.description || '',
        createdBy: user.id
    });

    return community;
}

const subscribeToCommunity = async (communityId: string, user: User): Promise<void> => {
    
}

const getCommunityByName = async (name: string): Promise<CommunityT | null> => {
    return await Community.findOne({ name });
}

export {
    createNewCommunity
};