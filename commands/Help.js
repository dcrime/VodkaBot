const Discord = module.require("discord.js");
var fs = require('fs')
var path = './commands/'

module.exports.run = async(bot, message, msg, args) => {
    if (args.length <= 0) {
        let cmd = bot.commands.get('modules');
        if (cmd) cmd.run(bot, message, msg, args);
        return;
    }
    mod = bot.modules.find(e => e.loader.name.toLowerCase() == args[0].toLowerCase())
    if (mod) {
        let cmds = bot.commands.filter(e => e.help.folder ? e.help.folder.toLowerCase() == mod.loader.name.toLowerCase() : false)
        const embed = new Discord.RichEmbed()
            .setAuthor(mod.loader.name)
            .setColor('#006600')
            .setTimestamp()
            .setFooter('help <command>')
        for (i of cmds) {
            if (i[1].help.description) {
                embed.addField(i[1].help.description, i[1].help.name, true)
            }
        }
        message.channel.send({ embed })
    } else {
        let cmds = bot.commands.find(e => e.help.name ? e.help.name.toLowerCase() == args[0].toLowerCase() : false)
        var creator = true, show = true;
        if (cmds){
            creator = cmds.help.show == 'creator' ? message.author.id == '154322320045899785' ?  true : false : true 
            show = cmds.help.show == false
        }
        if (cmds && creator && !show) {
            const embed = new Discord.RichEmbed()
                .setAuthor(cmds.help.name)
                .setColor('#006600')
                .setTimestamp()
            if (cmds.help.description)
                embed.addField('Description', cmds.help.description)
            if (cmds.help.usage)
                embed.addField('Usage', cmds.help.usage)
            message.channel.send({ embed })
        }
    }
}

module.exports.help = {
    name: 'help',
    description: 'Module commands',
    show: true
}