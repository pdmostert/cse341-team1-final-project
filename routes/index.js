const express = require("express");
const passport = require("passport");
const router = express.Router();

// GitHub OAuth routes
router.get("/login", passport.authenticate("github"));
// #swagger.tags = ['Authentication']
// #swagger.description = 'Endpoint to initiate GitHub OAuth authentication.'

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/swagger/api-docs",
    session: true,
  }),
  (req, res) => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'GitHub OAuth callback endpoint.'
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'Endpoint to log out the user and destroy the session.'
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.redirect("/"); // Redirect to home page after logout
    });
  });
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));
router.use("/stores", require("./store"));
router.use("/users", require("./users"));
router.use("/swagger", require("./swagger"));

module.exports = router;
