import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#D153FF",
      },
      secondary: {
        main: "#98CC6D",
        dark: "#6F9D58",
      },
      error: {
        main: "#E81f1f",
      },
      info: {
        main: "#0BCBFF",
      },
    },
    typography: {
      fontFamily: "Impact, Anton, Comic Sans MS, Arial",
    },
  });

export { theme };