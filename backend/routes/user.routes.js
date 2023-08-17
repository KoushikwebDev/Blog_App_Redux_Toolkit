import express from "express";
import { isLoggedIn, customRole } from "../middleware/user.middleware.js";

const Router = express.Router();

import {
  signup,
  login,
  getAllUsers,
  deleteUser,
  addUser,
  logout,
  getUserInfo,
} from "../controllers/user.controller.js";
import {
  addBlog,
  addWelcomeBlog,
  deleteBlog,
  editBlog,
  getBlogs,
} from "../controllers/blog.controller.js";

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/getuserinfo", getUserInfo);
Router.post("/createwelcomeblog", isLoggedIn, addWelcomeBlog);
Router.post("/getblogs", isLoggedIn, getBlogs);
Router.post("/addblog", isLoggedIn, addBlog);
Router.post("/deleteblog", isLoggedIn, deleteBlog);
Router.post("/updateblog", isLoggedIn, editBlog);

Router.get("/allusers", isLoggedIn, customRole("ADMIN"), getAllUsers);
Router.post("/deleteuser", isLoggedIn, customRole("ADMIN"), deleteUser);
Router.post("/adduser", isLoggedIn, customRole("ADMIN"), addUser);

Router.get("/logout", logout);

export default Router;
