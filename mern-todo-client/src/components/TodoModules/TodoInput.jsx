import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  InputBase,
  Paper,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import axios from "axios";

function TodoInput({ fetch, setFetch }) {
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.time = new Date().toISOString();
    console.log(data);
    try {
      const response = await axios.post("/api/todo", data);

      if (response.status === 200) {
        setFetch(!fetch);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 2,
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: 400,
        }}
      >
        <TextField
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add New ToDo"
          id="title"
          {...register("title")}
          multiline
          maxRows={2}
          inputProps={{ maxLength: 63 }}
          required
          reset
          autofocus
          variant="standard"
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          type="submit"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <AddIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default TodoInput;
