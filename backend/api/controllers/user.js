import express, { response } from "express";
import bcrypt from "bcrypt";

import User from "#backend/models/User.js";

const router = express.Router();

export const addUser = async (req, res) => {
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
export const updateUser = async (req, res) => {
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
export const deleteUser = async (req, res) => {
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
export default router;
