const express = require("express");
const passport = require("passport");
const router = express.Router();

// router.get("/", (req, res) => {
//   // #swagger.tags = ['Home']
//   // #swagger.description = 'Endpoint to return a welcome message.'
//   res.send("Welcome to the Project 2 Home Page!");
// });

router.get("/login", passport.authenticate("github"), (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.description = 'Endpoint to initiate GitHub OAuth authentication.'
});

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
router.use("/store", require("./store"));
router.use("/users", require("./users"));
router.use("/swagger", require("./swagger"));

module.exports = router;
