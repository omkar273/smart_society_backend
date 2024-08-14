import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    mb_no: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    society_code: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    flat_no: {
      type: String,
    },
    flat_type: {
      type: String,
    },
    floor_no: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
