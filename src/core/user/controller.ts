import asyncHandler from 'express-async-handler';
import { validateUpdateProfile } from './utils.js';
import { updateProfile } from './service.js';

const updateProfileController = asyncHandler(async (req, res) => {
    const user = req.user;
    const body = req.body;

    const error = validateUpdateProfile(body);

    if (error) {
        res.status(400).json({ message: error });
        return;
    }

    try {
        const updatedProfile = await updateProfile(user._id, body);
        res.status(200).json(updatedProfile);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { updateProfileController };