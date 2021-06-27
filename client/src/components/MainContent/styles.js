import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
      margin: "7%",
      maxWidth: "90vw",
      minWidth: "60vw",
      minHeight: "70vh",
      maxHeight: "70vh",
      borderRadius: "25px",
      listStyle: "none",
      overflow: "scroll",
    },
  }));

  export { useStyles }
