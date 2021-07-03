import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    fontFamily: "Impact",
    textDecoration: "none",
    flexGrow: 1,
    color: "#98CC6D",
    "&:active": {
      borderWidth: "0 0 3px 0",
      borderStyle: "solid",
      borderColor: "#C35CFF",
    },
  },
  active: {
    fontFamily: "Impact",
    textDecoration: "none",
    flexGrow: 1,
    color: "#98CC6D",
    borderWidth: "0 0 3px 0",
    borderStyle: "solid",
    borderColor: "#C35CFF",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export { useStyles };