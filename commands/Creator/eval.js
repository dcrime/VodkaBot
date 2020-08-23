const Discord = module.require("discord.js");
const cfg = require('../../config.json');

module.exports.run = async (bot, message, msg,  args) => {
    if(message.author.id !== '154322320045899785') return;

    try {
        const msg = message.content;
        args = msg.split(" ").slice(2);
        let code = args.join(' ')
        let time = new Date()
        let evaled = eval(code)
        const embed = new Discord.RichEmbed()
        .addField('Input', "```javascript\n" + code + "```")
        .addField('Output', "```javascript\n" + evaled + "```")
        .addField('Time', "``" + (new Date() - time) + "``ms")
        .setColor(01000)
        .setTimestamp()
        message.channel.send({embed})
        } catch(err) {
        let code = args.join(' ')
        let time = new Date()
        const embed = new Discord.RichEmbed()
        .addField('Input', "```javascript\n" + code + "```")
        .addField('Error', "```javascript\n" + err + "```")
        .addField('Time', "``" + (new Date() - time) + "``ms")
        .setColor(01000)
        .setTimestamp()
        message.channel.send({embed})
    }
}

module.exports.help = {
    name: "eval",
    description: "Execute command",
    usage: 'eval **<command>**'
}