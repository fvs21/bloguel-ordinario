import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['mod', 'user'],
        default: 'user'
    },
}, {
    timestamps: true
});

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    birthdate: {
        type: Date,
        default: null
    },
    major: {
        type: String,
        default: ''
    },
    semester: {
        type: Number,
        default: null
    }
});

export const User = mongoose.model('User', userSchema);
export const Profile = mongoose.model('Profile', profileSchema);