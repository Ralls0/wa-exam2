import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#FAEAAC",
    padding: "3%",
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
}));

export { useStyles, useOutlinedInputStyles };
