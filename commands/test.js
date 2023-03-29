const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test command"),
    async execute(interaction) {
        interaction.reply("template command")
        const category = await interaction.guild.channels.category.create('Member Count')
    },
};