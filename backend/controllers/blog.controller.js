import User from "../modal/user.js";
import Blog from "../modal/blog.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";

// welcome blog
export const addWelcomeBlog = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError("Email is Required", 400);
  }

  const exinstingUser = await User.findOne({ email });

  console.log(exinstingUser);

  if (!exinstingUser) {
    throw new CustomError("user not found", 400);
  }

  let data = {
    email,
    blogs: [{ title: `Hello `, body: "Welcome to Silico Blog App." }],
    user: exinstingUser,
  };

  const newBlog = await Blog.create(data);

  await newBlog.save({ validateBeforeSave: false });

  return res.status(200).json({
    status: 200,
    message: "welcome blog created successfully",
  });
});

// get all blogs
export const getBlogs = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    throw new CustomError("email is required", 404);
  }
  const blogs = await Blog.findOne({ email });
  // console.log(blogs);

  if (!blogs) {
    throw new CustomError("Blogs not found", 404);
  }

  return res.status(200).send(blogs);
});

// add new blog
export const addBlog = asyncHandler(async (req, res) => {
  const { title, body, email } = req.body;

  if (!(title && body && email)) {
    throw new CustomError("All fields are required", 400);
  }

  console.log(title, body, email);
  const existingBlog = await Blog.findOne({ email });

  if (!existingBlog) {
    throw new CustomError("blog not found", 400);
  }

  existingBlog.blogs.unshift({ title, body });

  await existingBlog.save({ validateBeforeSave: false });

  return res.status(200).json({ blog: existingBlog, sucess: true });
});

// delete existing blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const { email, id } = req.body;

  if (!(email && id)) {
    throw new CustomError("All fields are required", 400);
  }

  let allBlogs = await Blog.findOne({ email });

  let newBlogs = allBlogs.blogs.filter((item) => {
    return item.id !== id;
  });

  allBlogs.blogs = newBlogs;

  await allBlogs.save({ validateBeforeSave: false });

  return res.status(200).json({ blog: allBlogs, sucess: true });
});

// edit or update existing blogs
export const editBlog = asyncHandler(async (req, res) => {
  const { title, body, email, id } = req.body;
  //   const id = req.params.id;

  if (!(title && body && email && id)) {
    throw new CustomError("All fields are required", 400);
  }

  const existingBlog = await Blog.findOne({ email });

  if (!existingBlog) {
    throw new CustomError("blog not found", 400);
  }
  let filterBlogs = existingBlog.blogs.filter((blog) => {
    return blog.id !== id;
  });
  let singleOne = existingBlog.blogs.filter((blog) => {
    return blog.id == id;
  });

  let newValue = {
    title,
    body,
  };

  let finalBlogs = [newValue, ...filterBlogs];

  existingBlog.blogs = finalBlogs;

  await existingBlog.save({ validateBeforeSave: false });

  return res.status(200).json({ blog: existingBlog, sucess: true });
});
