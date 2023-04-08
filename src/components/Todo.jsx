import React, { useState } from "react";
import "./style.css";
import { Button, TextField, Slide, Fade } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";

function Todo() {
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(true);
  const handleChange = () => {
    setShow(true);
    setClose(false);
  };
  return (
    <div className="todo-container">
      <Slide in={close}>
        <div className="items">
          <h1>Welcome to MERN-TODO</h1>
          <Button size="large" variant="contained" onClick={handleChange}>
            Add TODO <AddIcon style={{ paddingLeft: `10px` }} />
          </Button>
        </div>
      </Slide>
      <Slide direction="up" in={show} mountOnEnter>
        <form action="">
          <div className="todo-form">
            <h1> MERN-TODO</h1>
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
            <Button size="large" variant="contained" onClick={handleChange}>
              Submit
            </Button>
          </div>
        </form>
      </Slide>
    </div>
  );
}

export default Todo;
