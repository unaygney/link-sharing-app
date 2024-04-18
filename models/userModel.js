import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [false],
      default: null,
    },
    lastName: {
      type: String,
      required: [false],
      default: null,
    },
    profileImgUrl: {
      type: String,
      required: [false],
      default: null,
    },
    links: [
      {
        url: {
          type: String,
          required: [true, "URL is required"],
        },
        title: {
          type: String,
          required: [true, "Title is required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
