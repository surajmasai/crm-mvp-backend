const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const dataRoutes = require("./routes/data.routes");

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/data", dataRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log("MVP CRM backend running on http://localhost:3000"));
});
