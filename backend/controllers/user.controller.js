import { config } from "../config/index.js";
import User from "../modal/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    throw new CustomError("All fields are Required", 400);
  }

  const exinstingUser = await User.findOne({ email });

  if (exinstingUser) {
    throw new CustomError("User Already Exists", 400);
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(password, salt);

  //   create new user
  const user = await User.create({
    name,
    email,
    password: hashedpassword,
  });

  return res.status(200).json({
    status: 200,
    message: "user created successfully",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new Error("All fields are Required", 400);
  }

  const exinstingUser = await User.findOne({ email }).select("+password");

  if (!exinstingUser) {
    throw new Error("User Not found", 404);
  }

  // check is password valid
  const isValidPassword = await bcryptjs.compare(
    password,
    exinstingUser.password
  );

  // console.log(isPasswordCorrect);
  if (!isValidPassword) {
    throw new Error("Invalid Credentials", 400);
  }

  // create token data
  const tokenData = {
    id: exinstingUser._id,
    username: exinstingUser.username,
    email: exinstingUser.email,
    httpOnly: true,
  };
  // create jwt token
  const token = JWT.sign(tokenData, config.JWT_SECRET, {
    expiresIn: "3d",
  });

  exinstingUser.password = undefined;

  return res.status(200).cookie("token", token, tokenData).json({
    success: true,
    token,
    exinstingUser,
  });
});

export const getUserInfo = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error("Email is Required", 400);
  }

  const exinstingUser = await User.findOne({ email });

  if (!exinstingUser) {
    throw new Error("User Not found", 404);
  }
  res.status(200).json({
    success: true,
    meaasge: "user retrived successfully",
    user: exinstingUser,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    meaasge: "logout Success",
  });
});

// Admin features

// get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  let allUsers = await User.find();

  //   console.log(allUsers);

  return res.status(200).json({
    status: 200,
    message: "Users retrieved successfully",
    allUsers,
  });
});

// delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  const { email, id } = req.body;

  if (!id) {
    throw new CustomError("User id is Required", 400);
  }
  let user = await User.findByIdAndDelete({ _id: id });
  //   console.log(user);

  return res.status(200).json({
    status: 200,
    message: "User deleted successfully",
    deletedUser: user,
  });
});

// add a user
export const addUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!(name && email && password && role)) {
    throw new CustomError("All fields are Required", 400);
  }
  const exinstingUser = await User.findOne({ email });

  if (exinstingUser) {
    throw new CustomError("User Already Exists", 400);
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(password, salt);

  //   create new user
  const user = await User.create({
    name,
    email,
    password: hashedpassword,
    role,
  });

  return res.status(200).json({
    success: true,
    message: "user added successfully by admin",
    user,
  });
});
