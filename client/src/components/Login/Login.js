import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { React, useState } from "react";

const useStyles = makeStyles((theme) => ({
  input: {
    fontFamily: "Impact",
    color: "#98CC6D",
  },
  container: {
    backgroundColor: "#FAEAAC",
    padding: "7%",
    margin: "7%",
    maxWidth: "80vw",
    maxHeight: "50vh",
    borderRadius: "25px",
  },
}));

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    "&:hover $notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "&$focused $notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "&$error $notchedOutline": {
      borderColor: theme.palette.error.main,
    },
  },
  focused: {
    color: theme.palette.secondary.main,
  },
  hover: {
    color: theme.palette.primary.main,
  },
  notchedOutline: {},
  error: {
    color: theme.palette.error.main,
  },
}));

function LoginForm(props) {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  const handleClickShowPassword = () => {
    setShowPassword((oldVal) => !oldVal);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    const credentials = { username, password };

    let valid = true;
    if (username === "" || password === "" || password.length < 6) {
      valid = false;
    }

    if (valid) {
      props.login(credentials).catch((err) => {
        setErrorMessage(JSON.stringify(err).replace(/"/g, ""));
        setOpen(true);
      });
    } else {
      setErrorMessage("Error(s) in the form, please fix it.");
      setOpen(true);
    }
  };

  return (
    <div>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item spacing={3}>
          {errorMessage ? (
            <Collapse in={open}>
              <Alert
                error
                variant="outlined"
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {errorMessage}
              </Alert>
            </Collapse>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 50, duration: 1 }}
      >
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item spacing={3}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                secondary
                classes={outlinedInputClasses}
                fullWidth="true"
                endAdornment={
                  <InputAdornment position="end" className={classes.input}>
                    <AccountCircle />
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item spacing={3}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                secondary
                classes={outlinedInputClasses}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className={classes.input}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth="true"
                labelWidth={70}
              />
            </FormControl>
          </Grid>
        </Grid>
      </motion.div>
      <Grid container justify="center" spacing={3}>
        <Grid item spacing={3}>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{
              delay: 1.5,
              type: "spring",
              stiffness: 50,
              duration: 1.5,
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
}

function Login(props) {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={9}
          className={classes.container}
        >
          <Grid item>
            <LoginForm login={props.doLogIn} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { Login };
