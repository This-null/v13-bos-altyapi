const client = global.bot;
const { MessageEmbed } = require("discord.js");
const yarrak = require("../Settings/Settings.json")

setInterval(() => { client.cooldown.forEach((x, index) => { if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index); }); }, 8000);

module.exports = async (message) => {
  let prefix = yarrak.Main.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || !prefix) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  const embed = new MessageEmbed().setFooter({ text: yarrak.Main.footer }).setColor(yarrak.Main.color).setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true }) });

  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
  if (cmd) {

    if (cmd.conf.owner && !yarrak.GuildOwners.includes(message.author.id)) { // OWNER SYSTEM
      return message.reply({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`${message.author}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)]}).then((e) => setTimeout(() => { e.delete(); }, 10000));
    }

    if (!yarrak.GuildOwners.includes(message.author.id)) { // ENABLED SYSTEM
      if (cmd.conf.command == false) {
        return message.reply({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`${message.author}, Üzgünüm bu komut şuan herkese açık durumda değil!`)]}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      }
    }

    const cooldown = cmd.conf.cooldown || 3000;
    const cd = client.cooldown.get(message.author.id);
    if (cd) {
      const diff = Date.now() - cd.lastUsage;
      if (diff < cooldown)
        if (!yarrak.Main.cooldown) { // COOLDOWN SYSTEM
          yarrak.Main.cooldown = true;
          return message.channel.send({ content: `${message.author}, Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!` }).then((x) => x.delete({ timeout: (cooldown - diff) }));
        }
    } else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });


    cmd.run(client, message, args, embed, prefix).catch(error => { message.channel.send({ content: `Komut çalıştırılırken bir hata ile karşılaşıldı!\nHata: \` ` + error + ` \`\nHatanın çözümü için \`null#4000\` ile iletişime geçiniz!` }); })

  }
};

module.exports.conf = {
  name: "messageCreate",
};

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}