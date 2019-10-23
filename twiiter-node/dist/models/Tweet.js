"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tweetSchema = new mongoose_1.default.Schema({
    posterUser: { type: String },
    posterId: String,
    posterPicture: String,
    content: { type: String, maxlength: 240 },
    reply: { type: Array }
}, { timestamps: true });
exports.Tweet = mongoose_1.default.model("Tweet", tweetSchema);
//# sourceMappingURL=Tweet.js.map