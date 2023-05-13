import React, { useEffect, useState } from "react";
import AppbarHeader from "components/AppbarHeader";
import UserProfile from "./UserProfile";
import { Grid, Paper } from "@mui/material";
import TodoInput from "./TodoInput";
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
        const todos = response.data.reverse();

        setTodoList([...todos.filter((todo) => todo.completed !== true)]);
        setTodoListCompleted([
          ...todos.filter((todo) => todo.completed === true),
        ]);
        console.log(todoListCompleted);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTodo();
  }, [fetch]);

  return (
    <>
      <AppbarHeader />
      <Grid
        container
        sx={{
          p: 3,
          bgcolor: `#F8F9FA`,
          justifyContent: `center`,
        }}
        spacing={1}
      >
        <Grid item xs={12} sm={4} md={3} component={Paper}>
          <UserProfile userDetails={props.userDetails} />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Grid
            item
            sx={{
              ml: {
                xs: `none`,
                md: `4vh`,
              },

              height: `65vh `,
              overflowY: "auto",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "0.4em",
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
            <TodoList todoList={todoList} fetch={fetch} setFetch={setFetch} />
          </Grid>

          <Grid
            item
            component={Paper}
            sx={{
              p: `8px`,
              position: `relative`,
            }}
          >
            <TodoInput fetch={fetch} setFetch={setFetch} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={3} component={Paper}>
          <TodoComleted
            todoListCompleted={todoListCompleted}
            fetch={fetch}
            setFetch={setFetch}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default TodoHome;
