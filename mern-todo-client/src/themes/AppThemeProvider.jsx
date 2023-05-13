import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Inter",
      textTransform: "none",
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          px: 1,
        },
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
    MuiAppBar: {
      defaultProps: {
        sx: {
          px: "10px",
          "@media (min-width: 600px)": {
            px: "80px",
          },
        },
      },
    },
  },
});
const AppThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
