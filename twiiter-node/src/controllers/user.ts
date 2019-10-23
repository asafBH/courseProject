import passport from "passport";
import { User, UserDocument } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import crypto from "crypto";
import { check, sanitize, validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import "../config/passport";


// /**
//  * POST /login
//  * Sign in using email and password.
//  */
export const postLogin = [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password cannot be blank").isLength({ min: 1 }),
    (req: Request, res: Response, next: NextFunction) => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        sanitize("email").normalizeEmail({ gmail_remove_dots: false });

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            //invalid credentials
            return res.status(400).send({ message: errors.array() });
        }

        passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
            if (err) { return next(err); }
            if (!user) {
                return res.status(400).send({ message: info.message });
            }
            req.logIn(user, (err) => {
                if (err) { return next(err); }

                sign({
                    username: user.username,
                    email: user.email,
                    userId: user._id,
                    picture: user.picture
                }, process.env.JWT_SECRET, { expiresIn: "1H" }, (jwtError: Error, token: string) => {
                    if (jwtError) {
                        return res.status(500).send({ message: "JWT error" });
                    }

                    User.update({ username: user.username }, { $set: { lastLoginDate: Date.now() } }, err => {
                        if (err) {
                            return res.status(500).send({ message: err });
                        }
                        res.cookie("jwt", token);
                        res.status(200).send({
                            message: "Logged in successfully",
                            userDetails: {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                picture: user.picture,
                                accessToekn: token
                            }
                        });

                    });
                });
            });
        })(req, res, next);
    }
];

/**
 * GET /logout
 * Log out.
 */
export const logout = [
    (req: Request, res: Response) => {
        res.cookie("jwt", "");
        res.send({ msg: "successfully loged out" });
    }
];



// /**
//  * POST /signup
//  * Create a new account.
//  */
export const postRegister = [
    check("email", "Email is not valid").isEmail(),
    check("username", "User is not valid").exists(),
    check("password", "Password must be at least 8 characters long, including one capital letter and one number").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    ,
    (req: Request, res: Response, next: NextFunction) => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        sanitize("email").normalizeEmail({ gmail_remove_dots: false });

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Check that .array is not a method
            return res.status(400).send({ message: errors.array() });
        }

        const md5 = crypto.createHash("md5").update(req.body.email).digest("hex");

        const user = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            picture: `https://gravatar.com/avatar/${md5}?s=200&d=retro`
        });



        User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }, (err, existingUser) => {
            if (err) { return next(err); }
            if (existingUser) {
                return res.status(409).send({ msg: "Email or UserName already exists." });
            }
            user.save((err) => {
                if (err) { return next(err); }
                passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
                    if (err) { return next(err); }
                    if (!user) {
                        return res.status(400).send({ message: info.message });
                    }
                    req.logIn(user, (err) => {
                        if (err) { return next(err); }

                        sign({
                            username: user.username,
                            email: user.email,
                            userId: user._id,
                            picture: user.picture
                        }, process.env.JWT_SECRET, { expiresIn: "1h" }, (jwtError: Error, token: string) => {
                            if (jwtError) {
                                return res.status(500).send({ message: "JWT error" });
                            }

                            User.update({ username: user.username }, { $set: { lastLoginDate: Date.now() } }, err => {
                                if (err) {
                                    return res.status(500).send({ message: err });
                                }
                                res.cookie("jwt", token);
                                res.status(200).send({
                                    message: "Logged in successfully",
                                    userDetails: {
                                        id: user.id,
                                        username: user.username,
                                        email: user.email,
                                        avatarUrl: user.picture,
                                        accessToekn: token,
                                        registrationDate: Date.now(),
                                        lastLoginDate: Date.now()
                                    }
                                });

                            });
                        });
                    });
                })(req, res, next);
            });
        });
    }
];

