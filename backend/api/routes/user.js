import express from "express";
import verifyToken from "#backend/api/utils/verifyToken.js";
import { updateUser, deleteUser } from "#backend/api/controllers/user.js";

const router = express.Router();

router.put("/", verifyToken, updateUser);
router.delete("/", verifyToken, deleteUser);

export default router;
