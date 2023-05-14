import express from "express";
import Todo from "#backend/models/Todo.js";

const router = express.Router();

export const getTodo = async (req, res, next) => {
  await Todo.find({ user: req.cookies.id })
    .then((ret) => {
      console.log("Todo List get request");
      res.status(200).json(ret);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
export const deleteTodo = async (req, res) => {
  if (req.query.id === `all`) {
    await Todo.deleteMany({ completed: true })
      .then((ret) => {
        console.log("Todos deleted", ret);
        res.status(200).json("ok");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
    return;
  }
  await Todo.findByIdAndDelete(req.query.id)
    .then((ret) => {
      console.log("Todo deleted", ret);
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
export const updateTodo = async (req, res) => {
  await Todo.findByIdAndUpdate({ _id: req.query.id }, { completed: true })
    .then((ret) => {
      console.log("Todo updated", ret);
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
export const addTodo = async (req, res) => {
  req.body.user = req.cookies.id;
  const newTodo = Todo(req.body);
  await newTodo
    .save()
    .then((ret) => {
      console.log("Todo saved", ret);
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export default router;
