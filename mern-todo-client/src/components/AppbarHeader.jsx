import React from "react";
import axios from "axios";

import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";

const style = {
  headerLogo: {
    flexGrow: 1,
    fontWeight: 900,
    fontSize: `1.5rem`,
  },
};

function AppbarHeader() {
  async function handleLogout() {
    try {
      const response = await axios.post("/api/auth/logout");
      // redirect to login page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Box flexGrow="1">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={style.headerLogo} component="div">
              MERN-TODO
            </Typography>
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default AppbarHeader;
