const mongoose = require("mongoose");
const yarrak = require("../Settings/Settings.json");
const colors = require("colors");

mongoose.connect(yarrak.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log(`MongoDB ile bağlantı kuruldu.`);
});
mongoose.connection.on("error", () => {
  console.error(`MongoDB ile bağlantı kurulamadı.`);
});