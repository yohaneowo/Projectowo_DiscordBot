const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder ()
        .setName("animoji")
        .setDescription("animoji !")
            .addStringOption(option =>
                option.setName('meow_ヽowoノ')
                .setDescription('The animoji subcommands')
                .setRequired(true)
                .addChoices(
                        {name: "set", value: "set"},
                        {name: "set-prefix", value: "set-prefix"},
                        {name: "delete", value: "delete"},   
                    )
            ),
        
    async execute(interaction, client) {
        const subcommand = interaction.options.getString('meow_ヽowoノ');

        if(subcommand == "set-guild") {
            await interaction.deferReply({fetchReply: true})
            client.loadSubcommands(interaction, client);
        } else if (subcommand == "set-prefix") {
            await interaction.deferReply({fetchReply: true})
            client.loadSubcommands(interaction, client);
        } else if (subcommand == "remove-this-guild's-emojis") {
            await interaction.deferReply({fetchReply: true})
            client.loadSubcommands(interaction, client);
        }
    }
}
