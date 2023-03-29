const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('获取服务器信息'),

    async execute(interaction) {
        const name = interaction.guild.name;
        const description = interaction.guild.description || '没有提供描述';
        const ownerId = interaction.guild.ownerId;
        const boss = interaction.guild.members.cache.get(ownerId)
        const prefferedLocale = interaction.guild.preferredLocale;
        const id = interaction.guild.id;
        const createdAt = interaction.guild.createdAt;
        const maximumBitrate = interaction.guild.maximumBitrate;
        const premiumTier = interaction.guild.premiumTier;
        const premiumSubscriptionCount = interaction.guild.premiumSubscriptionCount;
        const large = interaction.guild.large;
        const maximumMembers = interaction.guild.maximumMembers;
        const nsfwLevel = interaction.guild.nsfwLevel;
        const partnered = interaction.guild.partnered;
        const memberCount = interaction.guild.memberCount;
        const onlineCount = interaction.guild.members.cache.filter(member => member.presence.status !== 'offline').size;
        const offlineCount = interaction.guild.members.cache.filter(member => member.presence.status === 'offline').size;
        const botCount = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const presenceCount = interaction.guild.members.cache.filter(member => member.presence.status !== 'offline').size - botCount;
        const icon = interaction.guild.iconURL() || 'https://cdn.discordapp.com/attachments/876461907840745513/1089581164752273468/404-error-icon-vector-symbol-260nw-1545236357_1.png';
        const username = interaction.user.tag;
        const useravatar = interaction.user.displayAvatarURL({ dynamic: true });
    
        const embed = new EmbedBuilder()
            
            .setTitle(`${name} 服务器信息`)
            .setDescription(description)
            .setColor('#0099ff')
            .setThumbnail(icon.toString())
            .addFields(
                { name: '所有者', value: `${boss}` , inline: true },
                { name: '服务器 ID', value: id , inline: true},
                { name: '创建时间', value: createdAt.toString() },
                { name: '最大比特率', value: maximumBitrate.toString(), inline: true },
                { name: '首选语言', value: prefferedLocale, inline: true },
                { name: 'Nitro等级', value: premiumTier.toString(), inline: true },
                { name: 'Nitro订阅数量', value: premiumSubscriptionCount.toString(), inline: true},
                { name: 'NSFW等级', value: nsfwLevel.toString(), inline: true },
                { name: '是否大型服务器', value: large.toString().charAt(0).toUpperCase() + large.toString().slice(1), inline: true },
                { name: '是否合作伙伴', value: partnered.toString().charAt(0).toUpperCase() + partnered.toString().slice(1), inline: true },
                { name: '最大成员数量', value: maximumMembers.toString(), inline: true },
                { name: '总成员数量', value: memberCount.toString(), inline: true },
                { name: '机器人数量', value: botCount.toString(), inline: true },
                { name: '在线總成员数量', value: onlineCount.toString(), inline: true},
                { name: '离线總成员数量', value: offlineCount.toString(), inline: true},
                { name: '在线人数', value: presenceCount.toString(), inline: true}
                )
            .setFooter({
                text: username,
                iconURL: useravatar,
            });

        await interaction.reply({ embeds: [embed] })
        // .then((serverinfo) => {
        //     setTimeout(() => {
        //         serverinfo.delete();
        //     }, 60000);
        // });
    },
};