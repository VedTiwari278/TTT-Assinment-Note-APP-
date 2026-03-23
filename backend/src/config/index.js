import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const MONGO_URI = process.env.MONGODB_PROD_URL;
