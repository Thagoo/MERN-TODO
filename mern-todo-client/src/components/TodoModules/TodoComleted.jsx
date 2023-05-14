import React, { useEffect, useState } from "react";

import {
  Paper,
  Divider,
  IconButton,
  InputBase,
  Typography,
  Slide,
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { TransitionGroup } from "react-transition-group";

function TodoCompleted({ todoListCompleted, fetch, setFetch }) {
  const handleDeleteAll = async () => {
    const response = await axios.delete("/api/todo?id=all");
    if (response.status === 200) {
      setFetch(!fetch);
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`/api/todo?id=${id}`);
    if (response.status === 200) {
      setFetch(!fetch);
    }
  };
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            title="Delete All"
            sx={{
              mr: `3px`,
            }}
            onClick={handleDeleteAll}
          >
            <DeleteOutlineIcon />
          </IconButton>
        }
      >
        <Typography variant="h5" p={2}>
          Completed
        </Typography>
      </ListItem>

      <Divider variant="middle" color="primary" />
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
        <center>
          {todoListCompleted[0] ? (
            <List>
              <TransitionGroup>
                {todoListCompleted.map((todo, i) => (
                  <Collapse key={i}>
                    <ListItem
                      sx={{
                        ml: `10px`,
                        mt: `2px`,
                        mr: `10px`,
                        width: `auto`,
                        bgcolor: `#F0F0F0`,
                        borderRadius: `3px`,
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          title="Delete"
                          onClick={() => handleDelete(todo._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <DoneIcon color="primary" />
                      <ListItemText
                        sx={{ textDecoration: `line-through` }}
                        primary={todo.title}
                      />
                    </ListItem>
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
        </center>
      </Box>
    </>
  );
}

export default TodoCompleted;
