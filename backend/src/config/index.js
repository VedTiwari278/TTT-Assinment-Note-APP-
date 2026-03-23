import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const MONGO_URI =
  NODE_ENV === "production"
    ? process.env.MONGODB_PROD_URL
    : process.env.MONGODB_DEV_URL;
