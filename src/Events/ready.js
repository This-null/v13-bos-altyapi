const client = global.bot;
const yarrak = require("../Settings/Settings.json");

module.exports = async () => {

  const { joinVoiceChannel } = require("@discordjs/voice");


    const VoiceChannel = client.channels.cache.get(yarrak.BotVoiceChannel);
    joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true,
    });

    setInterval(() => {
      const oynuyor = yarrak.Main.durum;
      const index = Math.floor(Math.random() * (oynuyor.length));

      client.user.setActivity(`${oynuyor[index]}`, { type: "STREAMING", url: "https://www.twitch.tv/zeoxll" }); }, 10000);
};

module.exports.conf = {
  name: "ready",
};
