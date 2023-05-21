const fs = require('node:fs');
const path = require("node:path");


    const emojiPath = path.join(process.cwd(), 'lib/emoji/emoji_packs/')
    const supportedExtensions = ['.png', '.jpg', '.jpeg', '.gif']
    const emojiFiles = fs.readdirSync(emojiPath).filter(file => file === 'Minecraft-Reacts_animated')
    console.log(emojiFiles)
    