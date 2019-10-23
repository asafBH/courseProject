import mongoose from "mongoose";

export type StarDocument = mongoose.Document & {
    tweetId: string;
    userId: string;
    timestamps: Date;
};

const starSchema = new mongoose.Schema({
    tweetId: { type: String },
    userId: { type: String },
}, { timestamps: true });

export const Star = mongoose.model<StarDocument>("Star", starSchema);