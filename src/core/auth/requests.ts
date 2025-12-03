export type RegisterRequest = {
    username: string;
    name: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};