const { ApplicationCommandType } = require('discord-api-types/v10');
const { ContextMenuCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, IntegrationApplication } = require("discord.js");
const client = global.bot;

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('name')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client) {


    }
};