
module.exports = async (client) => {
    client.loadSubcommands = async function (interaction, client) {
        return require(`${process.cwd()}/subCommands/${interaction.commandName}/${interaction.options.getString('meow_ヽowoノ')}`)(interaction, client).catch(err => {
            })

        }
} 