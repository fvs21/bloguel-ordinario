import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../user/models.js';
import type { RegisterRequest } from './requests.js';
import type { User as UserT } from '../user/types.js';

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const createUser = async (data: RegisterRequest): Promise<UserT> => {
    if (await User.findOne({ $or: [ { email: data.email }, { username: data.username } ] })) {
        throw new Error('User with given email or username already exists');
    }

    const passwordHash = await hashPassword(data.password);

    const user = await User.create({
        username: data.username,
        name: data.name,
        email: data.email,
        password: passwordHash
    });

    return user;
}

const login = async (username: string, password: string): Promise<InstanceType<typeof User> | null> => {
    const user = await User.findOne({username});

    if (!user) 
        return null;

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
        return null;

    return user;
}

const generateTokenPair = (userId: string): { accessToken: string; refreshToken: string } => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '30d' });

    return { accessToken, refreshToken };
}

export {
    hashPassword,
    login,
    generateTokenPair,
    createUser
};