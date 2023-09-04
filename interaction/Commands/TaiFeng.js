const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const TaiFeng_FunctionManager = require("..//../commands_modules/taifeng/tf_FuntionManager.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with Pong!"),
  async execute(interaction, client) {
    const tf_FunctionManager = new TaiFeng_FunctionManager()
    tf_FunctionManager.screenshot(
      "https://tf.istrongcloud.com/",
      "../../img/api/taifeng.png"
    )
    const response = tf_FunctionManager.getTaiFengMessage()

    const year = response.tropicalCyclones.tropicalCyclone[0].year
    const ch_name = response.tropicalCyclones.tropicalCyclone[0].cwbTyphoonName
  }
}
