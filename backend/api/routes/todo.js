import express from "express";
import {
  getTodo,
  deleteTodo,
  updateTodo,
  addTodo,
} from "#backend/api/controllers/todo.js";
import verifyToken from "#backend/api/utils/verifyToken.js";

const router = express.Router();

//Todo CRUD by user id
router.get("/", verifyToken, getTodo);
router.delete("/", verifyToken, deleteTodo);
router.put("/", verifyToken, updateTodo);
router.post("/", verifyToken, addTodo);

export default router;
