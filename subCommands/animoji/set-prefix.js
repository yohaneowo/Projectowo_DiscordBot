const {AnimojiFunctionManager} = require('../../commands_modules/animoji/a_FunctionManager.js');
const { modal } = require('../../commands_modules/animoji/a_compoment.js');

module.exports = 
    async (interaction) => {
        const animojiFunctionManager = new AnimojiFunctionManager();
        animojiFunctionManager.submitPrefix(interaction, modal);
    }
