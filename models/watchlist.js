"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    static associate(models) {
      Watchlist.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Watchlist.init(
    {
      movieId: DataTypes.STRING,
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Watchlist",
    }
  );
  return Watchlist;
};
