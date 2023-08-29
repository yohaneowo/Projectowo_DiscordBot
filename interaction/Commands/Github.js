const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Github Repository"),
  async execute(interaction, client) {
    const guild_id = interaction.guild.id
    const interaction_channel_id = interaction.channelId
    client.guilds.fetch(guild_id).then((guild) => {
      guild.channels.fetch(interaction_channel_id).then(async (channel) => {
        const inviteLink = await channel.createInvite({
          maxUses: 1,
          maxAge: 60 * 60 * 24,
          temporary: false,
          unique: true,
          reason: "Project_QAQ's Server"
        })
        await interaction.reply(
          "https://github.com/Yohanewww/DiscordBot-Project_QAQ"
        )
        await interaction.followUp(`${inviteLink}`)
      })
    })
  }
}
