const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

class Logger_Interaction_Component {
  Button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("primary")
      .setLabel("Select Done !")
      .setStyle(ButtonStyle.Primary)
  );
  // Select CREATE TABLE "Logger_Collection" (
  q;
  Select_Menu = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("select")
      .setPlaceholder("Nothing selected")
      .setMinValues(1)
      .setMaxValues(6)
      .addOptions([
        {
          label: "default-logs",
          description: "default-logs",
          value: "0"
        },
        {
          label: "member-logs",
          description: "member-logs",
          value: "1"
        },
        {
          label: "server-logs",
          description: "server-logs",
          value: "2"
        },
        {
          label: "voice-logs",
          description: "voice-logs",
          value: "3"
        },
        {
          label: "message-logs",
          description: "message-logs",
          value: "4"
        },
        {
          label: "joinLeave-logs",
          description: "joinLeave-logs",
          value: "5"
        }
      ])
  );
}

class Logger_Channel_Ids {
  Logger_Channel_Ids() {
    (this.Guild_Id = " "),
      (this.Category_Id = " "),
      (this.default_logs_Id = " "),
      (this.member_logs_Id = " "),
      (this.server_logs_Id = " "),
      (this.voice_logs_Id = " "),
      (this.message_logs_Id = " "),
      (this.joinLeave_logs_Id = " "),
      (this.Select_Menu_Values = "");
  }
}

module.exports = {
  Logger_Interaction_Component,
  Logger_Channel_Ids
};
