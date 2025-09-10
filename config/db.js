const { Sequelize } = require("sequelize");

const DB_DIALECT = process.env.DB_DIALECT || "sqlite";
const DB_STORAGE = process.env.DB_STORAGE || "crm.sqlite";
const DB_NAME = process.env.DB_NAME || "crm_db";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelizeOptions = DB_DIALECT === "sqlite"
  ? { dialect: "sqlite", storage: DB_STORAGE, logging: false }
  : { dialect: DB_DIALECT, host: DB_HOST, username: DB_USER, password: DB_PASS, database: DB_NAME, logging: false };

const sequelize = new Sequelize(sequelizeOptions);
module.exports = sequelize;
