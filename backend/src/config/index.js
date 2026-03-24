import dotenv from "dotenv";

dotenv.config();
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT =
  NODE_ENV === "production" ? process.env.PORT_PROD : process.env.PORT_DEV;
export const JWT_SECRET =
  NODE_ENV === "production"
    ? process.env.JWT_SECRET_PROD
    : process.env.JWT_SECRET_DEV;
export const FRONTEND_URL =
  NODE_ENV === "production"
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_DEV;
export const MONGO_URI =
  NODE_ENV === "production"
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL_DEV;
