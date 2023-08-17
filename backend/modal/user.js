import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      tolowercase: true,
      maxlength: [20, "Name Character Should be within 20 Charcters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      tolowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password Should be atleast Six Character."],
      select: false,
    },
    role: {
      type: String,
      default: "CONTENT-WRITER",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("User", userSchema);

export default model;
