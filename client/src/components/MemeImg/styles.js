import { makeStyles } from "@material-ui/core/styles";

function calculateNegativeColor(color) {
  if (!color) return "#000000";
  let hexColor = color.split("#")[1];
  let R = 255 - parseInt(hexColor.slice(0, 2), 16);
  let G = 255 - parseInt(hexColor.slice(2, 4), 16);
  let B = 255 - parseInt(hexColor.slice(4, 6), 16);

  R = R.toString(16).padStart(2, "0").toUpperCase();
  G = G.toString(16).padStart(2, "0").toUpperCase();
  B = B.toString(16).padStart(2, "0").toUpperCase();

  return `#${R}${G}${B}`;
}

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "3%",
    minWidth: "45vmax",
    maxWidth: "45vmax",
    minHeight: "55vmin",
    maxHeight: "55vmin",
    backgroundImage: (props) => `url(${props.img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    borderRadius: "15px",
  },
  row: {
      borderWidth: 0,
  },
  text: {
    padding: "3%",
    height: "33%",
    maxWidth: "50%",
    minWidth: "33%",
    textShadow: (props) => `2px 2px 1px ${calculateNegativeColor(props.color)}`,
    fontFamily: (props) => props.font,
    color: (props) => props.color,
    fontSize: (props) => `${props.size/12}vw`,
  },
  textSide: {
    padding: "3%",
    height: "33%",
    width: "35%",
    textShadow: (props) => `2px 2px 1px ${calculateNegativeColor(props.color)}`,
    fontFamily: (props) => props.font,
    color: (props) => props.color,
    fontSize: (props) => `${props.size/12}vw`,
  },
}));

export { useStyles };
