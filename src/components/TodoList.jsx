import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Grid,
  Paper,
  Box,
  styled,
  Container,
  ListItemButton,
} from "@mui/material/";
import axios from "axios";

function TodoList() {
  const [todoList, setTodoList] = useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const getTodoList = async () => {
    const response = await axios.get("/api/todo-list");
    setTodoList(response.data);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {todoList.map((todo) => (
            <Grid item xs={6}>
              <Item>
                <ListItemButton>{todo.title}</ListItemButton>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default TodoList;
