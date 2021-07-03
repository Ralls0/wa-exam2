import React from "react";
import { useStyles } from "./styles";

function MemeImg(props) {

  const { img, meme } = props;

  const text = [meme.text1, meme.text2, meme.text3];
  let cnt = 0;
  let txtg = [
    [img.tl, img.tc, img.tr],
    [img.ml, img.mc, img.mr],
    [img.bl, img.bc, img.br],
  ];
  let k = 0;

  txtg = txtg.map((r) => {
    return r.map((c) => {
      if (c === 1) c = text[cnt++];
      else c = "";
      return c;
    });
  });

  const classes = useStyles({
    img: img.img,
  });

  return (
    <>
      <table className={classes.table}>
        <tbody>
          {txtg.map((row) => (
            <RowTypography
              key={k++}
              texts={row}
              color={meme.color}
              font={meme.font}
              size={meme.size}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function RowTypography(props) {
  const classes = useStyles({
    color: props.color,
    font: props.font,
    size: props.size,
  });
  return (
    <>
      <tr className={classes.row}>
        <td align="right" className={classes.textSide}>
          {props.texts[0]}
        </td>
        <td align="center" className={classes.text}>
          {props.texts[1]}
        </td>
        <td align="left" className={classes.textSide}>
          {props.texts[2]}
        </td>
      </tr>
    </>
  );
}

export { MemeImg };
