const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg, args) => {
    if(message.author.id !== '154322320045899785') return;
    
    bot.destroy()
    // process.exit(1)
}

module.exports.help = {
    name: "stop",
    description: 'Stops the whole bot',
    usage: 'stop'
}