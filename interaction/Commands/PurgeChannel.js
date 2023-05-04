const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createChannel } = require('../../commands_modules/misc/CreateChannel.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('purgechannel')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        // interaction.guild.channels.cache.forEach(channel => {
        //     // channel.delete();
        // });
        await interaction.reply({content: 'Pong!', ephemeral: true});

        await createChannel(interaction, 'test', 'textChannel', null, null)
    },
    
};