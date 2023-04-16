
const {  ChannelType, PermissionsBitField} = require('discord.js');
class Logger_ManageFunction {
    async createChannel_raw(interaction, channelName, parentChannel) {
        return await interaction.guild.channels.create({
                name: `${channelName}}`,
                type: ChannelType.GuildText,
                parent: parentChannel,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ManageChannels],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    }
                ],
            })
        
    }

    async createChannel(interaction, selectedOpt, parentChannel) {
        switch (selectedOpt) {
            case 'Category':
                const parent = await interaction.guild.channels.create({
                    name: '📜 LOGGER 📜',
                    type: ChannelType.GuildCategory,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ManageChannels],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                })
                return parent;
            case 'channelCreate':
                const channelCreate = await this.createChannel_raw(interaction, 'channelCreate', parentChannel)
                return channelCreate;
            break;
            case 'channelUpdate':
                const channelUpdate = await this.createChannel_raw(interaction, 'channelUpdate', parentChannel)
                return channelUpdate;
            break;
            case 'channelDelete':
                const channelDelete = await this.createChannel_raw(interaction, 'channelDelete', parentChannel)
                return channelDelete;
            break;
            case 'guildBanAdd':
                const guildBanAdd = await this.createChannel_raw(interaction, 'guildBanAdd', parentChannel)
                return guildBanAdd;
            break;
            case 'guildBanRemove':
                const guildBanRemove = await this.createChannel_raw(interaction, 'guildBanRemove', parentChannel)
                return guildBanRemove;
            break;
            case 'guildRoleCreate':
                const guildRoleCreate = await this.createChannel_raw(interaction, 'guildRoleCreate', parentChannel)
                return guildRoleCreate;
            break;
            case 'guildRoleDelete':
                const guildRoleDelete = await this.createChannel_raw(interaction, 'guildRoleDelete', parentChannel)
                return guildRoleDelete;
            break;
            case 'guildRoleUpdate':
                const guildRoleUpdate = await this.createChannel_raw(interaction, 'guildRoleUpdate', parentChannel)
                return guildRoleUpdate;
            break;
            case 'guildUpdate':
                const guildUpdate = await this.createChannel_raw(interaction, 'guildUpdate', parentChannel)
                return guildUpdate;
            break;
            case 'messageDelete':
                const messageDelete = await this.createChannel_raw(interaction, 'messageDelete', parentChannel)
                return messageDelete;
            break;
            case 'messageDeleteBulk':
                const messageDeleteBulk = await this.createChannel_raw(interaction, 'messageDeleteBulk', parentChannel)
                return messageDeleteBulk;
            break;
            case 'messageUpdate':
                const messageUpdate = await this.createChannel_raw(interaction, 'messageUpdate', parentChannel)
                return messageUpdate;
            break;
            case 'guildMemberAdd':
                const guildMemberAdd = await this.createChannel_raw(interaction, 'guildMemberAdd', parentChannel)
                return guildMemberAdd;
            break;
            case 'guildMemberKick':
                const guildMemberKick = await this.createChannel_raw(interaction, 'guildMemberKick', parentChannel)
                return guildMemberKick;
            break;
            case 'guildMemberRemove':
                const guildMemberRemove = await this.createChannel_raw(interaction, 'guildMemberRemove', parentChannel)
                return guildMemberRemove;
            break;
            case 'guildMemberUpdate':
                const guildMemberUpdate = await this.createChannel_raw(interaction, 'guildMemberUpdate', parentChannel)
                return guildMemberUpdate;
            break;
            case 'guildMemberNickUpdate':
                const guildMemberNickUpdate = await this.createChannel_raw(interaction, 'guildMemberNickUpdate', parentChannel)
                return guildMemberNickUpdate;
            break;
            case 'voiceChannelLeave':
                const voiceChannelLeave = await this.createChannel_raw(interaction, 'voiceChannelLeave', parentChannel)
                return voiceChannelLeave;
            break;
            case 'voiceChannelJoin':
                const voiceChannelJoin = await this.createChannel_raw(interaction, 'voiceChannelJoin', parentChannel)
                return voiceChannelJoin;
            break;
            case 'voiceStateUpdate':
                const voiceStateUpdate = await this.createChannel_raw(interaction, 'voiceStateUpdate', parentChannel)
                return voiceStateUpdate;
            break;
            case 'voiceChannelSwitch':
                const voiceChannelSwitch = await this.createChannel_raw(interaction, 'voiceChannelSwitch', parentChannel)
                return voiceChannelSwitch;
            break;
            case 'guildEmojisUpdate':
                const guildEmojisUpdate = await this.createChannel_raw(interaction, 'guildEmojisUpdate', parentChannel)
                return guildEmojisUpdate;
            break;
        default:
            break;


        }
    }
}

module.exports = {
    Logger_ManageFunction
}