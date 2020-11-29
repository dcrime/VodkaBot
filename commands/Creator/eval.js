const Discord = module.require("discord.js");
const cfg = require('../../config.json');

module.exports.run = async (bot, message, msg, args) => {
    if (message.author.id !== '154322320045899785') return;

    try {
        const msg = message.content;
        args = msg.split(" ").slice(2);
        let code = args.join(' ')
        let time = new Date()
        let evaled = eval(code)
        if (evaled.length > 1013) return message.channel.send('The message is too long')
        const embed = new Discord.RichEmbed()
            .addField('Input', "```js\n" + code + "```")
            .addField('Output', "```js\n" + evaled + "```")
            .addField('Time', "``" + (new Date() - time) + "``ms")
            .setColor(01000)
            .setTimestamp()
        message.channel.send({ embed })
    } catch (err) {
        let code = args.join(' ')
        let time = new Date()
        if (err.length > 1013) return message.channel.send('The error is too long')
        const embed = new Discord.RichEmbed()
            .addField('Input', "```js\n" + code + "```")
            .addField('Error', "```js\n" + err + "```")
            .addField('Time', "``" + (new Date() - time) + "``ms")
            .setColor(01000)
            .setTimestamp()
        message.channel.send({ embed })
    }
}

module.exports.help = {
    name: "eval",
    description: "Execute command",
    usage: 'eval **<command>**'
}