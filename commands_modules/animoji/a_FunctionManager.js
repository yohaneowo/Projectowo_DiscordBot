const { Animoji_DatabaseFunction } = require('../../commands_modules/animoji/a_databaseFunctionManager.js');

class Animoji_FunctionManager {
    async submitPrefix(interaction, modal) {
            const animojiDbManager =  new AnimojiDatabaseFunction();
            const userPrefix = await animojiDbManager.getPrefix(interaction.user.id);
            console.log(userPrefix)
            if(userPrefix) {
                await interaction.showModal(modal);
                const filter = (i) => i.user.id === interaction.user.id && i.customId === 'modal';
                const submitted =  await interaction.awaitModalSubmit({filter, time: 60000})
                .catch(err=> console.log(err))
                if (submitted) {
                    const user_id = interaction.user.id;
                    const prefix = submitted.fields.getTextInputValue('prefix');
                    if(prefix === userPrefix) {
                        submitted.reply({content: `??? Why key the same prefix you idiot`, ephemeral: true});
                    } else {
                        await animojiDbManager.updatePrefix(user_id, prefix);
                        submitted.reply({content: `done, your prefix changed from \`${userPrefix}\` to \`${prefix}\``, ephemeral: true});
                    }
                }
            } else {
                await interaction.showModal(modal);
                const filter = (i) => i.user.id === interaction.user.id && i.customId === 'modal';
                const submitted =  await interaction.awaitModalSubmit({filter, time: 60000})
                .catch(err=> console.log(err))

                if (submitted) {
                    const user_id = interaction.user.id;
                    const prefix = submitted.fields.getTextInputValue('prefix');
                    await animojiDbManager.insertPrefix(user_id, prefix);
                    submitted.reply({content: `done, your prefix is : \`${prefix}\``, ephemeral: true});
                }
            }
        }
    async insert_AllEmoji(interaction, guild_id, belong_to) {
        return new Promies (async (resolve, reject) => {
            const animojiDbManager =  new Animoji_DatabaseFunction();

            await interaction.guild.emojis.cache.forEach(async (emoji) => {
                const emoji_id = emoji.id
                const emoji_name = emoji.name
                const emoji_identifier = emoji.toString()
                const createdAt = emoji.createdAt.toString()
                let animated = ((emoji.animated == 'true') || (emoji.animated == 'false') ? 1 : 0);
                const emoji_url = emoji.url
                // console.log(`emoji_id: ${emoji_id}`)
                // console.log(`emoji_name: ${emoji_name}`)
                // console.log(`emoji_identifier: ${emoji_identifier}`)
                // console.log(`guild_id: ${guild_id}`)
                // console.log(`createdAt: ${createdAt}`)
                // console.log(`animated: ${animated}`)
                // console.log(`emoji_url: ${emoji_url}`)
                try {
                    await animojiDbManager.insert_Emoji(emoji_id, emoji_name, emoji_identifier, guild_id, createdAt, animated, belong_to , emoji_url)
                    resolve()
                } catch (err) {
                    reject()
                }
        })
    })
    }

}

module.exports = {
    Animoji_FunctionManager
}