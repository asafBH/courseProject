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
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
const Tweet_1 = require("../models/Tweet");
//query to find user 
exports.getMember = [
    express_validator_1.check("id", "Id must be a valid mongo id").isMongoId(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        try {
            const userToFind = yield User_1.User.findOne({ _id: req.params.id });
            if (!userToFind) {
                res.status(404).send({ massage: "No member" });
            }
            else {
                res.status(200).send({
                    userDetails: {
                        id: userToFind.id,
                        username: userToFind.username,
                        email: userToFind.email,
                        avatar: userToFind.picture,
                        //registretionDate: userToFind.,
                        lastLoginDate: userToFind.lastLoginDate
                    }
                });
            }
        }
        catch (err) {
            next(err);
        }
    })
];
exports.getMemberTweets = [
    express_validator_1.check("id", "Id must be a valid mongo id").isMongoId(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        try {
            //call to find user and extract User name from it
            const userToFind = yield User_1.User.findOne({ _id: req.params.id });
            if (!userToFind) {
                return res.status(404).send({ massage: "No member" });
            }
            //query find all tweets of user
            const Usertweets = yield Tweet_1.Tweet.aggregate([
                { $match: { posterUser: userToFind.username } },
                { $lookup: {
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
                    } },
                {
                    $project: {
                        posterUser: 1, content: 1, reply: 1, stars: 1, createdAt: 1, posterId: 1, posterPicture: 1,
                        starCount: { $size: "$stars" },
                        isTweetOwner: { $cond: [{ $eq: ["$posterUser", req.user.username] }, true, false] },
                        isStaredByMe: { $cond: [{ $in: [req.user.userId, "$stars.userId"] }, true, false] }
                    }
                }
            ]);
            res.status(200).send({
                tweets: Usertweets, userDetails: {
                    userId: userToFind.id,
                    avatarUrl: userToFind.picture
                }
            });
        }
        catch (err) {
            next(err);
        }
    })
];
//# sourceMappingURL=members.js.map