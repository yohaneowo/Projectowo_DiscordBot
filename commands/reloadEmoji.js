const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('reloademoji')
        .setDescription('Renew & Loads all the Emoji into Database')
        .setDefaultMemberPermissions(0),
    async execute(client,interaction) {
        let emoji = client.emoji.cache;
        console.log(emoji);
    }
}