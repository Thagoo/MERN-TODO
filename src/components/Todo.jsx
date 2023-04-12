import React, { useState } from "react";
import "./style.css";
import { Button, TextField, Slide, Fade } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import TodoList from "./TodoList";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();
  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");

  const [show, setShow] = useState(false);
  const [close, setClose] = useState(true);
  const handleChange = () => {
    setShow(true);
    setClose(false);
    navigate("/todo-form");
  };

  return (
    <>
      <div className="todo-container">
        <Slide in={close} mountOnEnter unmountOnExit>
          <div className="items">
            <h1>Welcome to MERN-TODO</h1>
            <Button size="large" variant="contained" onClick={handleChange}>
              Add TODO <AddIcon style={{ paddingLeft: `10px` }} />
            </Button>
          </div>
        </Slide>
      </div>
      <TodoList />
    </>
  );
}

export default Todo;
