"use strict";

const express = require("express");
const morgan = require("morgan");
const { check, validationResult } = require("express-validator");
const memeDao = require("./meme-dao");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const userDao = require("./user-dao");

/*** Set-up Passport ***/
passport.use(
  new LocalStrategy(function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, {
          message: "Incorrect username and/or password.",
        });

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDao
    .getUserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

/*** init express ***/
const app = express();
const port = 3001;

/*** set-up the middlewares ***/
app.use(morgan("dev"));
app.use(express.json());

/*** custom middleware for checking authenticated user ***/
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

/*** set up the session ***/
app.use(
  session({
    secret: "NODEscriptionGroup281564",
    resave: false,
    saveUninitialized: false,
  })
);

/*** init passport ***/
app.use(passport.initialize());
app.use(passport.session());

/*** Meme APIs ***/

// GET /api/memes
app.get("/api/memes", async (req, res) => {
  // FIXME: add middleware auth
  try {
    const memes = await memeDao.listMemes();
    res.json(memes);
  } catch (err) {
    res.status(500).end();
  }
});
// GET /api/memes/public
app.get("/api/memes/public", async (req, res) => {
  try {
    const memes = await memeDao.listPublicMemes();
    res.json(memes);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/imgs/<id>
app.get("/api/imgs/:id", async (req, res) => {
  try {
    const img = await memeDao.getImage(req.params.id);
    if (img.error) res.status(404).json(result);
    else res.sendFile(`./${img.path}`, {root: __dirname});
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/info/imgs/<id>
app.get("/api/info/imgs/:id", async (req, res) => {
  try {
    const img = await memeDao.getImageInfo(req.params.id);
    if (img.error) res.status(404).json(result);
    else res.json(img);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/info/imgs/
app.get("/api/info/imgs/", async (req, res) => {
  try {
    const imgs = await memeDao.getImagesInfo();
    res.json(imgs);
  } catch (err) {
    res.status(500).end();
  }
});

/*** Users APIs ***/
/** login **/
app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.json(req.user);
    });
  })(req, res, next);
});

/** logout **/
app.delete("/api/sessions/current", (req, res) => {
  req.logout();
  res.end();
});

/** check whether the user is logged in or not **/
app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

/** Activate the server **/
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
