import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import { Slider } from "../Slider/Slider";
import { MemeImg } from "../MemeImg/MemeImg";
import { FormGenerator } from "./FormGenerator/FormGenerator";
import { MemeImages, MemeFonts } from "../../createContexts";
import { useStyles } from "./styles";
/**
 * 
 * @param {*} props 
 * If receve: 
 * + {img}
 * + {copy}
 * + {diffUser}
 * + {privat}
 * then a copy is performed
 * @returns 
 */
function Generator(props) {

  const fonts = useContext(MemeFonts);
  const imgs = useContext(MemeImages);

  const [title, setTitle] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [img, setImg] = useState(props.img ? props.img : imgs[0]);
  const [font, setFont] = useState(fonts[0]);

  const classes = useStyles();

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
      <Grid item sm={6} lg={6} md={6}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <MemeImg
              img={img}
              meme={{
                font: font.font,
                size: font.size,
                color: color,
                text1: text1,
                text2: text2,
                text3: text3,
              }}
              className={classes.imgContent}
            />
          </Grid>
          <Grid item>
            {!props.img && <Slider images={imgs} handleImg={handleImg} />}
          </Grid>
        </Grid>
      </Grid>

      <Grid item sm={6} lg={6} md={6}>
        <FormGenerator
          imgs={img}
          color={color}
          font={font}
          fonts={fonts}
          text={{ text1: text1, text2: text2, text3: text3 }}
          title={title}
          handleTitle={handleTitle}
          handleColor={handleColor}
          handleText={handleText}
          handleFont={handleFont}
          privatBlock={(props.copy && props.diffUser) ? props.privat : undefined}
          copy={props.copy}
        />
      </Grid>
    </Grid>
  );
}

export { Generator };
