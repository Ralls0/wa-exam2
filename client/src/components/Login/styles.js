import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    fontFamily: "Impact",
    color: "#98CC6D",
  },
  container: {
    backgroundColor: "#FAEAAC",
    padding: "7%",
    margin: "7%",
    maxWidth: "80vw",
    maxHeight: "80vh",
    minWidth: "40vw",
    minHeight: "70vh",
    borderRadius: "25px",
  },
  text: {
    fontFamily: "Impact",
    color: "#C35CFF",
    textShadow: "2px 2px 1px #98CC6D",
  },
}));

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    "&:hover $notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "&$focused $notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "&$error $notchedOutline": {
      borderColor: theme.palette.error.main,
    },
  },
  focused: {
    color: theme.palette.secondary.main,
  },
  notchedOutline: {
    borderColor: theme.palette.primary.main,
  },
}));

export { useStyles, useOutlinedInputStyles };
