const fs = require('node:fs');
const path = require("node:path");
const { Animoji_FunctionManager } = require('../../commands_modules/animoji/a_FunctionManager.js');
module.exports = async (interaction, client) => {
    const animojiFunctionManager = new Animoji_FunctionManager();
    const bot_owner_id = '559762654084857876'
    const user_id = interaction.user.id
    const guild_name = interaction.guild.name
    const guild_id = interaction.guild.id
    const isEmojiPack = 1;
    if (user_id !== bot_owner_id) return interaction.editReply({content: "You are not my owner!", ephemeral: true})
    await interaction.editReply({content: "Processing...", ephemeral: true})
    console.log(guild_name)
    const emojiPackPath = path.join(process.cwd(), 'lib/emoji/emoji_packs')
    // check emojipack folder name same with guild name or not
    const emojiPackFolder = fs.readdirSync(emojiPackPath).filter(file => file === guild_name)
    if(!emojiPackFolder[0]) return interaction.editReply({content: "Emoji Pack not found OR GUILD_NAME wrong", ephemeral: true})
    const emojiPackFolderPath = path.join(emojiPackPath, emojiPackFolder[0])
    const supportedExtensions = ['.png', '.jpg', '.jpeg', '.gif']
    const emojis = fs.readdirSync(emojiPackFolderPath).filter(file => supportedExtensions.includes(path.extname(file)))
    console.log(emojis)
    for (emoji of emojis) {
        const emoji_path = path.join(emojiPackFolderPath, emoji)
        console.log(emoji_path)
        await interaction.guild.emojis.create({  attachment:  `${emojiPackFolderPath}/${emoji}`,  name: `${emoji.replace(path.extname(emoji), '')}`})
        await animojiFunctionManager.insert_AllEmoji(interaction, guild_id, user_id, isEmojiPack)
    }
    await interaction.editReply({content: "Done import emoji_pack", ephemeral: true})
}   

