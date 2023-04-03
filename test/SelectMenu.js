module.exports = {
    name: 'selectMenu',
    once: false,
    async execute(client) {
        if (!interaction.isStringSelectMenu()) return;
        console.log(interaction.values)
    }
}
