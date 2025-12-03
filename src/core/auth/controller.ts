import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { type RegisterRequest, type LoginRequest } from "./requests.js";
import { validateRegistrationBody, validateLoginBody } from "./utils.js";
import { createUser, generateTokenPair, login } from "./service.js";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const error = validateRegistrationBody(req.body);

    if (error) {
        res.status(400);
        throw new Error(error);
    }

    let user

    try {
        user = await createUser(req.body as RegisterRequest);
    } catch(e) {
        res.status(400);
        throw e;
    }

    const { accessToken, refreshToken } = generateTokenPair(user._id.toString());

    res.setHeader("Cookie", `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=2592000`);

    if (user) {
        res.status(201).json({
            data: {
                user: {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                accessToken
            },
            error: false
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const error = validateLoginBody(req.body);

    if (error) {
        res.status(400);
        throw new Error(error);
    }

    const { username, password }: LoginRequest = req.body;

    const user = await login(username, password);

    if (!user) {
        res.status(401);
        throw new Error("Invalid username or password");
    }

    const { accessToken, refreshToken } = generateTokenPair(user._id.toString());

    res.setHeader("Cookie", `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=2592000`);

    res.status(200).json({
        data: {
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            accessToken
        },
        error: false
    });
    
});

export {
    registerUser,
    loginUser
};