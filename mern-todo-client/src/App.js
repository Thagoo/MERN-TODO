import { useEffect, useState } from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "components/Signup";
import Login from "components/Login";
import TodoHome from "components/TodoModules/TodoHome";
import ProtectedRoute from "components/ProtectedRoute";
import PublicRoute from "components/PublicRoute";
import axios from "axios";
import Loading from "components/Loading";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  const remember = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("remember="));
  const rememberValue = remember ? remember.split("=")[1] : null;

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/user/get-user");
      setUserDetails(response.data);
      //      localStorage.setItem("user", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const authorization = async () => {
    try {
      if (rememberValue && rememberValue === "false") {
        await axios.post("/api/auth/logout");
      }
      const response = await axios.get("/api/auth/authorize");
      if (response.status === 200) {
        setAuthenticated(true);
        getUserDetails();
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authorization();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading isLoading={isLoading} />
      </>
    );
  }
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <TodoHome userDetails={userDetails} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute authenticated={authenticated}>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute authenticated={authenticated}>
                <Login setAuthenticated={setAuthenticated} />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
