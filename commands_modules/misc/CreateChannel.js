const { ChannelType } = require("discord.js");
async function convertChannelType(channelType) {
  switch (channelType) {
    case "textChannel":
      return ChannelType.GuildText;
    case "voiceChannel":
      return ChannelType.GuildVoice;
    case "categoryChannel":
      return ChannelType.GuildCategory;
    default:
      return ChannelType.GuildText;
  }
}

async function createChannel(
  interaction,
  channelName,
  channelType,
  channelPermissionsBitField,
  parentId
) {
  return await interaction.guild.channels.create({
    name: channelName,
    type: await convertChannelType(channelType),
    parent: parentId,
    permissionOverwrites: channelPermissionsBitField
  });
}

module.exports = {
  createChannel
};
