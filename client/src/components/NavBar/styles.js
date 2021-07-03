import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#2C223F",
    boxShadow: "none",
  },
  text: {
    fontFamily: "Impact",
    color: "#98CC6D",
  },
  link: {
    textDecoration: "none",
  },
  logo: {
    maxWidth: "150px",
    maxHeight: "150px",
  },
}));

export { useStyles }