const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('获取服务器信息'),

    async execute(interaction) {
        const name = interaction.guild.name;
        const description = interaction.guild.description || '没有提供描述';
        const owner = interaction.guild.ownerId;
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
        const icon = interaction.guild.iconURL;
        const username = interaction.user.tag;
        const useravatar = interaction.user.displayAvatarURL({ dynamic: true });

        console.log(icon)


  
 
        const embed = new EmbedBuilder()
            
            .setTitle(`${name} 服务器信息`)
            .setDescription(description)
            .setColor('#0099ff')
            .setThumbnail(
                {
                    url: icon,
                }
            )
            
            .addFields(
                { name: '所有者', value: owner },
                { name: '服务器 ID', value: id },
                { name: '创建时间', value: createdAt.toString() },
                { name: '最大比特率', value: maximumBitrate.toString() },
                { name: '首选语言', value: prefferedLocale},
                { name: '成员数量', value: memberCount.toString() },
                { name: 'Nitro等级', value: premiumTier.toString()},
                { name: 'Nitro订阅数量', value: premiumSubscriptionCount.toString()},
                { name: '是否大型服务器', value: large.toString().charAt(0).toUpperCase() + large.toString().slice(1) },
                { name: '最大成员数量', value: maximumMembers.toString()},
                { name: 'NSFW等级', value: nsfwLevel.toString() },
                { name: '是否合作伙伴', value: partnered.toString().charAt(0).toUpperCase() + partnered.toString().slice(1) }
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