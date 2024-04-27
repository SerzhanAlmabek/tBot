import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
    userId: {
        type: Number, required: true
    },
    username: {
        type: String, required: true
    },
});

export const User = mongoose.model('User', UserSchema);