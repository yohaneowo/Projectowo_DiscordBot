const { ComponentType, PermissionsBitField } = require("discord.js");

/*
 * Const {
 *   Logger_ManageFunction
 * } = require(`../../commands_modules/logger/l_channelFunctionManager.js`);
 */
const {
  Logger_DatabaseFunction
} = require("../../commands_modules/logger/l_databaseFunctionManager.js");
const {
  Logger_Interaction_Component,
  Logger_Channel_Ids
} = require("../../commands_modules/logger/l.component.js");
const {
  createChannel
} = require("../../commands_modules/misc/CreateChannel.js");

// 可能会出现的问题=达到channel上限
module.exports = async (interaction) => {
  // Declare function managers

  //   Const logger_FunctionManager = new Logger_ManageFunction();
  const logger_DatabaseFunction = new Logger_DatabaseFunction(),
    selectMenu = new Logger_Interaction_Component().Select_Menu,
    button = new Logger_Interaction_Component().Button,
    msg = await interaction.editReply({
      content: "Select [Logger] to display",
      components: [selectMenu, button]
    });
  let isMenuSelect = false,
    selectMenu_Values = [];

  const menuCollector = msg.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    time: 60000
  });
  menuCollector.on("collect", async (i) => {
    // Check if the user who selected the select menu is the same user who used the command
    if (i.user.id === interaction.user.id) {
      await i.deferUpdate();
      // Temp Storing the values of select menu
      selectMenu_Values = i.values;
      // Since values are collected means select menu is selected
      isMenuSelect = true;
    } else {
      i.reply({ content: "These Selection aren't for you!", ephemeral: true });
    }
  });
  menuCollector.on("end", (collected) => {
    console.log(`Collected ${collected.size} interactions.`);
  });
  // Collector Event for Button
  const Button_collector = msg.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 60000
  });
  Button_collector.on("collect", async (i) => {
    // Check if the user who selected the select menu is the same user who used the command
    if (i.user.id === interaction.user.id) {
      // Check Menu is selected or not , if not then send error message
      if (isMenuSelect) {
        // Get all the ids of the guilds in database
        const Guild_Ids =
          await logger_DatabaseFunction.getGuild_Ids_Logger_Collection();
        // console.log(Guild_Ids);
        const guild_Id = interaction.guild.id;
        if (!Guild_Ids.includes(guild_Id.toString())) {
          // create a constructor to save logger channel ids before inserting into database
          const logger_constructor = new Logger_Channel_Ids();
          const permissionOverwrites = [
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ManageChannels]
              },
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel]
              }
            ],
            parent = await createChannel(
              interaction,
              "Category",
              "categoryChannel",
              permissionOverwrites,
              null
            );
          logger_constructor.Guild_Id = guild_Id.toString();
          logger_constructor.Category_Id = parent.id.toString();
          logger_constructor.Select_Menu_Value = selectMenu_Values.toString();
          for (const value of selectMenu_Values) {
            switch (value) {
              case "0": {
                const default_logs = await createChannel(
                  interaction,
                  "default-logs",
                  "textChannel",
                  permissionOverwrites,
                  parent
                );
                logger_constructor.default_logs_Id = default_logs.id.toString();
                console.log(`case default-logs done for ${guild_Id}`);
                break;
              }
              case "1": {
                const member_logs = await createChannel(
                  interaction,
                  "member-logs",
                  "textChannel",
                  permissionOverwrites,
                  parent
                );
                logger_constructor.member_logs_Id = member_logs.id.toString();
                console.log("case member-logs done");
                break;
              }
              case "2": {
                const server_logs = await createChannel(
                  interaction,
                  "server-logs",
                  "textChannel",
                  permissionOverwrites,
                  parent
                );
                logger_constructor.server_logs_Id = server_logs.id.toString();
                console.log(`case server-logs done for ${guild_Id}`);
                break;
              }
              case "3": {
                const voice_logs = await createChannel(
                  interaction,
                  "voice-logs",
                  "textChannel",
                  permissionOverwrites,
                  parent
                );
                logger_constructor.voice_logs_Id = voice_logs.id.toString();
                console.log("case voice-logs done");
                break;
              }
              case "4": {
                const message_logs = await createChannel(
                  interaction,
                  "message-logs",
                  "textChannel",
                  permissionOverwrites,
                  parent
                );
                logger_constructor.message_logs_Id = message_logs.id.toString();
                console.log("case message-logs done");
                break;
              }
              case "5": {
                const joinLeave_logs = await createChannel(
                  interaction,
                  "joinLeave-logs",
                  "textChannel",
                  permissionOverwrites,
                  parent
                );
                logger_constructor.joinLeave_logs_Id =
                  joinLeave_logs.id.toString();
                console.log("case joinLeave-logs done");
                break;
              }
              default:
                break;
              // 預設的程式碼
            }
          }

          await logger_DatabaseFunction.insert_Logger_Collection(
            logger_constructor.Guild_Id,
            logger_constructor.Category_Id,
            logger_constructor.default_logs_Id,
            logger_constructor.member_logs_Id,
            logger_constructor.server_logs_Id,
            logger_constructor.voice_logs_Id,
            logger_constructor.message_logs_Id,
            logger_constructor.joinLeave_logs_Id,
            logger_constructor.Select_Menu_Value
          );
          interaction.deleteReply();
          interaction.followUp({
            content: "Logger has been created",
            ephemeral: true
          });
          // Await i.editReply({ content: `Logger Set Up Done !`, ephemeral: true });
        } else {
          // Warn the user that the count status already exists
          await i.reply({
            content: "You Set Up before , remove it or edit it",
            ephemeral: true
          });
        }
      } else {
        // Warn the user that at least one status must be selected
        await i.update({ components: [selectMenu, button] });
        await i
          .followUp({
            content: "Please select [Logger] first !",
            ephemeral: false
          })
          .then((message) => {
            setTimeout(() => {
              message.delete();
            }, 3000);
          });
      }
    } else {
      // Warn the user that the button is not for them
      i.editReply({ content: "These buttons aren't for you!", ephemeral: true });
    }
  });
};
