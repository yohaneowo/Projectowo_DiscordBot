const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// database_command.js中獲取Database指令
const { server_status_database_commands } = require('../commands_modules/server_status/database_commands.js');
const commands = new server_status_database_commands();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('获取服务器信息'),

    async execute(interaction) {
        // 獲取服務器信息
        const Guild_Id = interaction.guild.id;
        const Guild_Name = interaction.guild.name;
        const description = interaction.guild.description || '没有提供描述';
        const Owner_Id = interaction.guild.ownerId;
        const boss = interaction.guild.members.cache.get(Owner_Id)
        const preferredLocale = interaction.guild.preferredLocale;
        const createdAt = interaction.guild.createdAt;
        const maximumBitrate = interaction.guild.maximumBitrate;
        const premiumTier = interaction.guild.premiumTier;
        const premiumSubscriptionCount = interaction.guild.premiumSubscriptionCount;
        const large = interaction.guild.large;
        const maximumMembers = interaction.guild.maximumMembers;
        const nsfwLevel = interaction.guild.nsfwLevel;
        const partnered = interaction.guild.partnered;
        const All_Members_Count = interaction.guild.memberCount;
        const Users_Count = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        const onlineCount = interaction.guild.members.cache.filter(member => member.presence && member.presence.status !== 'offline').size || 'Null';
        const offlineCount = interaction.guild.members.cache.filter(member => member.presence && member.presence.status === 'offline').size || 'Null';
        const Bots_Count = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const presenceCount = interaction.guild.members.cache.filter(member => member.presence && member.presence.status !== 'offline').size - Bots_Count || 'Null';
        const icon = interaction.guild.iconURL() || 'https://cdn.discordapp.com/attachments/876461907840745513/1089581164752273468/404-error-icon-vector-symbol-260nw-1545236357_1.png';
        const username = interaction.user.tag;
        const user_avatar = interaction.user.displayAvatarURL({ dynamic: true });
        
        // 設置Embed
        const embed = new EmbedBuilder()
            .setTitle(`${Guild_Name} 服务器信息`)
            .setDescription(description)
            .setColor('#0099ff')
            .setThumbnail(icon.toString())
            .addFields(
                { name: '所有者', value: `${boss}` , inline: true },
                { name: '服务器 ID', value: Guild_Id , inline: true},
                { name: '创建时间', value: createdAt.toString() },
                { name: '最大比特率', value: maximumBitrate.toString(), inline: true },
                { name: '首选语言', value: preferredLocale, inline: true },
                { name: 'Nitro等级', value: premiumTier.toString(), inline: true },
                { name: 'Nitro订阅数量', value: premiumSubscriptionCount.toString(), inline: true},
                { name: 'NSFW等级', value: nsfwLevel.toString(), inline: true },
                { name: '是否大型服务器', value: large.toString().charAt(0).toUpperCase() + large.toString().slice(1), inline: true },
                { name: '是否合作伙伴', value: partnered.toString().charAt(0).toUpperCase() + partnered.toString().slice(1), inline: true },
                { name: '最大成员数量', value: maximumMembers.toString(), inline: true },
                { name: '总成员数量', value: All_Members_Count.toString(), inline: true },
                { name: '机器人数量', value: Bots_Count.toString(), inline: true },
                { name: '在线總成员数量', value: onlineCount.toString(), inline: true},
                { name: '离线總成员数量', value: offlineCount.toString(), inline: true},
                { name: '在线人数', value: presenceCount.toString(), inline: true}
                )
            .setFooter({
                text: username,
                iconURL: user_avatar,
            });

        commands.update_Guild_Collection_Database(Guild_Id, Guild_Name, Owner_Id, All_Members_Count, Users_Count, Bots_Count, maximumBitrate, preferredLocale, createdAt, premiumTier, premiumSubscriptionCount, nsfwLevel, partnered);
        await interaction.reply({ embeds: [embed] })
    },
};