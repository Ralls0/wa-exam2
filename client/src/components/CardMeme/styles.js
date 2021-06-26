import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardMemeContainer: {
    backgroundColor: "#FAEAAC",
    padding: "1%",
    margin: "3%",
    maxWidth: "90vw",
    minWidth: "30vw",
    maxHeight: "100vh",
    borderRadius: "25px",
    overflow: "hidden",
    cursor: "pointer",
    listStyle: "none",
  },
  textPurple: {
    fontFamily: "Impact",
    textDecoration: "none",
    color: "#D153FF",
  },
  textDarkPurple: {
    fontFamily: "Impact",
    textDecoration: "none",
    color: "#2C223F",
  },
  textGreen: {
    fontFamily: "Impact",
    textDecoration: "none",
    color: "#98CC6D",
    textShadow: "1px 1px 0 #000000",
  },
  copy: {
    color: "#0BB7E5",
  },
  open: {
    color: "#6F9D58",
  },
  memeimg: {
    margin: "5%",
    backgroundImage: (props) => `url(${props.img})`,
    minWidth: "45vw",
    maxWidth: "45vw",
    minHeight: "55vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    borderRadius: "15px",
  },
  text: {
    textShadow: "2px 2px 1px #000000",
    fontFamily: (props) => props.font,
    color: (props) => props.color,
  },
}));

export { useStyles };
