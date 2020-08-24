const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg, args) => {
    if(message.author.id !== '154322320045899785') return;
    let status = args.slice(1).join(' ')
    bot.user.setActivity(status, {type : args[0]})
}

module.exports.help = {
    name: "presence",
    description: 'Change bot status',
    usage: 'status **<indicator> <>**'
}