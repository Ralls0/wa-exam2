import React, { useState, useContext, useEffect } from "react";
import { MemeImages, MemeFonts } from "../../createContexts";
import Grid from "@material-ui/core/Grid";
import { Slider } from "../Slider/Slider";
import { MemeImg } from "../CardMeme/CardMeme";
import { FormGenerator } from "./FormGenerator/FormGenerator";

function Generator(props) {
  const [title, setTitle] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [img, setImg] = useState("");
  const [font, setFont] = useState("");

  const fonts = useContext(MemeFonts);
  const imgs = useContext(MemeImages);

  useEffect(() => {
    setFont(fonts[0]);
    setImg(props.img ? props.img : imgs[0]);
  }, []);

  const handleText = (text, position) => {
    if (position === "text1") {
      setText1(text);
    }
    if (position === "text2") {
      setText2(text);
    }
    if (position === "text3") {
      setText3(text);
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

  return (
    <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
      <Grid item>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <MemeImg
              img={img}
              text={[text1, text2, text3 ]}
              font={font.font}
              size={font.size}
              color={color}
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
          text={{ text1: text1, text2: text2, text3: text3 }}
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
