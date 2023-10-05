module.exports = async (client) => {
  client.loadSubcommands = async function (interaction, client, ...args) {
    console.log(process.cwd() + "FUCKYOU")

    return require(`${process.cwd()}/src/subCommands/${
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
