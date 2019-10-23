import { Request, Response, NextFunction } from "express";
import { Tweet } from "../models/Tweet";
import { check, validationResult } from "express-validator";
import { verify } from "jsonwebtoken";

//get tweets method
export const getAllTweets = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let hasError = false;
            if (req.cookies.hasOwnProperty("jwt") && req.cookies.jwt) {
                const jwtPayload = verify(req.cookies.jwt, process.env.JWT_SECRET, async (err: any, decode: any) => {
                    if(!err) {
                        const allTweets = await Tweet.aggregate([{ 
                            $lookup: {
                                from: "stars",
                                let: { id: "$_id"},
                                pipeline: [{ 
                                    $match: {
                                        $expr: { 
                                            $and: [
                                                { $eq: [ "$$id",  {$toObjectId: "$tweetId"} ] },
                                            ]
                                        }
                                    }
                                }],
                                as: "stars"
                            }},
                            {
                                $project: {
                                    posterUser: 1, createdAt: 1, content: 1, reply: 1, stars:1, posterId:1, posterPicture:1,
                                    starCount: {$size: "$stars"}, 
                                    isTweetOwner: {$cond: [{$eq: ["$posterUser", decode.username]}, true, false]},
                                    isStaredByMe: {$cond: [{$in: [decode.userId, "$stars.userId"]}, true, false]}
                                }
                            }
                        ]);
    
                        return res.send({ tweets: allTweets });
                    }
                    if (err) {
                        hasError = true;
                    }
                });   
            }
            if (hasError || !(req.cookies.hasOwnProperty("jwt") && req.cookies.jwt)) {
                const allTweets = await Tweet.aggregate([{ 
                    $lookup: {
                        from: "stars",
                        let: { id: "$_id"},
                        pipeline: [{ 
                            $match: {
                                $expr: { 
                                    $and: [
                                        { $eq: [ "$$id",  {$toObjectId: "$tweetId"} ] },
                                    ]
                                }
                            }
                        }],
                        as: "stars"
                    }},
                    {
                        $project: {
                            posterUser: 1, createdAt: 1, content: 1, reply: 1, stars:1, posterId: 1, posterPicture:1,
                            starCount: {$size: "$stars"}, 
                            isTweetOwner: {$toBool: false},
                            isStaredByMe: {$toBool: false}
                        }
                    }
                ]);
                return res.send({ tweets: allTweets });
            }
        } catch (err) {
            next(err);
        }
    }
];

//post tweet method
export const postTweet = [
    check("message", "Comment must have at least one char or maximum of 240 chars").isLength({ min: 1, max: 240 }),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try {
            const tweet = new Tweet({
                content: req.body.message,
                posterUser: (req as any).user.username,
                posterId: (req as any).user.userId,
                posterPicture: (req as any).user.picture
            });

            await tweet.save();
            const t = tweet.toObject();
            t.isTweetOwner = true;
            t.isStaredByMe = false;
            t.starCount = 0;

            res.status(200).send(t);


        } catch (err) {
            next(err);
        }
    }
];

export const deleteTweets = [
    //if not authorized return 401!!
    //not the owner 403!!

    check("id", "Id must be a valid mongo id").isMongoId(),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).send(errors.array());
        }

        try {
            const tweetId = req.params.id;
            

            const deletTweet = await Tweet.deleteOne({ _id: tweetId });
            //check if tweet deleted if yes return 204
            if (deletTweet.deletedCount === 1) {
                return res.status(204).send({message: "Tweet deleted successfully"});
            } else {
                return res.status(404).send({message: "Can't find tweet"});
            }

        } catch (err) {
            next(err);
        }
    }
];

export const getTweet = [
    check("id", "Id must be valid").isMongoId(),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const tweet = await Tweet.findOne({_id: req.params.id});

        return res.send(tweet);
    }
];

export const replyTweet = [
    check("message", "Comment must have at least one char or maximum of 240 chars").isLength({ min: 1, max: 240 }),
    check("id", "Id must be valid").isMongoId(),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try {
            const tweet = {
                content: req.body.message,
                posterUser: (req as any).user.username,
                posterId: (req as any).user.userId,
                createdAt: Date.now()
            };

            await Tweet.updateOne({_id: req.params.id}, { $push: { reply: tweet } });

            res.status(200).send({message: "Tweet reply added", replyTweet: tweet});

        } catch (err) {
            next(err);
        }
    }
];

