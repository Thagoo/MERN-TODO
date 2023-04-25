import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "#backend/models/User.js";

const router = express.Router();

export const registerUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json("user already registered");
      return;
    }

    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHashed;
    const newUser = User(req.body);
    const response = await newUser.save();
    console.log("new user registered", response);
    res.status(200).json("ok");
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
      res.status(404).json("user not found");
      return;
    }
    bcrypt.compare(password, user.password).then((authenticated) => {
      if (!authenticated) {
        res.status(400).json("user password do not match");
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
