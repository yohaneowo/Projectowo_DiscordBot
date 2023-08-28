
const { SlashCommandBuilder } = require("discord.js")
const { modal } = require("../../commands_modules/animoji/a_compoment.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("purgechannel")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    // interaction.guild.channels.cache.forEach(channel => {
    //     // channel.delete();
    // });
    async function awaitModalSubmitWithFilter(interaction, modal) {
      await interaction.showModal(modal)

      const filter = (i) =>
        i.user.id === interaction.user.id && i.customId === "modal"
      const submitted = await interaction
        .awaitModalSubmit({ filter, time: 60000 })
        .catch((err) => console.log(err))

      if (submitted) {
        const prefix = submitted.fields.getTextInputValue("prefix")
        return prefix
      }
      return null
    }
    awaitModalSubmitWithFilter(interaction, modal).then((prefix) => {
      console.log(prefix)
    })
  }
}

