import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import notes from "./routers/notes.js";
import auth from "./routers/auth.js";
import { FRONTEND_URL, NODE_ENV } from "./config/index.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// 🔥 morgan logger
if (NODE_ENV === "development") {
  app.use(morgan("dev")); // short logs
} else {
  app.use(morgan("combined")); // detailed logs (production)
}

// CORS
app.use(
  cors({
    origin: "https://crazynote.netlify.app",
    credentials: true,
  }),
);

// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);

export default app;
