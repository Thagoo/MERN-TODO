import express from "express";
import {
  addUser,
  updateUser,
  deleteUser,
} from "#backend/api/controllers/user.js";

const router = express.Router();

router.post("/", addUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
