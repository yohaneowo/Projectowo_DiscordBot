const { Animoji_DatabaseFunction } = require('../../commands_modules/animoji/a_databaseFunctionManager.js');
const { Animoji_FunctionManager } = require('../../commands_modules/animoji/a_FunctionManager.js');

const emojiCreate = {
    name: 'emojiCreate',
    once: false,
    async execute(emoji) {
        await emoji.fetchAuthor()
        const belong_to = emoji.author.id;
        const guild_id = emoji.guild.id;
        const emoji_id = emoji.id;
        const emoji_name = emoji.name;
        const emoji_identifier = emoji.toString();
        console.log(`emoji_identifier: ${emoji_identifier}`)
        const createdAt = emoji.createdAt.toString();
        let animated = ((emoji.animated == 'true') || (emoji.animated == 'false') ? 1 : 0);
        const emoji_url = emoji.url;
        const animojiDbManager = new Animoji_DatabaseFunction();

        const isGuildExist = await animojiDbManager.getGuild(guild_id)
        
        if(isGuildExist) {
            try {
                await animojiDbManager.insert_Emoji(emoji_id, emoji_name, emoji_identifier, guild_id, createdAt, animated, belong_to, emoji_url)
            } catch (err) {
                console.log(err)
            }
        }
    }
}

const emojiUpdate = {
    name: 'emojiUpdate',
    once: false,
    async execute(oldEmoji, newEmoji) {
        if(oldEmoji !== newEmoji) {  
            const old_emoji_identifier = oldEmoji.toString();
            const new_emoji_identifier = newEmoji.toString();
            const new_emoji_id = newEmoji.id;
            const new_emoji_name = newEmoji.name;
            const new_emoji_url = newEmoji.url;
            const animojiDbManager = new Animoji_DatabaseFunction();
            const isGuildExist = await animojiDbManager.getGuild(guild_id)
            if(isGuildExist) {
                try {
                    await animojiDbManager.update_Emoji(new_emoji_identifier, new_emoji_id, new_emoji_name, new_emoji_url, old_emoji_identifier)
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
}

const emojiDelete = {
    name: 'emojiDelete',
    once: false,
    async execute(emoji) {
        const emoji_identifier = emoji.toString();
        const guild_id = emoji.guild.id;
        const animojiDbManager = new Animoji_DatabaseFunction();
        const isGuildExist = await animojiDbManager.getGuild(guild_id)
        if(isGuildExist) {
            try {
                await animojiDbManager.delete_Emoji(emoji_identifier)
            } catch (err) {
                console.log(err)
            }
        }
    }
}

module.exports = {
    emojiCreate,
    emojiUpdate,
    emojiDelete
}