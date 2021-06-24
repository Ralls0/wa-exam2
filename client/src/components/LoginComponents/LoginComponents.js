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
import Paper from "@material-ui/core/Paper";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { motion } from "framer-motion";
import { React, useState } from "react";

function LoginForm(props) {
  const [open, setOpen] = useState(true);
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    const credentials = {
      username: values.username,
      password: values.password,
    };

    let valid = true;
    if (
      values.username === "" ||
      values.password === "" ||
      values.password.length < 6
    )
      valid = false;

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
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item spacing={3}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={values.username}
              onChange={handleChange("username")}
              fullWidth="true"
              endAdornment={
                <InputAdornment position="end">
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
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              fullWidth="true"
              labelWidth={70}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={3}>
        <Grid item spacing={3}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 1.6,
              rotate: -360,
              borderRadius: "100%",
              duration: 1,
            }}
          >
            <Button color="primary" variant="outlined" onClick={handleSubmit}>
              Login
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
}

function LoginFormPage(props) {
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(0, 0, 0, 0)",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(0, 0, 0, 1)",
    },
  };

  const styles = {
    borderRadius: "50px",
    background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
    boxShadow: " 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
    paddingTop: "10%",
    paddingBottom: "10%",
  };
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ marginTop: "7%" }}
    >
      <Grid item sm={8} md={8} lg={8}>
        <Paper style={styles}>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item>
              <LoginForm login={props.doLogIn} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

function LogButton(props) {
  return (
    <Grid item xs>
      <Button variant="outline-primary" onClick={props.logout}>
        {props.text}
      </Button>
    </Grid>
  );
}

export { LoginFormPage, LogButton };
