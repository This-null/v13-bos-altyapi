const { ApplicationCommandType } = require('discord-api-types/v10');
const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication } = require("discord.js");
const client = global.bot;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("name")
        .setDescription("about")
        .addStringOption((option) => option
            .setName("option name")
            .setDescription("option about")
        ),
    async execute(interaction, client) {

    }
};
