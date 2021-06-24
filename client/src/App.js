import React, { useEffect, useState } from "react";
//import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import "./App.css";
import API from "./API";
import NavigationBar from "./components/NavBar/Navbar";
// import { LoggedInMode } from "./createContexts";

// import logo from './img/logo.png'; FIXME:  rimuovimi

function App() {
  const [dirty, setDirty] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [memes, setMemes] = useState([]);

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

  /* const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user}!`, type: "success" });
      setDirty(true);
    } catch (err) {
      throw err;
    }
  }; */

  /* const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    localStorage.clear();
    // setMemes([]);
  }; */

  return (
    <header className="App">
      <NavigationBar />
    </header>
  );
}

export default App;
