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
                        {name: "set-guild", value: "set-guild"},
                        {name: "set-prefix", value: "set-prefix"},
                        {name: "remove-this-guild's-emojis", value: "remove-this-guild's-emojis"},   
                    )
            ),
        
    async execute(interaction, client) {
        const subcommand = interaction.options.getString('meow_ヽowoノ');

        if(subcommand == "set-guild") {
            await interaction.deferReply({fetchReply: true})
            client.loadSubcommands(interaction, client);
        } else if (subcommand == "set-prefix") {
            client.loadSubcommands(interaction, client);
        } else if (subcommand == "remove-this-guild's-emojis") {
            await interaction.deferReply({fetchReply: true})
            client.loadSubcommands(interaction, client);
        }
    }
}
