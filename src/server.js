const express = require("express");

const connect = require("./config/db");
const passport = require("./config/passport");

const User = require("./models/user.model");
const { signup, signin } = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/login", (req, res) => {
  res.send("Login page");
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.post("/signup", signup);
app.post("/signin", signin);

app.use("/users", userController);

const start = async () => {
  await connect();

  app.listen(2244, () => {
    console.log("Listening on port 2244...");
  });
};

module.exports = start;
