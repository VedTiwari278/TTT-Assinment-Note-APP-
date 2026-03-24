import dotenv from "dotenv";

dotenv.config();

const requireEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }

  return value;
};

export const PORT = requireEnv("PORT");
export const NODE_ENV = requireEnv("NODE_ENV");
export const JWT_SECRET = requireEnv("JWT_SECRET");
export const FRONTEND_URL = requireEnv("FRONTEND_URL");
export const MONGO_URI = requireEnv("MONGO_URL");

const corsOriginsRaw = process.env.CORS_ORIGINS || FRONTEND_URL;

export const CORS_ORIGINS = corsOriginsRaw
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
