import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import notes from "./routers/notes.js";
import auth from "./routers/auth.js";
import { NODE_ENV } from "./config/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(
  cors({
    origin: ["https://crazynotes.netlify.app", "http://localhost:5000"],
    credentials: true,
  }),
);

app.use("/", (req, res) => {
  res.send({ message: "Crone Job Started", status: 200, success: true });
});
app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);

export default app;
