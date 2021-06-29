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
import { NotFound } from "./components/NotFound/NotFound";
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
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        setUserInfo(user);
        setLoggedIn(true);
      } catch (err) {
        handleErrors(err.error);
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
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
  }, []);

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

    getMemes()
      .then(() => {
        setDirty(false);
      })
      .catch((err) => {
        setMessage({
          msg: "Impossible to load memes! Please, try again later...",
          type: "danger",
        });
        handleErrors(err);
        console.error(err);
      });
  }, [loggedIn, dirty]);

  const handleErrors = (err) => {
    if (err.errors)
      setMessage({
        msg: err.errors[0].msg + ": " + err.errors[0].param,
        type: "danger",
      });
    else setMessage({ msg: err.error, type: "danger" });

    setDirty(true);
  };

  const deleteMeme = (memeId) => {
    // temporary set the deleted item as "in progress"
    setMemes((oldMemes) => {
      return oldMemes.map((ex) => {
        if (ex.id === memeId) return { ...ex, status: "deleted" };
        else return ex;
      });
    });

    API.deleteMeme(memeId)
      .then(() => {
        setDirty(true);
      })
      .catch((err) => handleErrors(err));
  };

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUserInfo(user);
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
    setUserInfo({});
    localStorage.clear();
    setMemes([]);
  };

  return (
    <BrowserRouter>
      <UserInfoMode.Provider value={userInfo}>
        <LoggedInMode.Provider value={loggedIn}>
          <ThemeProvider theme={theme}>
            <NavigationBar
              doLogIn={doLogIn}
              doLogOut={doLogOut}
              menu={menu}
              handleMenu={handleMenu}
            />
            <MemeImages.Provider value={imgs}>
              <MemeFonts.Provider value={fonts}>
                <Switch>
                  <>
                    <Route name="login" path="/login">
                      {loggedIn ? (
                        <Redirect to="/" />
                      ) : (
                        <Login doLogIn={doLogIn} />
                      )}
                    </Route>
                    <Route name="generator" path="/generator">
                      {!loggedIn ? <Redirect to="/login" /> : <Generator />}
                    </Route>
                    <Route name="app" path="/" exact>
                      <MainContent memes={memes} deleteMeme={deleteMeme} />
                    </Route>
                    <Route path="/notfond">
                      <NotFound />
                    </Route>
                    <Redirect from="/*" to="/notfond" />
                  </>
                </Switch>
              </MemeFonts.Provider>
            </MemeImages.Provider>
          </ThemeProvider>
        </LoggedInMode.Provider>
      </UserInfoMode.Provider>
    </BrowserRouter>
  );
}

export default App;
