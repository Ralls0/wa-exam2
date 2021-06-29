import React from "react";
import { useStyles } from "./styles";

function MemeImg(props) {
  const classes = useStyles({
    img: props.img.img,
  });

  let cnt = 0;
  let txtg = [];
  let tmp = [];

  tmp.push(props.img.tl);
  tmp.push(props.img.tc);
  tmp.push(props.img.tr);
  txtg.push(tmp);
  tmp = [];
  tmp.push(props.img.ml);
  tmp.push(props.img.mc);
  tmp.push(props.img.mr);
  txtg.push(tmp);
  tmp = [];
  tmp.push(props.img.bl);
  tmp.push(props.img.bc);
  tmp.push(props.img.br);
  txtg.push(tmp);
  tmp = 0;

  console.log(txtg)

  for (let r of [0, 1, 2]) {
    for (let c of [0, 1, 2]) {
      if (txtg[r][c] === 1) {
        txtg[r][c] = props.text[cnt++];
      } else {
        txtg[r][c] = "";
      }
    }
  }

  return (
    <>
      <table className={classes.table}>
        <tbody>
          {txtg.map((row) => (
            <RowTypography
              key={tmp++}
              texts={row}
              img={props.img}
              color={props.color}
              font={props.font}
              size={props.size}
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
        <td align="center" className={classes.textSide}>
          {props.texts[0]}
        </td>
        <td align="center" className={classes.text}>
          {props.texts[1]}
        </td>
        <td align="center" className={classes.textSide}>
          {props.texts[2]}
        </td>
      </tr>
    </>
  );
}

export { MemeImg };
