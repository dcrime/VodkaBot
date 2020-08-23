const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg, args) => {
    message.channel.send(args.join(' ').split('').join(' '))
}

module.exports.help = {
    name: "spell",
    description: 's p e l l  t e x t',
    usage: 'spell **<text>**'
}