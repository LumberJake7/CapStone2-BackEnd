const express = require("express");
const axios = require("axios");
const db = require("../index");

const router = express.Router();

// Route to get all movies (dummy data for now)
router.get("/", async (req, res) => {
  try {
    // Replace this with actual query logic from your database
    const movies = [{ title: "Movie 1" }, { title: "Movie 2" }];
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route to fetch movies from the Streaming Availability API
router.get("/search", async (req, res) => {
  try {
    const query = req.query.title;
    if (!query) {
      return res
        .status(400)
        .json({ error: "Title query parameter is required" });
    }

    const response = await axios.get(
      "https://streaming-availability.p.rapidapi.com/shows/search/title",
      {
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        },
        params: {
          title: query,
          country: "us",
          series_granularity: "show",
          show_type: "movie",
          output_language: "en",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
