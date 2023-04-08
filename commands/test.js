const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType ,PermissionsBitField } = require('discord.js');
const { ComponentType } = require('discord.js');
const sqlite3 = require("sqlite3");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {
        interaction.deferReply();
        await wait(4000);
        interaction.editReply({ content: `awit asasa`, ephemeral: true });
    },
}