const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
// database_command.js中獲取Database指令
const {
  server_status_database_commands
} = require("../../commands_modules/server-status/ss_databaseFunctionManager.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("获取服务器信息"),

  async execute(interaction) {
    const commands = new server_status_database_commands();
    const guildId = interaction.guild.id;
    const guildName = interaction.guild.name;
    const description =
      interaction.guild.description || "這個群主太懶了吧，什麼介紹都沒寫";
    const ownerId = interaction.guild.ownerId;
    const boss = interaction.guild.members.cache.get(ownerId);
    const preferredLocale = interaction.guild.preferredLocale;
    const createdAt = interaction.guild.createdAt;
    const maximumBitrate = interaction.guild.maximumBitrate;
    const premiumTier = interaction.guild.premiumTier;
    const premiumSubscriptionCount = interaction.guild.premiumSubscriptionCount;
    const large = interaction.guild.large;
    const maximumMembers = interaction.guild.maximumMembers;
    const nsfwLevel = interaction.guild.nsfwLevel;
    const partnered = interaction.guild.partnered;
    const allMemberCount = interaction.guild.memberCount;
    const userCount = interaction.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const onlineCount =
      interaction.guild.members.cache.filter(
        (member) => member.presence && member.presence.status !== "offline"
      ).size || "Null";
    const offlineCount =
      interaction.guild.members.cache.filter(
        (member) => member.presence && member.presence.status === "offline"
      ).size || "Null";
    const Bots_Count = interaction.guild.members.cache.filter(
      (member) => member.user.bot
    ).size;
    const presenceCount =
      interaction.guild.members.cache.filter(
        (member) => member.presence && member.presence.status !== "offline"
      ).size - Bots_Count || "Null";
    const guildIcon =
      interaction.guild.iconURL() ||
      "https://cdn.discordapp.com/attachments/876461907840745513/1089581164752273468/404-error-icon-vector-symbol-260nw-1545236357_1.png";
    const userTag = interaction.user.tag;
    const userAvatar = interaction.user.displayAvatarURL({ dynamic: true });

    // 設置Embed
    const embed = new EmbedBuilder()
      .setTitle(`${guildName} 服务器信息`)
      .setDescription(description)
      .setColor("#0099ff")
      .setThumbnail(guildIcon.toString())
      .addFields(
        { name: "所有者", value: `${boss}`, inline: true },
        { name: "服务器 ID", value: guildId, inline: true },
        { name: "创建时间", value: createdAt.toString() },
        { name: "最大比特率", value: maximumBitrate.toString(), inline: true },
        { name: "首选语言", value: preferredLocale, inline: true },
        { name: "Nitro等级", value: premiumTier.toString(), inline: true },
        {
          name: "Nitro订阅数量",
          value: premiumSubscriptionCount.toString(),
          inline: true
        },
        { name: "NSFW等级", value: nsfwLevel.toString(), inline: true },
        {
          name: "是否大型服务器",
          value:
            large.toString().charAt(0).toUpperCase() +
            large.toString().slice(1),
          inline: true
        },
        {
          name: "是否合作伙伴",
          value:
            partnered.toString().charAt(0).toUpperCase() +
            partnered.toString().slice(1),
          inline: true
        },
        {
          name: "最大成员数量",
          value: maximumMembers.toString(),
          inline: true
        },
        { name: "总成员数量", value: allMemberCount.toString(), inline: true },
        { name: "机器人数量", value: Bots_Count.toString(), inline: true },
        { name: "在线總成员数量", value: onlineCount.toString(), inline: true },
        {
          name: "离线總成员数量",
          value: offlineCount.toString(),
          inline: true
        },
        { name: "在线人数", value: presenceCount.toString(), inline: true }
      )
      .setFooter({
        text: `Requested by ${userTag}`,
        iconURL: userAvatar
      });

    commands.update_Guild_Collection_Database(
      guildId,
      guildName,
      ownerId,
      allMemberCount,
      userCount,
      Bots_Count,
      maximumBitrate,
      preferredLocale,
      createdAt,
      premiumTier,
      premiumSubscriptionCount,
      nsfwLevel,
      partnered
    );
    await interaction.reply({ embeds: [embed] });
  }
};
