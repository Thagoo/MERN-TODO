import React, { useEffect, useState } from "react";

import { Paper, Divider, IconButton, InputBase, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function TodoList({ todoList, fetch, setFetch }) {
  const handleDelete = async (id) => {
    const response = await axios.delete(`/api/todo?id=${id}`);
    if (response.status === 200) {
      setFetch(!fetch);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await axios.put(`/api/todo?id=${id}`);
      if (response.status === 200) {
        setFetch(!fetch);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <center>
        {todoList[0] ? (
          todoList.map((todo) => (
            <Paper
              component="form"
              square
              sx={{
                mt: 2,
                backgroundColor: "#fff",
                p: "2px 4px",
                display: "flex",
                maxWidth: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, color: `#000` }}
                value={todo.title}
                multiline
                maxRows={2}
                inputProps={{ maxLength: 63 }}
                required
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <IconButton disableRipple>
                <Checkbox
                  disableRipple
                  sx={{ p: `0` }}
                  onChange={(e) => handleComplete(todo._id)}
                />
              </IconButton>
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

export default TodoList;
