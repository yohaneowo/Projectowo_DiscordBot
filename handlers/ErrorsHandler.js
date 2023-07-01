const { EmbedBuilder } = require("discord.js");
const { err_AnnouncementChannel_ID } = require("../config.json");
module.exports = (client) => {
  const errChannel = err_AnnouncementChannel_ID;
  process.on("unhandledRejection", (reason, promise) => {
    console.log("[Anti-crash] :: Unhandled Rejection/Catch");
    console.log(reason, promise);
    const errEmbed1 = new EmbedBuilder()
      .setColor("#ED4245")
      .setTitle("┏━°⌜ Error Handling System ⌟°━┓")
      .setDescription("出大事啦")
      .addFields({ name: `${promise}`, value: `${reason}`, inline: false })
      .setTimestamp()
      .setFooter({ text: "Anti Crash System" });
    client.channels.cache.get(errChannel)?.send({ embeds: [errEmbed1] });
  });

  process.on("uncaughtException", (err, origin) => {
    console.log("[Anti-crash] :: uncaughtException/Catch");
    console.log(err, origin);
    const errEmbed2 = new EmbedBuilder()
      .setColor("#ED4245")
      .setTitle("┏━°⌜ Error Handling System ⌟°━┓")
      .setDescription("出大事啦")
      .addFields({ name: `${origin}`, value: `${err}`, inline: false })
      .setTimestamp()
      .setFooter({ text: "Anti Crash System" });
    client.channels.cache.get(errChannel)?.send({ embeds: [errEmbed2] });
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("[Anti-crash] :: uncaughtExceptionMonitor/Catch");
    console.log(err, origin);
    const errEmbed3 = new EmbedBuilder()
      .setColor("#ED4245")
      .setTitle("┏━°⌜ Error Handling System ⌟°━┓")
      .setDescription("出大事啦")
      .addFields({ name: `${origin}`, value: `${err}`, inline: false })
      .setTimestamp()
      .setFooter({ text: "Anti Crash System" });
    client.channels.cache.get(errChannel)?.send({ embeds: [errEmbed3] });
  });

  process.on("syntaxError", (err) => {
    const errEmbed = new EmbedBuilder()
      .setTitle("Syntax Error")
      .setDescription(err.message)
      .addField("Stack Trace", err.stack)
      .setTimestamp()
      .setFooter({ text: "Anti Crash System" });
    client.channels.cache.get(errChannel)?.send({ embeds: [errEmbed] });
  });

  process.on("timeout", (err) => {
    const errEmbed = new EmbedBuilder()
      .setTitle("Timeout Error")
      .setDescription(err.message)
      .addField("Stack Trace", err.stack)
      .setTimestamp()
      .setFooter({ text: "Anti Crash System" });
    client.channels.cache.get(errChannel).send({ embeds: [errEmbed] });
  });
};
