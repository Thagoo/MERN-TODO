import React from "react";
import { Typography } from "@mui/material";

function Footer(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default Footer;
