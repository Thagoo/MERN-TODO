import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Backdrop,
  CircularProgress,
  Snackbar,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Footer from "components/Footer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Mininum 4 characters")
    .max(10, "Maximum 10 characters")
    .required(),
});

function Login({ setAuthenticated, setUserDetails }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/user/get-user");
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading("true");
    axios
      .post("/api/auth/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          getUserDetails();
          setIsLoading(false);
          setAuthenticated(true);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data);
          setIsLoading(false);
          return;
        }
        if (error.response.status === 404) {
          setError("email", {
            type: "manual",
            message: error.response.data,
          });
          setIsLoading(false);
          return;
        }

        setError("password", {
          type: "manual",
          message: error.response.data,
        });
        setIsLoading(false);
      });
  };

  const snackbar = (
    <Snackbar
      open={showSuccess}
      autoHideDuration={6000}
      message={successMessage}
    ></Snackbar>
  );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 8, md: 6 }, p: { xs: 2, md: 4 } }}
        >
          <Box
            sx={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
            }}
          >
            {snackbar}
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ fontSize: `4vh` }}>Sign In</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                sx={{ mt: 4 }}
                fullWidth
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                autoFocus
                error={errors.email ? true : false}
                {...register("email")}
                helperText={errors ? errors?.email?.message : null}
              />
              <TextField
                sx={{ mt: 4 }}
                fullWidth
                id="password"
                label="Password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                type={showPassword ? "text" : "password"}
                autoComplete="password"
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                autoFocus
              />

              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Checkbox
                    {...register("remember")}
                    defaultChecked
                    color="primary"
                  />
                }
                label="Remeber me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link>Forgot password?</Link>
                </Grid>
                <Grid item xs>
                  <Link to="/signup">Don't have an account? SignUp</Link>
                </Grid>
              </Grid>
              <Footer sx={{ mt: 4 }} />
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
