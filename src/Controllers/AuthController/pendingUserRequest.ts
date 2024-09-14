import { Request, Response } from "express";
import generateToken from "../../Functions/JWT/generateToken.js";
import User from "../../Models/AuthModels/userModel.js";
import TempUser from "../../Models/AuthModels/tempUserModel.js";
import Society from "../../Models/AuthModels/societyModel.js";
import assignFlat from "../../Functions/Society/assignFlats.js";

const pendingUsers = async (req: Request, res: Response) => {
  try {
    const { society_code } = req.params;
    const pendingUsers = await TempUser.find({ society_code });

    if (pendingUsers.length === 0) {
      return res
        .status(200)
        .json({ msg: "No pending users found for the given society code." });
    }
    return res.status(200).json({ data: pendingUsers });
  } catch (error) {
    console.error("Error listing pending registrations:", error);
    return res.status(500).json({
      errorMsg: "Failed to list pending registrations",
      error: error.message,
    });
  }
};

const processUsers = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.body;
    const tempUsers = await TempUser.findOne({ _id: id });
    if (!tempUsers) {
      return res
        .status(404)
        .json({ errorMsg: "Registration request not found", status: false });
    }

    const { name, mb_no, email, role, society_code, flat_no } = tempUsers;

    const newUser = new User({
      name,
      mb_no,
      email,
      society_code,
      role,
      isVerified: true,
      flat_no,
    });

    if (role === "admin") {
      const society = await Society.findOne({ society_code });
      if (!society) {
        return res
          .status(404)
          .json({ errorMsg: "Society not found", status: false });
      }

      society.admin_ids.push(newUser._id.toString());
      await society.save();
    }

    await assignFlat(newUser);

    const savedUser = await newUser.save();
    const token = generateToken(newUser);

    await TempUser.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "User registered successfully",
      newUser: savedUser,
      status1: true,
      token,
    });
  } catch (error) {
    console.error("Error processing registration:", error);
    return res.status(500).json({
      errorMsg: "Failed to process registration",
      error: error.message,
    });
  }
};

export { pendingUsers, processUsers };
