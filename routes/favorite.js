const express = require("express");
const { Favorite } = require("../models");
const verifyToken = require("../middleware/auth");
const router = express.Router();

// Add to favorites
router.post("/", verifyToken, async (req, res) => {
  const { movieId, title } = req.body;
  const userId = req.user.id;

  const favoriteItem = await Favorite.create({ movieId, title, userId });
  res.json(favoriteItem);
});

// Get user's favorites
router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const favorites = await Favorite.findAll({ where: { userId } });
  res.json(favorites);
});

// Delete from favorites
router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const deleted = await Favorite.destroy({ where: { id } });
  if (deleted) {
    res.json({ message: "Item removed from favorites" });
  } else {
    res.status(404).json({ error: "Favorite not found" });
  }
});

module.exports = router;
