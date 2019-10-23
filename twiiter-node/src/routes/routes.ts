import { Router, Request, Response } from "express";
import passport from "passport";
import * as tweetsController from "../controllers/tweets";
import * as userController from "../controllers/user";
import * as membersController from "../controllers/members";
import * as starController from "../controllers/stars";

//router
const appRouter = Router();

/**
 * Primary app routes.
 */
// Login routes
appRouter.post("/auth/login", userController.postLogin);
appRouter.post("/auth/register", userController.postRegister);
appRouter.get("/auth/logout", userController.logout);

//Members routs
appRouter.get("/members/:id", membersController.getMember);
appRouter.get("/members/:id/tweets", passport.authenticate("jwt", {session: false}), ...membersController.getMemberTweets);


// Tweets routes
appRouter.get("/tweets", ...tweetsController.getAllTweets);
appRouter.get("/tweets/:id", ...tweetsController.getTweet);
appRouter.post("/tweets", passport.authenticate("jwt", {session: false}), ...tweetsController.postTweet);
appRouter.delete("/tweets/:id", passport.authenticate("jwt", {session: false}), ...tweetsController.deleteTweets);
appRouter.post("/tweets/:id/reply", passport.authenticate("jwt", {session: false}), ...tweetsController.replyTweet);

appRouter.post("/tweets/:id/star-toggle", passport.authenticate("jwt", {session: false}), ...starController.starToggle);

export { appRouter};