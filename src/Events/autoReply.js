const client = global.bot;
const yarrak = require("../Settings/Settings.json")
const { MessageEmbed } = require("discord.js");
module.exports = async (message) => {
    if (message.content.includes(`${client.user.id}`)) {
        const nullxd = await client.users.fetch("769979665224958020");
        let embed = new MessageEmbed().setAuthor({ name: `Selam ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true })}).setDescription(`> **Botun prefixi: (**\` ${yarrak.Main.prefix.map(Lethh => `${Lethh}`).join(' | ')} \`**)**\n\n**Örnek Komut Kullanımı**\n\`\`\`.help \n/help\`\`\``).setFooter({ text: `null :)`, iconURL: nullxd.avatarURL({ dynamic: true })}).setColor("#2f3136");
        message.reply({ embeds: [embed] });
      }
  };
  module.exports.conf = {
    name: "messageCreate"
  };