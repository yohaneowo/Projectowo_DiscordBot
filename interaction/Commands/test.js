const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const MovierParser_Interaction_Components = require("../../commands_modules/movie_parser/mp_component.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with Pong!"),
  async execute(interaction, client) {
    const username = interaction.user.tag
    const user_avatar = interaction.user.displayAvatarURL({ dynamic: true })
    const mp_InteractionComponents = new MovierParser_Interaction_Components()
    const initialEmbedButtonLine1 =
      mp_InteractionComponents.initialEmbedButtonLine1

    const InteractionFinalReply = new EmbedBuilder()
      .setThumbnail(
        "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_6d75fd4f85ade111b87745cb13726f05.jpeg?from=116350172"
      )
      .setColor(0x0099ff)
      .setTitle("╲⎝⧹Ping⧸⎠╱")
      .setDescription(
        `**»**⠀\`延迟...${client.ws.ping}ms\` <a:Meow:761724979720617994>`
      )
      .setTimestamp()
      .setFooter({ text: `Requested by ${username}`, iconURL: user_avatar })
    await interaction.reply({
      // content: "# 你那么可爱，我想把你放在口袋里，带到哪里都可以看到你。",
      // embeds: [InteractionFinalReply],
      // files: ["./video.mp4"]
      components: [initialEmbedButtonLine1]
    })
  }
}
