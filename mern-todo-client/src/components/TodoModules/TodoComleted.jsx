import React, { useEffect, useState } from "react";

import {
  Paper,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function TodoCompleted({ todoListCompleted, fetch, setFetch }) {
  const handleDelete = async (id) => {
    const response = await axios.delete(`/api/todo?id=${id}`);
    if (response.status === 200) {
      setFetch(!fetch);
    }
  };
  return (
    <>
      <Typography variant="h6">Completed</Typography>
      <center>
        {todoListCompleted[0] ? (
          todoListCompleted.map((todo) => (
            <Paper
              component="form"
              square
              sx={{
                mt: 2,
                backgroundColor: "#F8F9FA",
                p: "2px 4px",
                display: "flex",
                maxWidth: 400,
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  color: `#000`,
                  textDecoration: `line-through`,
                }}
                value={todo.title}
                multiline
                maxRows={2}
                inputProps={{ maxLength: 63 }}
                required
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <IconButton onClick={(e) => handleDelete(todo._id)}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))
        ) : (
          <img
            src="todo-list.svg"
            style={{
              height: `250px`,
              justifyContent: `center`,
            }}
          />
        )}
      </center>
    </>
  );
}

export default TodoCompleted;
