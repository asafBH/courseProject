"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tweet_1 = require("../models/Tweet");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
//get tweets method
exports.getAllTweets = [
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let hasError = false;
            if (req.cookies.hasOwnProperty("jwt") && req.cookies.jwt) {
                const jwtPayload = jsonwebtoken_1.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!err) {
                        const allTweets = yield Tweet_1.Tweet.aggregate([{
                                $lookup: {
                                    from: "stars",
                                    let: { id: "$_id" },
                                    pipeline: [{
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$$id", { $toObjectId: "$tweetId" }] },
                                                    ]
                                                }
                                            }
                                        }],
                                    as: "stars"
                                }
                            },
                            {
                                $project: {
                                    posterUser: 1, createdAt: 1, content: 1, reply: 1, stars: 1, posterId: 1, posterPicture: 1,
                                    starCount: { $size: "$stars" },
                                    isTweetOwner: { $cond: [{ $eq: ["$posterUser", decode.username] }, true, false] },
                                    isStaredByMe: { $cond: [{ $in: [decode.userId, "$stars.userId"] }, true, false] }
                                }
                            }
                        ]);
                        return res.send({ tweets: allTweets });
                    }
                    if (err) {
                        hasError = true;
                    }
                }));
            }
            if (hasError || !(req.cookies.hasOwnProperty("jwt") && req.cookies.jwt)) {
                const allTweets = yield Tweet_1.Tweet.aggregate([{
                        $lookup: {
                            from: "stars",
                            let: { id: "$_id" },
                            pipeline: [{
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$$id", { $toObjectId: "$tweetId" }] },
                                            ]
                                        }
                                    }
                                }],
                            as: "stars"
                        }
                    },
                    {
                        $project: {
                            posterUser: 1, createdAt: 1, content: 1, reply: 1, stars: 1, posterId: 1, posterPicture: 1,
                            starCount: { $size: "$stars" },
                            isTweetOwner: { $toBool: false },
                            isStaredByMe: { $toBool: false }
                        }
                    }
                ]);
                return res.send({ tweets: allTweets });
            }
        }
        catch (err) {
            next(err);
        }
    })
];
//post tweet method
exports.postTweet = [
    express_validator_1.check("message", "Comment must have at least one char or maximum of 240 chars").isLength({ min: 1, max: 240 }),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        try {
            const tweet = new Tweet_1.Tweet({
                content: req.body.message,
                posterUser: req.user.username,
                posterId: req.user.userId,
                posterPicture: req.user.picture
            });
            yield tweet.save();
            const t = tweet.toObject();
            t.isTweetOwner = true;
            t.isStaredByMe = false;
            t.starCount = 0;
            res.status(200).send(t);
        }
        catch (err) {
            next(err);
        }
    })
];
exports.deleteTweets = [
    //if not authorized return 401!!
    //not the owner 403!!
    express_validator_1.check("id", "Id must be a valid mongo id").isMongoId(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).send(errors.array());
        }
        try {
            const tweetId = req.params.id;
            const deletTweet = yield Tweet_1.Tweet.deleteOne({ _id: tweetId });
            //check if tweet deleted if yes return 204
            if (deletTweet.deletedCount === 1) {
                return res.status(204).send({ message: "Tweet deleted successfully" });
            }
            else {
                return res.status(404).send({ message: "Can't find tweet" });
            }
        }
        catch (err) {
            next(err);
        }
    })
];
exports.getTweet = [
    express_validator_1.check("id", "Id must be valid").isMongoId(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        const tweet = yield Tweet_1.Tweet.findOne({ _id: req.params.id });
        return res.send(tweet);
    })
];
exports.replyTweet = [
    express_validator_1.check("message", "Comment must have at least one char or maximum of 240 chars").isLength({ min: 1, max: 240 }),
    express_validator_1.check("id", "Id must be valid").isMongoId(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        try {
            const tweet = {
                content: req.body.message,
                posterUser: req.user.username,
                posterId: req.user.userId,
                createdAt: Date.now()
            };
            yield Tweet_1.Tweet.updateOne({ _id: req.params.id }, { $push: { reply: tweet } });
            res.status(200).send({ message: "Tweet reply added", replyTweet: tweet });
        }
        catch (err) {
            next(err);
        }
    })
];
//# sourceMappingURL=tweets.js.map