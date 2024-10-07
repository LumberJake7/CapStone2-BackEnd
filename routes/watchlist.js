const express = require("express");
const { Watchlist } = require("../models");
const verifyToken = require("../middleware/auth");
const router = express.Router();

// Add to watchlist
router.post("/", verifyToken, async (req, res) => {
  const { movieId, title } = req.body;
  const userId = req.user.id;

  const watchlistItem = await Watchlist.create({ movieId, title, userId });
  res.json(watchlistItem);
});

// Get user's watchlist
router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const watchlist = await Watchlist.findAll({ where: { userId } });
  res.json(watchlist);
});

// Delete from watchlist
router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const deleted = await Watchlist.destroy({ where: { id } });
  if (deleted) {
    res.json({ message: "Item removed from watchlist" });
  } else {
    res.status(404).json({ error: "Watchlist item not found" });
  }
});

module.exports = router;
