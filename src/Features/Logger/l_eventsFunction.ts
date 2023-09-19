


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
function sendEmbed(event_parameter, channel_id, embed) {
  if (channel_id == null) return
  event_parameter.guild.channels.fetch(channel_id).then(async (channel) => {
    await channel.send({ embeds: [embed] })
  })
}



module.exports = sendEmbed
