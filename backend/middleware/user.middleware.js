import User from "../modal/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import JWT from "jsonwebtoken";
import { config } from "../config/index.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError(
      "Not authorized to access this route, try login",
      401
    );
  }
  //   console.log("token", token);

  try {
    const decodedJWT = JWT.verify(token, config.JWT_SECRET);
    // console.log(decodedJWT);
    req.user = await User.findById(decodedJWT.id);
    // console.log(req.user, "auth");
    next();
  } catch (error) {
    console.log(error.message);
    throw new CustomError("Not authorized to access this route", 401);
  }
});

export const customRole = (role) => {
  return (req, _res, next) => {
    console.log(req.user.role);
    if (req.user.role !== role) {
      throw new CustomError("You are Not allowed to access this route", 400);
    }
    next();
  };
};
