import express from "express";
import {
  getTodo,
  deleteTodo,
  updateTodo,
  addTodo,
} from "#backend/api/controllers/todo.js";

const router = express.Router();

router.get("/", getTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);
router.post("/", addTodo);

export default router;
