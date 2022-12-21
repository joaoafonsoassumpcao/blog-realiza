import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#fc7a03',
            dark: '#d46803',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },
        navbar: {
            main: '#fff',
        },
    },
  });

export { theme };