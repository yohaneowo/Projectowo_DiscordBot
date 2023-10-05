function sendEmbed(event_parameter, channel_id, embed) {
  if (channel_id == null) return
  event_parameter.guild.channels.fetch(channel_id).then(async (channel) => {
    await channel.send({ embeds: [embed] })
  })
}

export default { sendEmbed }
