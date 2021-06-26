import React, { useState, useContext, useEffect } from "react";
import { MemeImages } from "../../createContexts";
import Grid from "@material-ui/core/Grid";
import { Slider } from "../Slider/Slider";
import { MemeImg } from "../CardMeme/CardMeme";
import { useStyles } from "./styles";
import API from "../../API";

function FormGenerator(props) {}

function Generator(props) {
  const [title, setTitle] = useState("");
  const [textTop, setTextTop] = useState("");
  const [textCenter, setTextCenter] = useState("");
  const [textBottom, setTextBottom] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [fonts, setFonts] = useState("");
  const [font, setFont] = useState("");
  const [img, setImg] = useState("");

  const classes = useStyles();

  useEffect(() => {
    const getAllFonts = async () => {
      const f = await API.getFonts();
      setFont(f[0]);
      return f;
    };

    setFonts(getAllFonts());
  }, []);

  const imgs = useContext(MemeImages);

  const handleText = (text, position) => {
    if (position === "top") {
      setTextTop(text);
    }
    if (position === "center") {
      setTextCenter(text);
    }
    if (position === "bottom") {
      setTextBottom(text);
    }
  };

  const handleImg = (img) => {
    setImg(img);
  };

  const handleColor = (color) => {
    setColor(color);
  };

  return (
    <Grid container direction="row" justify="space-around" alignItems="flex-start">
      <Grid item className={classes.slider}>
        <MemeImg img={img.img} color="#FFFFFF" font="Impact" text={{top: "top", center: "center", bottom: "bottom"}} />
        <Slider images={imgs} handleImg={handleImg} />
      </Grid>
      <Grid item>
        <h1> Prova </h1>
      </Grid>
    </Grid>
  );
}

export { Generator };
