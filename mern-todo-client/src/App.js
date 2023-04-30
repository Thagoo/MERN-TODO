import { useEffect, useState } from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "components/Signup";
import Login from "components/Login";
import TodoHome from "components/TodoHome";
import ProtectedRoute from "components/ProtectedRoute";
import PublicRoute from "components/PublicRoute";
import axios from "axios";
import Loading from "components/Loading";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const authorization = async () => {
    try {
      const response = await axios.get("/api/auth/authorize");
      if (response.status === 200) {
        setAuthenticated(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authorization();
  });

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
                <TodoHome />
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
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
