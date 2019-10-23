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
const Star_1 = require("../models/Star");
//get stars by specific tweet
exports.getStarByTweet = [
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getStar = yield Tweet_1.Tweet.aggregate([
                {
                    $lookup: {
                        from: "stars",
                        let: { id: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$$id", { $toObjectId: "$tweetId" }] },
                                        ]
                                    }
                                }
                            },
                        ],
                        as: "stockdata"
                    }
                }
            ]);
            res.status(200).send({ stars: getStar });
        }
        catch (err) {
            next(err);
        }
    })
];
exports.starToggle = [
    express_validator_1.check("id", "Id must be valid").isMongoId(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).send(errors.array());
        }
        try {
            const hasStar = yield Star_1.Star.find({ tweetId: req.params.id, userId: req.user.userId });
            if (hasStar.length > 0) {
                yield Star_1.Star.deleteOne({ tweetId: req.params.id, userId: req.user.userId });
                return res.status(200).send({ message: "Star removed successfully" });
            }
            const star = new Star_1.Star({
                tweetId: req.params.id,
                userId: req.user.userId
            });
            yield star.save();
            return res.status(200).send({ message: "Star updated successfully" });
        }
        catch (err) {
            next(err);
        }
    })
];
//# sourceMappingURL=stars.js.map