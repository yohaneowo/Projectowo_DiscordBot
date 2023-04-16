class ChannelType {
    getChannelTypeName(channelType) {
    switch (channelType) {
        case 0:
        return "GuildText";
        case 1:
        return "DM";
        case 2:
        return "GuildVoice";
        case 3:
        return "GroupDM";
        case 4:
        return "GuildCategory";
        case 5:
        return "GuildAnnouncement";
        case 10:
        return "AnnouncementThread";
        case 11:
        return "PublicThread";
        case 12:
        return "PrivateThread";
        case 13:
        return "GuildStageVoice";
        case 14:
        return "GuildDirectory";
        case 15:
        return "GuildForum";
        default:
        return "Unknown";
    }
    }
}

module.exports = {
    ChannelType
}