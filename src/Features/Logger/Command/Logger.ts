// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'SlashComma... Remove this comment to see the full error message
const { SlashCommandBuilder } = require("discord.js")
import { setLogger } from "../subCommands/setLogger"
import { removeLogger } from "../subCommands/removeLogger"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logger")
    .setDescription("Set the status display of the member count")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("创建日志频道")
        .setDescription("Set the status display of the member count")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("删除日志频道")
        .setDescription("Delete the status display of the member count")
    ),

  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "创建日志频道") {
      setLogger(interaction)
    } else if (interaction.options.getSubcommand() === "删除日志频道") {
      removeLogger(interaction)
    }
  }
}
