import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import API from "./API";
import NavigationBar from "./components/NavBar/Navbar";
import { Login } from "./components/Login/Login";
import { MainContent } from "./components/MainContent/MainContent";
import { LoggedInMode, UserInfoMode } from "./createContexts";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D153FF",
    },
    secondary: {
      main: "#98CC6D",
    },
    error: {
      main: "#E81f1f",
    },
  },
  typography: {
    fontFamily: "Impact, Arial",
  },
});

function App() {
  const [dirty, setDirty] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [memes, setMemes] = useState([]);
  const [menu, setMenu] = useState("/");

  const handleMenu = (path) => {
    setMenu(path);
  };

  console.log(dirty, message, memes); // FIXME: remove

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        setUserInfo(user);
        setLoggedIn(true);
        setDirty(true);
      } catch (err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, [loggedIn]);

  useEffect(() => {
    const getMemes = async () => {
      if (loggedIn) {
        const ms = await API.getAllMemes();
        setMemes(ms);
        setDirty(true);
      } else {
        const ms = await API.getPublicMemes();
        setMemes(ms);
        setDirty(true); // FIXME: remove se non necessario
      }
    };
    getMemes().catch((err) => {
      setMessage({
        msg: "Impossible to load memes! Please, try again later...",
        type: "danger",
      });
      console.error(err);
    });
    console.log("MEME", memes);
  }, [loggedIn]);

  /* const handleErrors = (err) => {
    if (err.errors)
      setMessage({
        msg: err.errors[0].msg + ": " + err.errors[0].param,
        type: "danger",
      });
    else setMessage({ msg: err.error, type: "danger" });

    setDirty(true);
  }; */

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user}!`, type: "success" });
      setDirty(true);
    } catch (err) {
      throw err;
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    localStorage.clear();
    setMemes([]);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LoggedInMode.Provider value={loggedIn}>
          <UserInfoMode.Provider value={userInfo}>
            <NavigationBar
              doLogIn={doLogIn}
              doLogOut={doLogOut}
              menu={menu}
              handleMenu={handleMenu}
            />
          </UserInfoMode.Provider>
        </LoggedInMode.Provider>
        <Router>
          <Switch>
            <Route
              path="/login"
              render={() => (
                <>
                  {loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <>
                      <Login doLogIn={doLogIn} />
                    </>
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <MainContent memes={memes} />
                </>
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
