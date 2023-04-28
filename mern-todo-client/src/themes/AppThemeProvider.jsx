import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Inter",
      textTransform: "none",
      fontSize: 15,
    },
  },
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: grey[800],
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          px: 1,
        },
        variant: "subtitle2",
      },
    },
    MuiLink: {
      defaultProps: {
        sx: {
          color: (theme) => theme.palette.secondary.main,
        },
        underline: `none`,
      },
    },
  },
});
const AppThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
