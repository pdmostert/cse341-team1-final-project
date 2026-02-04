const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = mongodb.getDb().db();
        let user = await db.collection("users").findOne({ githubId: profile.id });
        
        if (!user) {
          user = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profilePic: profile._json.avatar_url,
            role: "customer",
          };
          await db.collection("users").insertOne(user);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.githubId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = mongodb.getDb().db();
    const user = await db.collection("users").findOne({ githubId: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Auth Routes
app.get("/login", passport.authenticate("github"));

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

// Home Route
app.get("/", (req, res) => {
  res.send(req.isAuthenticated() ? `Logged in as ${req.user.username}` : "Logged Out");
});

app.use("/", require("./routes"));

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message || "Internal Server Error" });
});

// Database Initialization
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});