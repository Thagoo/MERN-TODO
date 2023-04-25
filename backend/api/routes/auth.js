import express from "express";
import { loginUser, registerUser } from "#backend/api/controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
