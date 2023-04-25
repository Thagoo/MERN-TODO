import express from "express";
import {
  getTodo,
  deleteTodo,
  updateTodo,
  addTodo,
} from "#backend/api/controllers/todo.js";
import verifyToken from "#backend/api/utils/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.put("/:id", verifyToken, updateTodo);
router.post("/", verifyToken, addTodo);

export default router;
