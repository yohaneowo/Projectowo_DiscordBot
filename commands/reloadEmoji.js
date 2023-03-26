const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const sqlite3 = require('sqlite3');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('reloademoji')
        .setDescription('Reloads all the Emoji into Database')
        .setDefaultMemberPermissions(0),

    async execute(client,interaction) {
        // Calculate Emoji's quantity
        let EmojiCounter = 0
        // Get collection
        let emoji_Collection = client.emojis.cache;
        // Connect sqlite
        const db = new sqlite3.Database('./lib/database/SQLite.db')
        // Delete values from table
        db.run(`DELETE FROM emoji_Collection`)
        // Insert values from table
        emoji_Collection.forEach(function(InsertDatabase){
            db.run(`INSERT INTO emoji_collection (Emoji_Id, Emoji_Name, Emoji_Identifier, Emoji_CreatedTimeStamp, Emoji_Url, AnimatedBoolean , BelongsTo_Guild_Id, BelongsTo_Guild_Name)
                    VALUES (?,?,?,?,?,?,?,?)`, [InsertDatabase.id, InsertDatabase.name, InsertDatabase.identifier, InsertDatabase.createdTimestamp, InsertDatabase.url, InsertDatabase.animated, InsertDatabase.guild.id, InsertDatabase.guild.name])
            EmojiCounter += 1
        })
        console.log('emoji Database Updated')

        /* Embed Message */
        const interationUser = await interaction.guild.members.fetch(interaction.user.id);
        const InteractionFinalReply = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('╲⎝⧹Animoji_Loader⧸⎠╱')
            .setDescription(`⠀**»**⠀ ⠀ ${EmojiCounter} Emojis Loaded <a:Parrot_PowerUp:758829390645166080>`)
            .setTimestamp()
            .setFooter({ text: interationUser.user.username, iconURL: interationUser.user.avatarURL() })
        await interaction.reply({ embeds: [InteractionFinalReply] })
    }
}