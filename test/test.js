const client = require('../index.js');  
const sqlite3 = require('sqlite3');
const {PermissionsBitField, ChannelType} = require('discord.js');
const {DynamicVC_DatabaseManager} = require('../commands_modules/dynamic_voicechannel/dv_databaseFunctionManager.js');
const {Welcomer_DatabaseManager} = require(process.cwd() +'/commands_modules/welcomer/wc_databaseFunctionManager.js')

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(oldState, newState) {
        if(newState.channel) {
            try {   
                    welcomer_DatabaseManager = new Welcomer_DatabaseManager()
                    console.log(newState.member.guild.id)
                  const Welcomer_row = await welcomer_DatabaseManager.getWelcomer_Collection(newState.member.guild.id)
                  console.log(Welcomer_row[0].Set_Channel)
                newState.member.guild.channels.fetch(Welcomer_row[0].Set_Channel).then(channel => { 
                    channel.send({ content: `Welcome ${newState.member} to ${newState.member.guild.name}!` })
                })

            //    newState.member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
            //     console.log(newState.member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            } catch (err) {
                console.error(err);
            }
        }


        // 
    }
}