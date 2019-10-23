"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
const crypto_1 = __importDefault(require("crypto"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
require("../config/passport");
// /**
//  * POST /login
//  * Sign in using email and password.
//  */
exports.postLogin = [
    express_validator_1.check("email", "Email is not valid").isEmail(),
    express_validator_1.check("password", "Password cannot be blank").isLength({ min: 1 }),
    (req, res, next) => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        express_validator_1.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            //invalid credentials
            return res.status(400).send({ message: errors.array() });
        }
        passport_1.default.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).send({ message: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                jsonwebtoken_1.sign({
                    username: user.username,
                    email: user.email,
                    userId: user._id,
                    picture: user.picture
                }, process.env.JWT_SECRET, { expiresIn: "1H" }, (jwtError, token) => {
                    if (jwtError) {
                        return res.status(500).send({ message: "JWT error" });
                    }
                    User_1.User.update({ username: user.username }, { $set: { lastLoginDate: Date.now() } }, err => {
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
exports.logout = [
    (req, res) => {
        res.cookie("jwt", "");
        res.send({ msg: "successfully loged out" });
    }
];
// /**
//  * POST /signup
//  * Create a new account.
//  */
exports.postRegister = [
    express_validator_1.check("email", "Email is not valid").isEmail(),
    express_validator_1.check("username", "User is not valid").exists(),
    express_validator_1.check("password", "Password must be at least 8 characters long, including one capital letter and one number").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
    (req, res, next) => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        express_validator_1.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            // Check that .array is not a method
            return res.status(400).send({ message: errors.array() });
        }
        const md5 = crypto_1.default.createHash("md5").update(req.body.email).digest("hex");
        const user = new User_1.User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            picture: `https://gravatar.com/avatar/${md5}?s=200&d=retro`
        });
        User_1.User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }, (err, existingUser) => {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                return res.status(409).send({ msg: "Email or UserName already exists." });
            }
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                passport_1.default.authenticate("local", (err, user, info) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res.status(400).send({ message: info.message });
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        jsonwebtoken_1.sign({
                            username: user.username,
                            email: user.email,
                            userId: user._id,
                            picture: user.picture
                        }, process.env.JWT_SECRET, { expiresIn: "1h" }, (jwtError, token) => {
                            if (jwtError) {
                                return res.status(500).send({ message: "JWT error" });
                            }
                            User_1.User.update({ username: user.username }, { $set: { lastLoginDate: Date.now() } }, err => {
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
//# sourceMappingURL=user.js.map