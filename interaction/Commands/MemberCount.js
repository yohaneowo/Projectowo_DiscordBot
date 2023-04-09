const {SlashCommandBuilder} = require("discord.js");
const {Error_Embed} = require("../../embed_modules/error/error_embed.js");

module.exports = {
    data : new SlashCommandBuilder ()
        .setName("countstatus-displayer")
        .setDescription("Set the status display of the member count")
        .addSubcommand(
            subcommand => subcommand
                .setName("set")
                .setDescription("Set the status display of the member count")
        )
        .addSubcommand(
            subcommand => subcommand
                .setName("delete")
                .setDescription("Delete the status display of the member count")
        ),
    
    a : client.loadSubcommands = async function (interaction, client) {
        try {
            return require(`${process.cwd()}/subCommands/${interaction.commandName}/${interaction.options.getSubcommand()}`)(interaction, client).catch(err => {
                  })
        } catch (err) {
            console.error(err);
            // errorEmbed = new Error_Embed();
            // errorEmbed.sendChannelError(interaction, err);
        }
    },
    execute : async (interaction, client) => {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === "set") {
            // Set the status display of the member count
            await interaction.deferReply({fetchReply: true})
            client.loadSubcommands(interaction, client);
        } else if (subcommand === "delete") {
            // Delete the status display of the member count
            await interaction.deferReply({fetchReply: true})
            client.loadSubcommands(interaction, client);
        }
    }
}
