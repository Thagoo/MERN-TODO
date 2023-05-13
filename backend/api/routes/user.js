import express from "express";
import verifyToken from "#backend/api/utils/verifyToken.js";
import {
  getUser,
  updateUser,
  deleteUser,
} from "#backend/api/controllers/user.js";

const router = express.Router();

router.post("/get-user", verifyToken, getUser);
router.put("/update-user", verifyToken, updateUser);
router.delete("/delete-user", verifyToken, deleteUser);

export default router;
