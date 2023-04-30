import express from "express";
import {
  loginUser,
  registerUser,
  authorizeUser,
} from "#backend/api/controllers/auth.js";
import verifyToken from "#backend/api/utils/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/authorize", verifyToken, authorizeUser);
export default router;
