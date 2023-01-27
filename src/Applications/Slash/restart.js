const { ApplicationCommandType } = require('discord-api-types/v10');
const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication } = require("discord.js");
const client = global.bot;
const conf = require("../../Settings/Settings.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Botu yeniden başlatmaya yarar."),

    async execute(interaction, client) {
        if(!conf.Owner.includes(interaction.user.id)) {
            return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
        }
        await interaction.reply({ content: `__**Bot**__ yeniden başlatılıyor!`, ephemeral: true })
        process.exit(0)

    }
};
