const express = require("express");
const passport = require("passport");
const router = express.Router();

// GitHub OAuth routes
router.get(
  "/login",
  // #swagger.tags = ['Authentication']
  // #swagger.description = 'Endpoint to initiate GitHub OAuth authentication.'
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/swagger/api-docs",
    session: true,
  }),
  (req, res) => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'GitHub OAuth callback endpoint.'
    console.log("User authenticated:", req.user);
    console.log("Session ID:", req.sessionID);

    // Explicitly save session before redirect (critical for production)
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Session save failed" });
      }
      console.log("Session saved successfully");
      res.redirect("/");
    });
  },
);

router.get("/logout", (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.description = 'Endpoint to log out the user and destroy the session.'
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.redirect("/");
    });
  });
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));
router.use("/stores", require("./store"));
router.use("/users", require("./users"));
router.use("/swagger", require("./swagger"));

module.exports = router;
