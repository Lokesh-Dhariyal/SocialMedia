import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const limit = "16kb";

// ✅ Use this before any routes
const allowedOrigins = ["https://staticgram.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error("CORS policy does not allow this origin"),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ✅ Handle preflight requests (OPTIONS)
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json({ limit }));
app.use(express.urlencoded({ extended: true, limit }));
app.use(express.static("public"));
app.use(cookieParser());
