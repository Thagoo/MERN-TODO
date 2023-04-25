import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Slide } from "@mui/material/";
import { useNavigate } from "react-router-dom";

function TodoUpdate(props) {
  const [todoTitle, setTodoTitle] = useState(props.title);
  const [todoText, setTodoText] = useState("");
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { title: todoTitle, text: todoText };
    await axios
      .put(`/api/todo/${props.id}`, values)
      .then((response) => {
        if (response.status === 200) {
          handleChange();
        }
      })
      .catch((error) => {
        window.alert("todo update failed");
        console.log(error);
      });
  };

  return (
    <div className="todo-container">
      <form action="" onSubmit={handleSubmit}>
        <div className="todo-form">
          <div className="todo-input">
            <TextField
              required
              id="outlined-required"
              label="Title"
              defaultValue={props.title}
              onChange={(e) => setTodoTitle(e.target.value)}
              fullWidth
            />
          </div>
          <div className="todo-input todo-text">
            <TextField
              required
              id="outlined-required"
              label="TODO"
              defaultValue={props.text}
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
    </div>
  );
}

export default TodoUpdate;
