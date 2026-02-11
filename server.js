const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const process = require("process");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("./models/user");

const PORT = process.env.PORT || 3000;

// Catch uncaught errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

// Enabling CORS for all routes
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Github session  configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-here", // Use environment variable
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

//importing routes
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
        // Use models/user.js to find or create the user in MongoDB
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
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("/"); // Redirect to the desired route after successful login
  },
);

// Error handling middleware (must be last)
app.use(errorHandler);

mongodb.initDb((err) => {
  if (err) {
    console.log("Failed to connect to the database.");
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
