const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg,  args) => {
    message.channel.send('Alcohol!')
}

module.exports.help = {
    name: 'meaning',
    description: 'The meaning of al'
}