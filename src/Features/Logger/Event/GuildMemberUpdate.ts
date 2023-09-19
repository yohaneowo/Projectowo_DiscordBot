


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'EmbedBuild... Remove this comment to see the full error message
const { EmbedBuilder } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Logger_Dat... Remove this comment to see the full error message
const { Logger_DatabaseFunction } = require("../l_databaseFunctionManager.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sendEmbed'... Remove this comment to see the full error message
const sendEmbed = require("../l_eventsFunction.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loggerDbFu... Remove this comment to see the full error message
const loggerDbFunctionsManager = new Logger_DatabaseFunction()



module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    const eventEmitter_Guild_Id = oldMember.guild.id
    const guildsUsingLogger =
      await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
    const loggerCollectionData =
      await loggerDbFunctionsManager.getChannelIds_Logger_Collection(
        eventEmitter_Guild_Id
      )


    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    const memberLogsChannelId = loggerCollectionData[0].memberLogsChannelId
    if (oldMember.nickname !== newMember.nickname) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: newMember.user.tag,
          iconURL: newMember.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Nickname Update")
        .setDescription(`**${oldMember.nickname}** 🡺 **${newMember.nickname}**`)
        .setColor("#2986cc")
        .setTimestamp()
        .setFooter({ text: `ID: ${newMember.id}` })
      sendEmbed(oldMember, memberLogsChannelId, embed)
    } else if (oldMember.roles.cache.size !== newMember.roles.cache.size) {


      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (!guildsUsingLogger.includes(eventEmitter_Guild_Id)) return
      const oldRoles = new Set(oldMember.roles.cache.values())
      const newRoles = new Set(newMember.roles.cache.values())
      const addedRoles = [...newRoles].filter((role) => !oldRoles.has(role))
      const removedRoles = [...oldRoles].filter((role) => !newRoles.has(role))
      // try {
      //     const db = await sqlitePool.acquire();
      //     console.log('Connection acquired.'); // 添加调试信息
      //     const result = await db.all('SELECT * FROM Logger_Collection;');
      //     console.log(result); // 打印查询结果
      //     sqlitePool.release(db); // 在回调函数中释放连接
      //     console.log('Connection released.'); // 添加调试信息
      // } catch (error) {
      //     console.error(error); // 打印错误信息
      // }
      // const fuck = await loggerDbFunctionsManager.getTheFuck()
      // console.log(`THIS IS FUCK: ${fuck}`)
      const x = await loggerDbFunctionsManager.getGuild_Ids_Logger_Collection()
      console.log(x)
      const GuildMemberUpdate_embed = new EmbedBuilder()
        .setAuthor({
          name: newMember.user.tag,
          iconURL: newMember.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("Role Update")
        .setColor("#2986cc")
        .setTimestamp()
        .setFooter({ text: `ID: ${newMember.id}` })
      if (addedRoles.length > 0) {
        GuildMemberUpdate_embed.setDescription(`**+${addedRoles}**`)
      } else if (removedRoles) {
        GuildMemberUpdate_embed.setDescription(`**-${removedRoles}**`)
      }
      sendEmbed(oldMember, memberLogsChannelId, GuildMemberUpdate_embed)
    }
  }
}
