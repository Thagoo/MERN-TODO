import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
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
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Footer from "components/Footer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name should be more than 3 characters")
      .max(15, "Name should be less than 15 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Mininum 4 characters")
      .max(10, "Maximum 10 characters")

      .required(),
    confirmPassword: yup
      .string()
      .min(4, "Mininum 4 characters")
      .max(10, "Maximum 10 characters")
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required(),
  })
  .required();

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data) => {
    setIsLoading("true");
    axios
      .post("/api/auth/register", data)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setShowSuccess(true);
          setSuccessMessage(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data);
          setIsLoading(false);
          return;
        }
        console.log(error.response.data);
        setError("email", {
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
      <Grid container component="main" sx={{ height: `100vh` }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://source.unsplash.com/random/?city,night)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 1,
              mx: 4,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
            }}
          >
            {snackbar}
            <Avatar sx={{ mt: 4, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography>Sign Up</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                autoComplete="name"
                autoFocus
                error={errors.name ? true : false}
                {...register("name")}
                helperText={errors ? errors?.name?.message : null}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                autoFocus
                error={errors.email ? true : false}
                {...register("email")}
                helperText={errors ? errors?.email?.message : null}
              />
              <TextField
                margin="normal"
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                    </IconButton>
                  ),
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                type={showPassword ? "text" : "password"}
                autoComplete="confirmPassword"
                {...register("confirmPassword")}
                autoFocus
              />
              <FormControlLabel
                control={<Checkbox value="remeber" color="primary" />}
                label="Remeber me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link>Forgot password?</Link>
                </Grid>
                <Grid item xs>
                  <Link to="/login">
                    <a>Already have an account? Login</a>
                  </Link>
                </Grid>
              </Grid>
              <Footer sx={{ mt: 4 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Signup;
