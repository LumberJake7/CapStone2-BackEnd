const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const watchlistRoutes = require("./routes/watchlist");
const favoriteRoutes = require("./routes/favorite");

dotenv.config();

console.log("Database URL:", process.env.DATABASE_URL);

const app = express();

app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/favorites", favoriteRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
