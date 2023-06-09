import React, { useEffect, useState, useRef } from "react";

import {
  Paper,
  Divider,
  IconButton,
  InputBase,
  Checkbox,
  Grow,
  Box,
  Collapse,
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { TransitionGroup } from "react-transition-group";
import TodoInput from "./TodoInput";

function getTimeElapsed(dateTimeString) {
  const seconds = Math.floor((new Date() - new Date(dateTimeString)) / 1000);

  if (seconds < 60) {
    return `${seconds} sec ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes > 1 ? "mins" : "min"} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours > 1 ? "hrs" : "hr"} ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} ${days > 1 ? "days" : "day"} ago`;
  }
}
function TodoList({ todoList, fetch, setFetch }) {
  const checkboxRef = useRef([]);

  const handleDelete = async (id) => {
    const response = await axios.delete(`/api/todo?id=${id}`);
    if (response.status === 200) {
      setFetch(!fetch);
    }
  };
  const handleDeleteAll = async () => {
    const response = await axios.delete("/api/todo", {
      params: { id: "all", completed: false },
    });
    if (response.status === 200) {
      setFetch(!fetch);
    }
  };

  const handleComplete = async (e, id) => {
    try {
      const response = await axios.put(`/api/todo?id=${id}`);
      if (response.status === 200) {
        setFetch(!fetch);
        e.target.checked = false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleListItemClick = (i) => {
    checkboxRef.current[i].click();
  };

  return (
    <>
      <Paper variant="outlined" elevation={0}>
        <center>
          <TodoInput fetch={fetch} setFetch={setFetch} />

          <Box
            sx={{
              pb: `2vh`,
              maxHeight: `70vh`,
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "0.2em",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            {todoList[0] ? (
              <List>
                <ListItem
                  secondaryAction={
                    <>
                      <Tooltip title="Delete All" placement="top">
                        <IconButton
                          sx={{ mb: 2 }}
                          edge="end"
                          aria-label="delete"
                          title="Delete"
                          onClick={() => handleDeleteAll()}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                  sx={{
                    ml: `10px`,
                    mt: `2px`,
                    mr: `10px`,
                    width: `auto`,
                  }}
                >
                  <ListItemText primary="" />
                </ListItem>
                <TransitionGroup>
                  {todoList.map((todo, i) => (
                    <Collapse key={i} in={false} collapsedHeight="0px">
                      <ListItemButton
                        onClick={() => handleListItemClick(i)}
                        sx={{
                          ml: `10px`,
                          mt: `2px`,
                          mr: `10px`,
                          width: `auto`,
                          bgcolor: `#F0F0F0`,
                          borderRadius: `3px`,
                        }}
                      >
                        <Checkbox
                          ref={(ref) => (checkboxRef.current[i] = ref)}
                          sx={{ pt: 0, pb: 0 }}
                          onClick={(e) => {
                            handleComplete(e, todo._id);
                          }}
                        />

                        <ListItemText primary={todo.title} />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          title="Delete"
                          onClick={() => handleDelete(todo._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemButton>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            ) : (
              <img
                src="todo-list.svg"
                style={{
                  height: `250px`,
                  justifyContent: `center`,
                }}
              />
            )}
          </Box>
        </center>
      </Paper>
    </>
  );
}

export default TodoList;
