


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ChannelTyp... Remove this comment to see the full error message
const { ChannelType, PermissionsBitField } = require("discord.js")
class Logger_ManageFunction {
  async createVoiceChannel_raw(interaction, channelName, parentChannel) {
    return await interaction.guild.channels.create({
      name: `${channelName}}`,
      type: ChannelType.GuildText,
      parent: parentChannel,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ManageChannels]
        },
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    })
  }

  async createChannel(interaction, selectedOpt, parentChannel) {
    switch (selectedOpt) {
      case "Category": {
        const parent = await interaction.guild.channels.create({
          name: "📜 LOGGER 📜",
          type: ChannelType.GuildCategory,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [PermissionsBitField.Flags.ManageChannels]
            },
            {
              id: interaction.guild.roles.everyone,
              deny: [PermissionsBitField.Flags.ViewChannel]
            }
          ]
        })
        return parent
      }
      case "default-logs": {
        return await this.createVoiceChannel_raw(
          interaction,
          "default-logs",
          parentChannel
        )
      }
      case "member-logs": {
        return await this.createVoiceChannel_raw(
          interaction,
          "member-logs",
          parentChannel
        )
      }
      case "server-logs": {
        return await this.createVoiceChannel_raw(
          interaction,
          "server-logs",
          parentChannel
        )
      }
      case "voice-logs": {
        return await this.createVoiceChannel_raw(
          interaction,
          "voice-logs",
          parentChannel
        )
      }
      case "message-logs": {
        return await this.createVoiceChannel_raw(
          interaction,
          "message-logs",
          parentChannel
        )
      }
      case "joinLeave-logs": {
        return await this.createVoiceChannel_raw(
          interaction,
          "joinLeave-logs",
          parentChannel
        )
      }
      default:
        break
    }
  }
}



module.exports = {
  Logger_ManageFunction
}
