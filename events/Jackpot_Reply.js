module.exports = {
    name : 'messageCreate',
    once : false,
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') return;
        const content = message.content.toLowerCase(); 
        switch (content) {
            case 'owo':
                const replies = ['uwu', 'What\'s This?'];
                const reply = replies[ Math.floor(Math.random() * replies.length)];
                message.channel.send(reply);
            break;
            case 'uwu':
                message.channel.send('( ´-ω･)▄︻┻┳══━一');
            default:
            // do nothing
            break;
        }
    }
}    