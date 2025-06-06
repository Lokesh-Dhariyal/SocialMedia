import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const limit = "16kb";

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://staticgram.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: limit })); // this is used to set the amont of json accepted at a time
app.use(express.urlencoded({ extended: true, limit: limit })); //this is for the encoded value in the url like %20 for space.
app.use(express.static("public"));
app.use(cookieParser());

import { userRoute } from "./routes/user.route.js";
import { postRoute } from "./routes/post.route.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);
export { app };
