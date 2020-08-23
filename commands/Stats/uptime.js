const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg,  args) => {
    time = bot.functions.msToTime
    message.channel.send(`The bot has been up for ${time(bot.uptime)}`)
}

module.exports.help = {
    name: 'uptime',
    description: 'command description',
    usage: ''
}