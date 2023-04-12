const express = require("express");
const mongoose = require("mongoose");
const tododb = require("./database/mern-tododb");

const app = express(),
  bodyParser = require("body-parser");
app.use(bodyParser.json());

mongoose.connect(tododb.db).then(
  () => {
    console.log("Database connected");
  },
  (error) => {
    console.log("Database connection failed");
  }
);
const todoSchema = mongoose.Schema({
  title: String,
  todo: String,
  id: String,
});

const Todo = new mongoose.model("Todo", todoSchema);

app.post("/api/todo", async (req, res) => {
  const newTodo = new Todo({
    title: req.body.todoTitle,
    todo: req.body.todoText,
    id: "test",
  });
  await newTodo
    .save()
    .then(() => {
      res.status(200).send("ok");
      console.log("todo created");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/api/todo-list", async (req, res) => {
  list = await Todo.find({}).exec();
  res.send(list);
});

app.listen(8000, () => {
  console.log("server is running at port 8000");
});
