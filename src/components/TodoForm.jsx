import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, TextField, Slide } from "@mui/material/";
import { useNavigate } from "react-router-dom";

function TodoForm() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const handleChange = () => {
    setShow(false);
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { todoTitle: todoTitle, todoText: todoText };
    await axios
      .post("/api/todo", values)
      .then((response) => {
        if (response.data === "ok") {
          window.alert("todo added");
          handleChange();
        }
      })
      .catch((error) => {
        window.alert("todo add failed");
        console.log(error);
      });
  };
  return (
    <div className="todo-container">
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <form action="" onSubmit={handleSubmit}>
          <div className="todo-form">
            <h1> MERN-TODO</h1>
            <div className="todo-input">
              <TextField
                required
                id="outlined-required"
                label="Title"
                onChange={(e) => setTodoTitle(e.target.value)}
                fullWidth
              />
            </div>
            <div className="todo-input todo-text">
              <TextField
                required
                id="outlined-required"
                label="TODO"
                onChange={(e) => setTodoText(e.target.value)}
                fullWidth
                multiline={true}
                rows={8}
              />
            </div>
            <Button size="large" variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Slide>
    </div>
  );
}

export default TodoForm;
