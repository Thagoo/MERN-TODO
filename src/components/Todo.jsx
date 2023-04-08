import React, { useState } from "react";
import "./style.css";
import { Button, TextField, Slide } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";

function Todo() {
  const [show, setShow] = useState(false);
  const handleChange = () => {
    setShow(true);
  };
  return (
    <div className="todo-container">
      <div className="items">
        <h1>Welcome to MERN-TODO</h1>
      </div>
      <div className="todo-btn">
        <Button size="large" variant="contained" onClick={handleChange}>
          Add TODO <AddIcon style={{ paddingLeft: `10px` }} />
        </Button>
      </div>
      <Slide direction="up" in={show} mountOnEnter>
        <form action="">
          <div className="todo-form">
            <div className="todo-input">
              <TextField
                required
                id="outlined-required"
                label="Title"
                fullWidth
              />
            </div>
            <div className="todo-input todo-text">
              <TextField
                required
                id="outlined-required"
                label="TODO"
                fullWidth
                multiline={true}
                rows={8}
              />
            </div>
          </div>
        </form>
      </Slide>
    </div>
  );
}

export default Todo;
