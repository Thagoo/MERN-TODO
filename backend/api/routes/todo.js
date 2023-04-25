import express from "express";
import Todo from "../../models/Todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await Todo.find()
    .then((ret) => {
      console.log("Todo List get request");
      res.status(200).json(ret);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);

  await Todo.findByIdAndDelete(req.params.id)
    .then((ret) => {
      console.log("Todo deleted", ret);
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
router.put("/:id", async (req, res) => {
  console.log(req.body);
  await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((ret) => {
      console.log("Todo updated", ret);
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
router.post("/", async (req, res) => {
  console.log(req.body);
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
});

export default router;
