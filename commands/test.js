const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType ,PermissionsBitField } = require('discord.js');
const { ComponentType } = require('discord.js');
const sqlite3 = require("sqlite3");
const wait = require('node:timers/promises').setTimeout;
const { Error_Embed } = require('../embed_modules/error/error.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command")
        .addSubcommand(subcommand => subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	    .addSubcommand(subcommand =>subcommand
			.setName('server')
			.setDescription('Info about the server'))
        ,
    async execute(interaction, client) {
        const errorEmbed = new Error_Embed();
        try {
        

        interaction.reply('done');
        } catch (err) {
            errorEmbed.sendChannelError(interaction, err);
        }
    },
}