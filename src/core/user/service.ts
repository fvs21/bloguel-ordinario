import { Profile } from "./models.js";
import type { UpdateProfileRequest } from "./requests.js";
import type { Profile as PT } from "./types.js";

const updateProfile = async (userId: string, data: UpdateProfileRequest): Promise<PT> => {
    const profile = await Profile.findOne({ userId });

    if (!profile) 
        return Profile.create({ userId, ...data });

    profile.bio = data.bio;

    if (data.birthdate !== undefined) {
        profile.birthdate = new Date(data.birthdate);
    }

    if (data.major !== undefined) {
        profile.major = data.major;
    }

    if (data.semester !== undefined) {
        profile.semester = data.semester;
    }

    await profile.save();
    
    return profile;
}

export { updateProfile };