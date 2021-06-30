import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "45vw",
    backgroundColor: "#FAEAAC",
    padding: "1%",
    borderRadius: "25px",
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
    "&:hover": {
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
  error: {},
}));

export { useStyles, useOutlinedInputStyles };
