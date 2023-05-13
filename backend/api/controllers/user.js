import express from "express";
import User from "#backend/models/User.js";

const router = express.Router();

export const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.cookies.id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
export const updateUser = async (req, res) => {};
export const deleteUser = async (req, res) => {};
export default router;
