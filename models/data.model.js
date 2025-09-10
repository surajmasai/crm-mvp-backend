const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Data = sequelize.define("Data", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  created_by: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "data", timestamps: true });

User.hasMany(Data, { foreignKey: "created_by" });
Data.belongsTo(User, { foreignKey: "created_by" });

module.exports = Data;
