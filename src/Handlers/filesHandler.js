const fs = require("fs");
const client = global.bot;
const yarrak = require("../Settings/Settings.json");
const colors = require("colors");

/ ─────────────────────────────────────────────────────────────────────────────────────────────────────── /


// KOMUT ÇALIŞTIRMA 
fs.readdir('./src/Commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        fs.readdir("./src/Commands/" + f, (err2, files2) => {
            files2.forEach(file => {
                let props = require(`../Commands/${f}/` + file);
                console.log(`${props.conf.name} komutu yüklendi.`);
                client.commands.set(props.conf.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.conf.name);
                });
            })
        })
    });
});


/ ─────────────────────────────────────────────────────────────────────────────────────────────────────── /


// EVENT ÇALIŞTIRMA 
fs.readdir("./src/Events", (err, files) => {
  if (err) return console.error(err);
  files
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let prop = require(`../Events/${file}`);
      if (!prop.conf) return;
      client.on(prop.conf.name, prop);
      console.log(`${prop.conf.name} eventi yüklendi.`);
    });
});


/ ─────────────────────────────────────────────────────────────────────────────────────────────────────── /


// SLASHCOMMANDS ÇALIŞTIRMA 
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');  
var slashcommands = [];

fs.readdirSync('./src/Applications/').forEach(async category => {
      const commands = fs.readdirSync(`./src/Applications/${category}/`).filter(cmd => cmd.endsWith('.js'));
      for (const command of commands) {
      const Command = require(`../Applications/${category}/${command}`);
  client.slashcommands.set(Command.data.name, Command);
  slashcommands.push(Command.data.toJSON());
      }
  });

  const rest = new REST({ version: '9' }).setToken(yarrak.Main.token);
(async () => {
  try {
      console.log(`Slash ve Komutlar yükleniyor.`);
      await rest.put(
          Routes.applicationGuildCommands(yarrak.Main.botID, yarrak.GuildID),
          { body: slashcommands },
      ).then(() => {
          console.log(`Slash ve Context Komutlar yüklendi.`);
      });
  }
  catch (e) {
      console.error(e);
  }
})();


/ ─────────────────────────────────────────────────────────────────────────────────────────────────────── /