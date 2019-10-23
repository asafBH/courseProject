import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import mongo from "connect-mongo";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import { MONGODB_URI } from "./util/secrets";
import { appRouter } from "./routes/routes";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());


app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.use("/api", appRouter);

export default app;
