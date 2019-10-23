import { Request, Response, NextFunction } from "express";
import { Tweet } from "../models/Tweet";
import { check, validationResult } from "express-validator";
import { Star } from "../models/Star";

//get stars by specific tweet
export const getStarByTweet = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStar = await Tweet.aggregate([
                {
                    $lookup:
                    {
                        from: "stars",
                        let: { id: "$_id" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
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
        } catch (err) {
            next(err);
        }
    }
];

export const starToggle = [
    check("id", "Id must be valid").isMongoId(),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).send(errors.array());
        }

        try {

            const hasStar = await Star.find({ tweetId: req.params.id, userId: (req as any).user.userId });

            if (hasStar.length > 0) {
                await Star.deleteOne({ tweetId: req.params.id, userId: (req as any).user.userId });
                return res.status(200).send({ message: "Star removed successfully" });
            }

            const star = new Star({
                tweetId: req.params.id,
                userId: (req as any).user.userId
            });

            await star.save();

            return res.status(200).send({ message: "Star updated successfully" });

        } catch (err) {
            next(err);
        }
    }
];