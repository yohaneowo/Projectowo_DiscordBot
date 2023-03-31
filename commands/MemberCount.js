const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require("sqlite3");
module.exports = get_Guild_Ids;
function get_Guild_Ids() {
    return new Promise(function (resolve, reject) {
        const db = new sqlite3.Database("./lib/database/SQLite.db")
        db.all('SELECT CAST(Guild_Id as TEXT) as Guild_Id FROM Guild_Collection', [], function (err, rows) {
            db.close();
            if (err) {
                reject(err)
            } else {
                const guild_Ids = rows.map(row => row.Guild_Id);
                resolve(guild_Ids)
                }
            }, 
        )
    })
}

module.exports = {
    data : new SlashCommandBuilder()
        .setName('update_count')
        .setDescription('手动更新成员计数'),

    async execute(interaction, client, message) {
        // 确认 ID 并获取频道
        const guildId = interaction.guild.id;
        const All_Members_Count = interaction.guild.memberCount;
        const Users_Count = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        const Bots_Count = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const All_Online_Count = interaction.guild.members.cache.filter(member => member.presence.status !== 'offline').size;
        const All_Offline_Count = interaction.guild.members.cache.filter(member => member.presence.status === 'offline').size;
        const User_Online_Count = interaction.guild.members.cache.filter(member => member.presence.status !== 'offline' &&  member.user.bot == false).size;
        const User_Idle_Count = interaction.guild.members.cache.filter(member => member.presence.status === 'idle' &&  member.user.bot == false).size;
        const User_Dnd_Count = interaction.guild.members.cache.filter(member => member.presence.status === 'dnd' &&  member.user.bot == false).size;
        const User_Offline_Count = interaction.guild.members.cache.filter(member => member.presence.status === 'offline' &&  member.user.bot == false).size;
        // const Member_Count_Category = await interaction.guild.channels.create({ name: "📊 SERVER STATS 📊", type : "GUILD_CATEGORY"})
        Update_Member_Count_Database();
    function Update_Member_Count_Database() {
        // 用Promise来获取Guild_Ids的遞歸
        get_Guild_Ids().then(function (Guild_Ids) {
            const db = new sqlite3.Database("./lib/database/SQLite.db")
            // 遞歸的Guild_Ids是string所以要轉換來對比
            if (Guild_Ids.includes(guildId.toString())) {
                db.serialize(function () {
                db.run("UPDATE Member_Count SET All_Members_Count = ?, Users_Count = ?, Bots_Count = ?,"+
                    "All_Online_Count = ?, All_Offline_Count = ?, User_Online_Count = ?, User_Idle_Count = ?,"+
                    " User_Dnd_Count = ?, User_Offline_Count = ? WHERE Guild_Id = ?",
                    [All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Offline_Count, User_Online_Count, User_Idle_Count, User_Dnd_Count, User_Offline_Count, guildId],
                    function(err) {
                        if (err) {
                            return console.log(`MODIFICATION:${err.message}`);
                        }else {
                            console.log("UPDATED MEMBER COUNT")
                        }
                    }
                    )
                db.close();
                })
            } else {
                db.serialize(function () {
                    db.run("INSERT INTO Member_Count VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [guildId, All_Members_Count, Users_Count, Bots_Count, All_Online_Count, All_Offline_Count, User_Online_Count, User_Idle_Count, User_Dnd_Count, User_Offline_Count]),
                    function(err) {
                        if (err) {
                            return console.log(`INSERTION:${err.message}`);
                        } else {
                            console.log("INSERTED MEMBER COUNT")
                        }
                    }
                    db.close();
                    })
                }
        })
        .catch(function (err) { console.error(err); });
    }
    
    interaction.reply({ content: '已更新成员计数！', ephemeral: true });
       
        // console.log(userIdleCount)
    //     // 确认所有频道是否存在
    //     if (!allMembersCountChannel || !trueMembersCountChannel || !botsCountChannel) {
    //         return message.reply('成员计数频道不存在，请使用 !build_count 命令创建。');
    //     }

    //     // 更新频道名称
    //     await this.update_member_count_channel_name(message.guild);

    //     // 发送确认消息
    //     const embed = new EmbedBuilder()
    //         .setTitle('更新成功')
    //         .setDescription(`${message.author} 已更新成员计数！`)
    //         .setColor('#00ff00')@
    //         .setTimestamp();
    //     message.channel.send({ embeds: [embed] });
    // },

    // async update_member_count_channel_name(guild) {
    //     // 获取成员数量
    //     const allMembersCount = guild.memberCount;
    //     const trueMembersCount = guild.members.cache.filter(member => !member.user.bot).size;
    //     const botsCount = guild.members.cache.filter(member => member.user.bot).size;

    //     // 更新频道名称
    //     await this.update_channel_name(guild.channels.cache.get(this.all_members_channel_id), `All Members: ${allMembersCount}`);
    //     await this.update_channel_name(guild.channels.cache.get(this.true_members_channel_id), `Members: ${trueMembersCount} 🙍🙍`);
    //     await this.update_channel_name(guild.channels.cache.get(this.bots_channel_id), `Bots: ${botsCount} 🤖🏴`);
    // },

    // const sqlite3 = require('sqlite3').verbose();

    // // 创建或打开数据库连接
    // let db = new sqlite3.Database(':memory:');

    // // 执行数据库操作
    // db.serialize(function () {
    //     // 创建表
    //     db.run("CREATE TABLE users (id INT, name TEXT)");

    //     // 插入数据
    //     let stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
    //     for (let i = 0; i < 10; i++) {
    //         stmt.run(i, "User " + i);
    //     }
    //     stmt.finalize();

    //     // 查询数据
    //     db.each("SELECT id, name FROM users", function (err, row) {
    //         console.log(row.id + ": " + row.name);
    //     });

    //     // 删除表
    //     db.run("DROP TABLE users");
    // });

    // // 关闭数据库连接
    // db.close();

    // async update_channel_name(channel, newName) {
    //     await channel.setName(newName);
    // }
    }
}