"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const tweetsController = __importStar(require("../controllers/tweets"));
const userController = __importStar(require("../controllers/user"));
const membersController = __importStar(require("../controllers/members"));
const starController = __importStar(require("../controllers/stars"));
//router
const appRouter = express_1.Router();
exports.appRouter = appRouter;
/**
 * Primary app routes.
 */
// Login routes
appRouter.post("/auth/login", userController.postLogin);
appRouter.post("/auth/register", userController.postRegister);
appRouter.get("/auth/logout", userController.logout);
//Members routs
appRouter.get("/members/:id", membersController.getMember);
appRouter.get("/members/:id/tweets", passport_1.default.authenticate("jwt", { session: false }), ...membersController.getMemberTweets);
// Tweets routes
appRouter.get("/tweets", ...tweetsController.getAllTweets);
appRouter.get("/tweets/:id", ...tweetsController.getTweet);
appRouter.post("/tweets", passport_1.default.authenticate("jwt", { session: false }), ...tweetsController.postTweet);
appRouter.delete("/tweets/:id", passport_1.default.authenticate("jwt", { session: false }), ...tweetsController.deleteTweets);
appRouter.post("/tweets/:id/reply", passport_1.default.authenticate("jwt", { session: false }), ...tweetsController.replyTweet);
appRouter.post("/tweets/:id/star-toggle", passport_1.default.authenticate("jwt", { session: false }), ...starController.starToggle);
//# sourceMappingURL=routes.js.map