const app = require("./app");
const mongodb = require("./data/database");
const process = require("process");

const PORT = process.env.PORT || 3000;

// Catch uncaught errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

mongodb.initDb((err) => {
  if (err) {
    console.log("Failed to connect to the database.");
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
