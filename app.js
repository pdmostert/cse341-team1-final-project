const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();

// CORS Configuration - Simplified
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Z-Key",
      "Authorization",
    ],
  }),
);

// Body Parser
app.use(bodyParser.json());

// Session Configuration - Use environment variable for secret
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "fallback-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport GitHub Strategy Configuration
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const db = mongodb.getDb().db();
          let user = await db
            .collection("users")
            .findOne({ githubId: profile.id });

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
      },
    ),
  );
} else if (process.env.NODE_ENV !== "test") {
  console.warn("GitHub OAuth credentials not configured");
}

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

// Home Route
app.get("/", (req, res) => {
  res.send(
    req.isAuthenticated() ? `Logged in as ${req.user.username}` : "Logged Out",
  );
});

// API Routes
app.use("/", require("./routes"));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

module.exports = app;
