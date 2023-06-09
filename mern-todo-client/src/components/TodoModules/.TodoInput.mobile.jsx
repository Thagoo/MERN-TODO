import React from "react";
import { useForm } from "react-hook-form";
import {
  Backdrop,
  InputBase,
  Paper,
  Divider,
  IconButton,
  Slide,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";

function TodoInput({ fetch, setFetch }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  const matches = useMediaQuery("(max-width:600px)");

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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
  console.log(matches);
  return (
    <>
      {matches ? (
        <IconButton
          color="primary"
          sx={{ p: "10px", alignSelf: `flex-end` }}
          onClick={handleOpen}
        >
          <AddIcon />
        </IconButton>
      ) : null}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <center>
          <Slide direction="up" in={open} container={containerRef.current}>
            <Paper
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                mt: 2,
                bgcolor: `#fff`,
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                maxWidth: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Add New ToDo"
                id="title"
                {...register("title")}
                multiline
                maxRows={2}
                inputProps={{ maxLength: 63 }}
                required
                reset
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
            </Paper>
          </Slide>
        </center>
      </Backdrop>
    </>
  );
}

export default TodoInput;
