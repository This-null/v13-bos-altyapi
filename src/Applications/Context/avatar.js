const { ApplicationCommandType } = require('discord-api-types/v10');
const { ContextMenuCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, IntegrationApplication } = require("discord.js");
const client = global.bot;

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Avatar')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client) {

        let member = client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.targetId);
        if (!member) return;

        interaction.reply({ content: member.displayAvatarURL({ dynamic: true, size: 4096 }) })


    }
};