


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'SlashComma... Remove this comment to see the full error message
const { SlashCommandBuilder } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'TaiFeng_Fu... Remove this comment to see the full error message
const TaiFeng_FunctionManager = require("../tf_FuntionManager.js")



module.exports = {
  data: new SlashCommandBuilder()
    .setName("颱風速報")
    .setDescription("大風吹,吹什麼"),
  async execute(interaction) {
    interaction.deferReply()
    let zhHantPredictionMsg = ""
    const tf_FunctionManager = new TaiFeng_FunctionManager()
    await tf_FunctionManager.getTaiFengScreenshot(
      "https://tf.istrongcloud.com/",
      "./lib/img/api/taifeng/taifeng.png"
    )
    const response = await tf_FunctionManager.getTaiFengMessage()

    const year = response.records.tropicalCyclones.tropicalCyclone[0].year
    const ch_name =
      response.records.tropicalCyclones.tropicalCyclone[0].cwbTyphoonName
    const total_data =
      response.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix
        .length
    const latest_data =
      response.records.tropicalCyclones.tropicalCyclone[0].analysisData.fix[
        total_data - 1
      ]
    if (latest_data.movingPrediction.length > 0) {
      let moving_prediction = latest_data.movingPrediction
      const zhHantPrediction = moving_prediction.find(
        (prediction) => prediction.lang === "zh-hant"
      )
      if (zhHantPrediction) {
        zhHantPredictionMsg = zhHantPrediction.value
        // console.log(zhHantPrediction.value) // 打印 'zh-hant' 的信息
      } else {
        console.log("No zh-hant prediction found.")
      }
    }
    await interaction.editReply({
      content: `${year}年颱風\\[**${ch_name}**\\]最新資料 \n \`${zhHantPredictionMsg}\``,
      files: ["./lib/img/api/taifeng/taifeng.png"]
    })
  }
}
