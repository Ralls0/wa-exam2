import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import API from "./API";
import NavigationBar from "./components/NavBar/Navbar";
import { Login } from "./components/Login/Login";
import { Generator } from "./components/Generator/Generator";
import { MainContent } from "./components/MainContent/MainContent";
import {
  LoggedInMode,
  UserInfoMode,
  MemeImages,
  MemeFonts,
} from "./createContexts";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D153FF",
    },
    secondary: {
      main: "#98CC6D",
      dark: "#6F9D58",
    },
    error: {
      main: "#E81f1f",
    },
    info: {
      main: "#0BCBFF",
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
  const [fonts, setFonts] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [memes, setMemes] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [menu, setMenu] = useState("/");

  const handleMenu = (path) => {
    setMenu(path);
  };

  useEffect(() => {
    if (loggedIn) {
      const checkAuth = async () => {
        try {
          const user = await API.getUserInfo();
          setUserInfo(user);
          setLoggedIn(true);
          setDirty(true);
        } catch (err) {
          handleErrors(err.error);
          console.error(err.error);
        }
      };
      checkAuth();
    }
  }, [loggedIn]);

  useEffect(() => {
    const getMemes = async () => {
      if (loggedIn) {
        const ms = await API.getAllMemes();
        setMemes(ms);
      } else {
        const ms = await API.getPublicMemes();
        setMemes(ms);
      }
    };

    const getAllImg = async () => {
      const is = await API.getInfoImages();
      setImgs(is);
    };

    const getAllFonts = async () => {
      const f = await API.getFonts();
      setFonts(f);
    };

    getAllFonts().catch((err) => {
      setMessage({
        msg: "Impossible to load fonts! Please, try again later...",
        type: "danger",
      });
      handleErrors(err);
      console.error(err);
    });

    getAllImg().catch((err) => {
      setMessage({
        msg: "Impossible to load imgs! Please, try again later...",
        type: "danger",
      });
      handleErrors(err);
      console.error(err);
    });

    getMemes().catch((err) => {
      setMessage({
        msg: "Impossible to load memes! Please, try again later...",
        type: "danger",
      });
      handleErrors(err);
      console.error(err);
    });
  }, [loggedIn, memes.length]);

  const handleErrors = (err) => {
    if (err.errors)
      setMessage({
        msg: err.errors[0].msg + ": " + err.errors[0].param,
        type: "danger",
      });
    else setMessage({ msg: err.error, type: "danger" });

    setDirty(true);
  };

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMenu("/");
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
    <BrowserRouter>
      <Switch>
        <>
          <UserInfoMode.Provider value={userInfo}>
            <ThemeProvider theme={theme}>
              <LoggedInMode.Provider value={loggedIn}>
                <NavigationBar
                  doLogIn={doLogIn}
                  doLogOut={doLogOut}
                  menu={menu}
                  handleMenu={handleMenu}
                />
              </LoggedInMode.Provider>
              <MemeImages.Provider value={imgs}>
                <MemeFonts.Provider value={fonts}>
                  <Route path="/login">
                    {loggedIn ? (
                      <Redirect to="/" />
                    ) : (
                      <Login doLogIn={doLogIn} />
                    )}
                  </Route>
                  <Route path="/generator">
                    {!loggedIn ? <Redirect to="/login" /> : <Generator />}
                  </Route>
                  <Route exact path="/">
                    <MainContent memes={memes} />
                  </Route>
                </MemeFonts.Provider>
              </MemeImages.Provider>
            </ThemeProvider>
          </UserInfoMode.Provider>
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
