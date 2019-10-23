import mongoose from "mongoose";

export type TweetDocument = mongoose.Document & {
    posterUser: string;
    posterId: string;
    posterPicture: string;
    content: string;
    timestamps: Date;
    isTweetOwner?: boolean;
    isStaredByMe?: boolean;
    starCount?: number;
    reply: TweetDocument [];
};

const tweetSchema = new mongoose.Schema({
    posterUser: { type: String },
    posterId: String,
    posterPicture: String,
    content: { type: String, maxlength: 240 },
    reply: { type: Array }
}, { timestamps: true });

export const Tweet = mongoose.model<TweetDocument>("Tweet", tweetSchema);