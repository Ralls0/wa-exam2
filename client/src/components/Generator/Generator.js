import React, { useState, useContext, useEffect } from "react";
import { MemeImages, MemeFonts } from "../../createContexts";
import Grid from "@material-ui/core/Grid";
import { Slider } from "../Slider/Slider";
import { MemeImg } from "../CardMeme/CardMeme";
import { FormGenerator } from "./FormGenerator/FormGenerator";

function Generator(props) {
  const [title, setTitle] = useState("");
  const [textTop, setTextTop] = useState("");
  const [textCenter, setTextCenter] = useState("");
  const [textBottom, setTextBottom] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [img, setImg] = useState("");
  const [font, setFont] = useState("");

  const fonts = useContext(MemeFonts);
  const imgs = useContext(MemeImages);

  useEffect(() => {
    setFont(fonts[0].font);
    setImg(props.img ? props.img : imgs[0]);
  }, []);

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

  const handleTitle = (title) => {
    setTitle(title);
  };

  const handleFont = (font) => {
    setFont(font);
  };

  const handleColor = (color) => {
    setColor(color);
  };

  console.log("Generator");

  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <Grid item>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <MemeImg
              img={img.img}
              color={color}
              font={font}
              text={{ top: textTop, center: textCenter, bottom: textBottom }}
            />
          </Grid>
          <Grid item>
            {!props.img && <Slider images={imgs} handleImg={handleImg} />}
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <FormGenerator
          images={img}
          color={color}
          font={font}
          fonts={fonts}
          text={{ top: textTop, center: textCenter, bottom: textBottom }}
          title={title}
          handleTitle={handleTitle}
          handleColor={handleColor}
          handleText={handleText}
          handleFont={handleFont}
          privat={props.copy && props.diffUser ? props.privat : undefined}
          copy={props.copy}
        />
      </Grid>
    </Grid>
  );
}

export { Generator };
