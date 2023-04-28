import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "#backend/models/User.js";

const router = express.Router();

export const registerUser = async (req, res) => {
  console.log(req.body);
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json("Email not found");
      return;
    }
    bcrypt.compare(password, user.password).then((authenticated) => {
      if (!authenticated) {
        res.status(400).json("Wrong password, try again");
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json("login successfull");
    });
  } catch (err) {
    console.log(err);
  }
};
export default router;
