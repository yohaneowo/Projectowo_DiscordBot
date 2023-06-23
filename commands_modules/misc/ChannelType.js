class ChannelType {
  getChannelTypeName(channelType) {
    switch (channelType) {
      case 0:
        return "Text Channel";
      case 1:
        return "DM Channel";
      case 2:
        return "Voice Chanel";
      case 3:
        return "Group DM Channel";
      case 4:
        return "Category Channel";
      case 5:
        return "Announcement Channel";
      case 10:
        return "Announcement Thread Channel";
      case 11:
        return "Public Thread Channel";
      case 12:
        return "Private Thread Channel";
      case 13:
        return "Stage Channel";
      case 14:
        return "GuildDirectory";
      case 15:
        return "Forum Channel";
      default:
        return "Unknown";
    }
  }
}

module.exports = {
  ChannelType
};
