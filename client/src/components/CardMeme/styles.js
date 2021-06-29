import { makeStyles } from "@material-ui/core/styles";

function calculateNegativeColor(color) {
  if(!color) return "#000000";
  let hexColor = color.split("#")[1];
  let R = 255 - parseInt(hexColor.slice(0,2), 16);
  let G = 255 - parseInt(hexColor.slice(2,4), 16);
  let B = 255 - parseInt(hexColor.slice(4,6), 16);

  R = R.toString(16).padStart(2, "0").toUpperCase();
  G = G.toString(16).padStart(2, "0").toUpperCase();
  B = B.toString(16).padStart(2, "0").toUpperCase();

  return `#${R}${G}${B}`;
}

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
    minHeight: "60vh",
    maxHeight: "60vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    borderRadius: "15px",
  },
  text: {
    textShadow: (props) => `2px 2px 1px ${calculateNegativeColor(props.color)}`,
    fontFamily: (props) => props.font,
    color: (props) => props.color,
    fontSize: (props) => `${props.size}px`,
    textAlign: "center",
  },
  textRight: {
    textShadow: (props) => `2px 2px 1px ${calculateNegativeColor(props.color)}`,
    fontFamily: (props) => props.font,
    color: (props) => props.color,
    fontSize: (props) => `${props.size}px`,
    textAlign: "right",
    tableLayout: "auto",
    width: "50%", 
  },
  textLeft: {
    textShadow: (props) => `2px 2px 1px ${calculateNegativeColor(props.color)}`,
    fontFamily: (props) => props.font,
    color: (props) => props.color,
    fontSize: (props) => `${props.size}px`,
    textAlign: "left",
    tableLayout: "auto",
    width: "50%", 
  },
}));

export { useStyles };
