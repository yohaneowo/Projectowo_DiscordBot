const { getDb } = require("../../sqlConnection.js");

class VideoParser_DatabaseManager {
  getServerConfig(guildId) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb();
        const stmt = db.prepare(
          "SELECT * FROM Server_Config WHERE guild_id = ?"
        );
        const serverConfig = stmt.get(guildId);
        // console.log("serverConfig: ", serverConfig);

        if (serverConfig) {
          resolve(serverConfig);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  getVideoParserConfig(guildId) {
    return new Promise((resolve, reject) => {
      try {
        const db = getDb();
        const stmt = db.prepare(
          "SELECT * FROM VideoParser_Config WHERE guild_id = ?"
        );
        const videoParserConfig = stmt.get(guildId);
        // console.log("videoParserConfig: ", videoParserConfig);
        if (videoParserConfig) {
          resolve(videoParserConfig);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
module.exports = {
  VideoParser_DatabaseManager
};
