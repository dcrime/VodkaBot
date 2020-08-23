const Discord = module.require("discord.js");

module.exports.run = async(bot, message, msg, args) => {
    if (message.author.id !== '154322320045899785') return;
    for (const path in require.cache) {
        if ((path.endsWith('.js') || path.endsWith('.mod')) && path.replace(/.+\\commands\\/gm, 'CMDS').startsWith('CMDS')) { // only clear *.js, not *.node
            delete require.cache[path]
        }
    }
    bot.modules = new Discord.Collection();
    message.channel.send('Bot commands have been reloaded')
    bot.load()
}

module.exports.help = {
    name: "reload",
    description: 'reloads all the commands',
}