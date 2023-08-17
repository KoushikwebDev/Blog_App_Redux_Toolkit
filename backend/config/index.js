import dotenv from "dotenv";
// const dotenv = require("dotenv");

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  MONGO_URI: process.env.MONGO_URI,
};
