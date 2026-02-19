const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("./models/user");

// Enabling CORS for all routes
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Github session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-here",
    resave: false,
    saveUninitialized: true,
  }),
);

// init passport
app.use(passport.initialize());
// allow passport to use session
app.use(passport.session());

// CORS headers setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  next();
});

// importing routes
app.use("/", require("./routes"));

// GitHub Strategy configuration
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOrCreate(profile);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
} else {
  console.warn(
    "Warning: GitHub OAuth credentials missing in .env file. Authentication will not work.",
  );
}

passport.serializeUser((user, done) => {
  done(null, user.githubId);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged Out",
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/swagger/api-docs",
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  },
);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
