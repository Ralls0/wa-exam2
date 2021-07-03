import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
  const [open, setOpen] = React.useState(false);

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

  const handleSnackbarsClick = () => {
    setOpen(true);
  };

  const handleSnackbarsClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleMenu = (path) => {
    setMenu(path);
  };

  const handleErrors = (err) => {
    if (err.errors)
      setMessage({
        msg: err.errors[0].msg + ": " + err.errors[0].param,
        type: "danger",
      });
    else setMessage({ msg: err.error, type: "danger" });
    handleSnackbarsClick()

    setDirty(true);
  };

  const copyMeme = () => {
    setMenu("/generator");
  };

  const selectImg = (imgId) => {
    if (imgs.length > 0) {
      return imgs.filter((image) => {
        return image.id === imgId;
      })[0];
    }
    return -1;
  };

  const getLastMemeId = () => {
    let max = -1;
    memes.forEach((m) => {
      max = Math.max(max, m.id);
    });
    return max;
  };

  const addMeme = (meme) => {
    meme.id = getLastMemeId() + 1;
    meme.status = "added";
    setMemes((oldMemes) => [...oldMemes, meme]);

    API.addMeme(meme)
      .then(() => {
        setMenu("/");
        setMessage({ msg: `Meme ${meme.title} added`, type: "success" })
        handleSnackbarsClick()
        setDirty(true);
      })
      .catch((err) => handleErrors(err));
  };

  const deleteMeme = (memeId) => {
    setMemes((oldMemes) => {
      return oldMemes.map((ex) => {
        if (ex.id === memeId) return { ...ex, status: "deleted" };
        else return ex;
      });
    });

    API.deleteMeme(memeId)
      .then(() => {
        setDirty(true);
        setMessage({ msg: `Meme deleted`, type: "success" })
        handleSnackbarsClick()
      })
      .catch((err) => handleErrors(err));
  };

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUserInfo(user);
      setLoggedIn(true);
      setMenu("/");
      setMessage({ msg: `Welcome, ${user.name}!`, type: "success" });
      handleSnackbarsClick()
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
            <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={open}
              autoHideDuration={6000}
              onClose={handleSnackbarsClose}
            >
              <MuiAlert onClose={handleSnackbarsClose} severity={message.type}>
              {message.msg}
              </MuiAlert>
            </Snackbar>
            <MemeImages.Provider value={imgs}>
              <MemeFonts.Provider value={fonts}>
                <Switch>
                  <Route name="login" path="/login">
                    {loggedIn ? (
                      <Redirect to="/" />
                    ) : (
                      <Login doLogIn={doLogIn} />
                    )}
                  </Route>
                  <Route
                    name="generator"
                    path="/generator"
                    render={({ location }) => {
                      if (location.state) {
                        location.state.img = selectImg(location.state.img);
                      }
                      return loggedIn ? (
                        <Generator
                          img={location.state ? location.state.img : false}
                          copy={location.state ? location.state.copy : 0}
                          diffUser={
                            location.state ? location.state.diffUser : false
                          }
                          meme={location.state ? location.state.meme : false}
                          addMeme={addMeme}
                        />
                      ) : (
                        <Redirect to="/login" />
                      );
                    }}
                  />
                  <Route name="app" path="/" exact>
                    <MainContent
                      memes={memes}
                      deleteMeme={deleteMeme}
                      copyMeme={copyMeme}
                    />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
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
