const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
class MovierParser_Interaction_Components {
  // Button Component FOR Slash Command
  button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("1")
      .setLabel("1⭐")
      .setStyle(ButtonStyle.Primary),
    // .setEmoji("<a:Parrot_hype:760289417381281832>")

    new ButtonBuilder()
      .setCustomId("2")
      .setLabel("2⭐")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("3")
      .setLabel("3⭐")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("4")
      .setLabel("4⭐")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("5")
      .setLabel("5⭐")
      .setStyle(ButtonStyle.Primary)
  )

  button2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("0.5")
      .setLabel("0.5⭐")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false),

    new ButtonBuilder()
      .setCustomId("score")
      .setLabel("score")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("<:nicegrab:742290006953033778>")
      .setDisabled(true),

    new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("确定")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("不评分")
      .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
      .setCustomId("cancel2")
      .setLabel("取消")
      .setStyle(ButtonStyle.Danger)
  )
  pageButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("page")
      .setLabel("页数")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true)
  )

  chooseButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("leftArrow")
      .setEmoji("⬅️")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("one")
      .setEmoji("1️⃣")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("two")
      .setEmoji("2️⃣")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("three")
      .setEmoji("3️⃣")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("rightArrow")
      .setEmoji("➡️")
      .setStyle(ButtonStyle.Primary)
  )

  voteButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("good")
      .setLabel("顶")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("bad")
      .setLabel("踩")
      .setStyle(ButtonStyle.Danger)
  )
}

// Exporting Module
module.exports = MovierParser_Interaction_Components
