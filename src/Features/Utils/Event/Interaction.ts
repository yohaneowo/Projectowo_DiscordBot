


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Interactio... Remove this comment to see the full error message
const { InteractionType } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'client'.
const client = require("../../../index.js")


module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName)
      // console.log(command);
      const message = client.message
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        )
        return
      }

      try {
        await command.execute(interaction, client, message)
      } catch (err) {
        console.error(err)
        // if (interaction.replied || interaction.deferred) {
        // 	} else {
        // 		await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        // 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        // 	}
      }
    } else if (
      interaction.type == InteractionType.ApplicationCommandAutocomplete
    ) {
      const command = client.commands.get(interaction.commandName)
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        )
        return
      }
      //   try {
      //     await command.autocomplete(interaction, client);
      //   } catch (err) {
      //     console.error(err);
      //     if (interaction.replied || interaction.deferred) {
      //       pass;
      //     } else {
      //       await interaction.reply({
      //         content: "There was an error while executing this command!",
      //         ephemeral: true
      //       });
      //       await interaction.followUp({
      //         content: "There was an error while executing this command!",
      //         ephemeral: true
      //       });
      //     }
      //   }
    }
  }
}
