const app = require("./app");
const mongodb = require("./data/database");
const port = process.env.PORT || 3000;

// Initialize database before starting server
mongodb.initDb((err) => {
  if (err) {
    console.error("Database initialization failed:", err);
    process.exit(1);
  } else {
    console.log("Database initialized successfully");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  }
});
