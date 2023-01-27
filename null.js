const { Client, Collection, Discord } = require("discord.js");
const client = global.bot = new Client({ fetchAllMembers: true, intents: [ 32767 ] }); 
const yarrak = require("./src/Settings/Settings.json");
const colors = require("colors");


client.commands = new Collection();
client.slashcommands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

require("./src/Handlers/filesHandler");
require("./src/Handlers/mongoHandler");
require("./src/Handlers/functionHandler")(client);

client
  .login(yarrak.Main.token)
  .then(() => console.log(`${client.user.username} isimli bota giriş yapıldı.`))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

process.on("uncaughtException", err => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Beklenmedik yakalanamayan hata: ", errorMsg.red);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Promise Hatası: ", err);
});