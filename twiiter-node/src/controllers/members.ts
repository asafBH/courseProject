import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { check, validationResult } from "express-validator";
import { Tweet } from "../models/Tweet";

//query to find user 
export const getMember = [
    check("id", "Id must be a valid mongo id").isMongoId(),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        try {
            const userToFind = await User.findOne({ _id: req.params.id });
            if (!userToFind) {
                res.status(404).send({ massage: "No member" });
            } else {
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

        } catch (err) {
            next(err);
        }
    }
];


export const getMemberTweets = [
    check("id", "Id must be a valid mongo id").isMongoId(),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        try {
            //call to find user and extract User name from it
            const userToFind = await User.findOne({ _id: req.params.id });
            if (!userToFind) {
                return res.status(404).send({ massage: "No member" });
            }


            //query find all tweets of user
            const Usertweets = await Tweet.aggregate([
                {$match: { posterUser: userToFind.username } }, 
                {$lookup: {
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
                        posterUser: 1, content: 1, reply: 1, stars:1, createdAt: 1, posterId: 1, posterPicture:1,
                        starCount: {$size: "$stars"}, 
                        isTweetOwner: {$cond: [{$eq: ["$posterUser", (req as any).user.username]}, true, false]},
                        isStaredByMe: {$cond: [{$in: [(req as any).user.userId, "$stars.userId"]}, true, false]}
                    }
                }
            ]);

            res.status(200).send({
                tweets: Usertweets, userDetails: {
                    userId: userToFind.id,
                    avatarUrl: userToFind.picture
                }
            });


        } catch (err) {
            next(err);
        }
    }
];