const {
  VideoParser_DatabaseManager
} = require("../commands_modules/video_parser/vp_databaseManager.js");
const axios = require("axios");
const fs = require("fs");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    const vp_databaseManager = new VideoParser_DatabaseManager();
    if (message.author.bot) return;
    if (message.channel.type === "DM") return;
    const serverConfig = await vp_databaseManager.getServerConfig(
      message.guild.id
    );
    // const videoParser = await vp_databaseManager.getVideoParserConfig(
    //   message.guild.id
    // );

    // console.log(serverConfig.video_parser);
    // console.log(videoParser);
    const user_id = message.author.id;
    /*
      serverConfig -> video_parser enable are allowed to use video parser
    */
    if (serverConfig.video_parser == 1) {
      const regex =
        /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\)\\,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;
      const str = message.content;
      const result = str.match(regex);
      // console.log(typeof result[0]);
      // console.log(result[0]);
      if (result && result.length > 0 && result[0].includes("tiktok")) {
        message.delete();
        const wait_massage = await message.channel.send({
          content: `<@${user_id}> 请你稍等,正在解析当中...`
        });

        axios
          .get(`http://127.0.0.1:8000/api/hybrid_parsing/${result[0]}`)
          .then((response) => {
            // console.log("response:", response.data);
            const jsonData = response.data;
            const video_url = jsonData.video_data.nwm_video_url_HQ;
            let video_playCount = jsonData.statistics.play_count;
            let video_author = jsonData.author.nickname;
            let video_desc = jsonData.desc;
            axios
              .get(video_url, { responseType: "stream" })
              .then((response) => {
                const writer = fs.createWriteStream("./video.mp4");
                response.data.pipe(writer);
                return new Promise((resolve, reject) => {
                  writer.on("finish", resolve);
                  writer.on("error", reject);
                });
              })
              .then(() => {
                wait_massage.delete();
                var alphabeticStr = video_author.replace(/[^a-zA-Z]/g, "");
                let space = " ".repeat(alphabeticStr.length * 4.2);
                let space2 = " ".repeat(alphabeticStr.length);
                let video_statistic = `===== ╔${space}╗ ======\n作者:${space2}${video_author}${space2}播放量:   ${video_playCount}\n===== ╚${space}╝ ======`;
                message.channel.send({
                  content: `${video_statistic}\n${video_desc}`,
                  files: ["./video.mp4"]
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
};
