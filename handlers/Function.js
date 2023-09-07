module.exports = async (client) => {
  client.loadSubcommands = async function (interaction, client, ...args) {
    return require(`${process.cwd()}/subCommands/${
      interaction.commandName
    }/${interaction.options.getString("meow_ヽowoノ")}`)(
      interaction,
      client,
      ...args
    ).catch((err) => {
      console.log(err)
    })
  }
}
