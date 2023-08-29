BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "MemberCount_ChannelId" (
	"Guild_Id"	TEXT,
	"Category_Id"	TEXT UNIQUE,
	"All_Members_Count_Id"	TEXT UNIQUE,
	"Users_Count_Id"	TEXT UNIQUE,
	"Bots_Count_Id"	TEXT UNIQUE,
	"All_Online_Count_Id"	TEXT UNIQUE,
	"All_Online_Count_include_idle_Id"	TEXT UNIQUE,
	"All_Online_Count_include_idle_dnd_Id"	TEXT UNIQUE,
	"All_Offline_Count_Id"	TEXT UNIQUE,
	"User_Online_Count_Id"	TEXT UNIQUE,
	"User_Online_Count_include_idle_Id"	TEXT UNIQUE,
	"User_Online_Count_include_idle_dnd_Id"	TEXT UNIQUE,
	"User_Idle_Count_Id"	TEXT UNIQUE,
	"User_Dnd_Count_Id"	TEXT UNIQUE,
	"User_Offline_Count_Id"	TEXT UNIQUE,
	"Added_User_Id"	TEXT,
	"Added_datetime"	TEXT,
	"Menu_Select_Values"	TEXT,
	PRIMARY KEY("Guild_Id")
);
CREATE TABLE IF NOT EXISTS "Member_Count_Collection" (
	"Guild_Id"	INTEGER NOT NULL,
	"All_Members_Count"	INTEGER,
	"Users_Count"	INTEGER,
	"Bots_Count"	INTEGER,
	"All_Online_Count"	INTEGER,
	"All_Online_Count_include_idle"	INTEGER,
	"All_Online_Count_include_idle_dnd"	INTEGER,
	"All_Offline_Count"	INTEGER,
	"User_Online_Count"	INTEGER,
	"User_Online_Count_include_idle"	INTEGER,
	"User_Online_Count_include_idle_dnd"	INTEGER,
	"User_Idle_Count"	INTEGER,
	"User_Dnd_Count"	INTEGER,
	"User_Offline_Count"	INTEGER,
	PRIMARY KEY("Guild_Id")
);
CREATE TABLE IF NOT EXISTS "DynamicVC_Collection" (
	"DynamicVC_Id"	INTEGER NOT NULL,
	"Set_mainChannel_Id"	TEXT,
	"Guild_Id"	TEXT,
	"createdAt"	TEXT,
	"subChannel_createdCount"	INTEGER,
	"isAntiMuteChannel"	INTEGER,
	FOREIGN KEY("Guild_Id") REFERENCES "Guild"("Guild_Id"),
	PRIMARY KEY("DynamicVC_Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "DynamicVC_subId" (
	"subChannel_Id"	TEXT,
	"Guild_Id"	TEXT,
	"isAntiMuteChannel"	TEXT,
	FOREIGN KEY("Guild_Id") REFERENCES "Guild"("Guild_Id")
);
CREATE TABLE IF NOT EXISTS "Logger_Collection" (
	"Logger_Id"	INTEGER NOT NULL,
	"Guild_Id"	TEXT,
	"categoryChannelId"	TEXT,
	"defaultLogsChannelId"	TEXT,
	"memberLogsChannelId"	TEXT,
	"serverLogsChannelId"	TEXT,
	"voiceLogsChannelId"	TEXT,
	"messageLogsChannelId"	TEXT,
	"joinleaveLogsChannelId"	TEXT,
	"selectMenu_Values"	TEXT,
	FOREIGN KEY("Guild_Id") REFERENCES "Guild"("Guild_Id"),
	PRIMARY KEY("Logger_Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Personal_Info_Collection" (
	"Personal_Id"	INTEGER NOT NULL,
	"User_Id"	INTEGER,
	"Guild_Id"	INTEGER,
	"Steam_Id"	INTEGER,
	"Steam_Friend_code"	INTEGER,
	"Twitter_Id"	INTEGER,
	"OnlyFans_Id"	INTEGER,
	"Instagram_Id"	INTEGER,
	FOREIGN KEY("Guild_Id") REFERENCES "Guild"("Guild_Id"),
	PRIMARY KEY("Personal_Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Welcomer_Collection" (
	"welcomer_id"	INTEGER NOT NULL,
	"channel_id"	TEXT,
	"Guild_Id"	TEXT,
	"created_at"	TEXT,
	"created_by"	TEXT,
	PRIMARY KEY("welcomer_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "guild" (
	"guild_id"	TEXT NOT NULL,
	"guild_name"	TEXT,
	"owner_id"	TEXT,
	"all_member_count"	TEXT,
	"user_count"	TEXT,
	"bot_count"	TEXT,
	"maximum_bitrate"	TEXT,
	"preferred_locale"	TEXT,
	"created_at"	TEXT,
	"premium_tier"	TEXT,
	"premium_subscription_count"	INTEGER,
	"nsfw_level"	INTEGER,
	"partnered"	TEXT,
	PRIMARY KEY("guild_id")
);
CREATE TABLE IF NOT EXISTS "Emoji_Collections" (
	"Emoji_No"	INTEGER,
	"Emoji_Id"	INTEGER UNIQUE,
	"Emoji_Name"	TEXT,
	"Emoji_Identifier"	TEXT UNIQUE,
	"Emoji_CreatedTimeStamp"	INTEGER,
	"Emoji_Url"	TEXT UNIQUE,
	"AnimatedBoolean"	INTEGER,
	"Guild_Id"	INTEGER,
	"Guild_Name"	TEXT,
	PRIMARY KEY("Emoji_No")
);
CREATE TABLE IF NOT EXISTS "user_emoji_prefix" (
	"user_id"	TEXT,
	"prefix"	TEXT,
	PRIMARY KEY("user_id")
);
CREATE TABLE IF NOT EXISTS "user_emoji_storage" (
	"guild_id"	TEXT,
	"user_id"	TEXT,
	PRIMARY KEY("guild_id")
);
CREATE TABLE IF NOT EXISTS "emoji_collection" (
	"emoji_id"	TEXT,
	"emoji_name"	TEXT,
	"emoji_identifier"	TEXT,
	"guild_id"	TEXT,
	"createdAt"	TEXT,
	"animated"	TEXT,
	"belong_to"	TEXT,
	"emoji_url"	TEXT,
	"isEmojiPack"	TEXT,
	PRIMARY KEY("emoji_id")
);
CREATE TABLE IF NOT EXISTS "VideoParser_Config" (
	"guild_id"	TEXT,
	"tiktok_parsing"	INTEGER DEFAULT (0),
	"douyin_parsing"	INTEGER DEFAULT (0),
	PRIMARY KEY("guild_id")
);
CREATE TABLE IF NOT EXISTS "Server_Config" (
	"guild_id"	TEXT,
	"guild_name"	TEXT,
	"video_parser"	INTEGER,
	"movie_parser"	TEXT,
	PRIMARY KEY("guild_id")
);
COMMIT;
