import React, { useEffect, useState } from "react";
import AppbarHeader from "components/AppbarHeader";
import UserProfile from "./UserProfile";
import { Box, Grid, Paper, Typography } from "@mui/material";
import TodoList from "./TodoList";
import TodoComleted from "./TodoComleted";
import axios from "axios";

function TodoHome(props) {
  const [todoList, setTodoList] = useState([]);
  const [todoListCompleted, setTodoListCompleted] = useState([]);

  const [fetch, setFetch] = useState(false);

  const getTodo = async () => {
    try {
      const response = await axios.get(`/api/todo/`);
      if (response.status === 200) {
        const todos = response.data
          .reverse()
          .filter((todo) => todo.completed !== true);
        setTodoList([...todos]);
        const todosCompleted = response.data
          .reverse()
          .filter((todo) => todo.completed === true);

        setTodoListCompleted([...todosCompleted]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTodo();
  }, [fetch]);

  return (
    <Box sx={{ height: `100vh` }}>
      <AppbarHeader />
      <Grid
        container
        sx={{
          pt: 3,
        }}
        justifyContent="flex-start"
        spacing={1}
      >
        <UserProfile userDetails={props.userDetails} />

        <Grid item xs={12} sm={4} md={6}>
          <TodoList todoList={todoList} fetch={fetch} setFetch={setFetch} />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TodoComleted
            todoListCompleted={todoListCompleted}
            fetch={fetch}
            setFetch={setFetch}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoHome;
