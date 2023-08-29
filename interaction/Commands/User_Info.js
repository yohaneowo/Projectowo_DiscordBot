const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("User's Information")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user's information you want to see")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user")
    const User_Embed = new EmbedBuilder()
      .setTitle(`${user.tag}`)
      .setColor("#fdadad")
      // .setDescription('出大事啦！')
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      .addFields(
        // { name: `lineNumber`, value: `${err.lineNumber}`, inline: true },
        // { name: `fileName`, value: `${err.fileName}`, inline: true },
        // { name: `stack`, value: `${err.stack}`, inline: false },
        { name: "<:id:1096624398255005707> ID", value: `${user.id}` },
        {
          name: "<:createAt:1096624557001023538> 創建時間",
          value: `${user.createdAt}`,
          inline: true
        }
      )
      .setFooter(
        {
          text: interaction?.user.username || "Unknown",
          iconURL: interaction?.user.displayAvatarURL({ dynamic: true })
        } || "Unknown"
      )
    interaction.reply({ embeds: [User_Embed] })
  }
}
