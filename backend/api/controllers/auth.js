import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "#backend/models/User.js";

const router = express.Router();

export const registerUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json("Email already registered");
      return;
    }

    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHashed;
    const newUser = User(req.body);
    const response = await newUser.save();
    res.status(200).json("User successfully registered, please login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export const loginUser = async (req, res) => {
  const { email, password, remember } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json("Email not found");
      return;
    }

    const authenticated = await bcrypt.compare(password, user.password);
    if (!authenticated) {
      res.status(400).json("Wrong password, try again");
      return;
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT);

    res
      .cookie("access_token", token, { httpOnly: true })
      .cookie("remember", remember)
      .cookie("id", user._id)
      .status(200)
      .json("login successfull");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
export const logoutUser = async (req, res) => {
  res.clearCookie("access_token", { httpOnly: true });
  res.clearCookie("remember");
  res.status(200).send("Logged out successfully");
};

export const authorizeUser = async (req, res) => {
  //If it passess the verifyToken middleware then return user is authenticated
  return res.status(200).json("ok");
};
export default router;
