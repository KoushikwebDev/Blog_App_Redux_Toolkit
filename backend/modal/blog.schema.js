import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  blogs: [
    {
      title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [20, "Title Length Should Not be more than 20 Character."],
      },
      body: String,
      isApproved: {
        type: Boolean,
        default: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const model = mongoose.model("Blog", BlogSchema);
export default model;
