const client = global.bot;

module.exports = async (interaction) => {
    if (interaction.isContextMenu() || interaction.isCommand()) {
        const command = client.slashcommands.get(interaction.commandName);
        if (interaction.user.bot) return;
        if (!interaction.inGuild() && interaction.isCommand()) return interaction.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
        if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);
        try {
          command.execute(interaction, client);
        }
        catch (e) {
          console.log(e);
          return interaction.reply({ content: `An error has occurred.\n\n**\`${e.message}\`**` });
        }
    };
};

module.exports.conf = {
  name: "interactionCreate",
};
