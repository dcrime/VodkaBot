const Discord = module.require("discord.js");

module.exports.run = async(bot, message, msg, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('KICK_MEMBERS')) return message.reply("You're not allowed to kick members").then(msg => { msg.delete(3000) });
    if (!message.guild.me.permissions.has('ADMINISTRATOR') && !message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply("I'm not allowed to kick anyone").then(msg => { msg.delete(3000) });
    var member = message.mentions.members.first();
    args.splice(0, 1).join(' ')
    if (!member.kickable) return message.reply(member.displayName + ' can\'t be kicked').then(msg => { msg.delete(3000) })
    member.kick(args.length > 0 ? args : '').then((member) => {
        message.channel.send("User " + member.displayName + " has been kicked from the server" + args.length ? `for ${args}` : '');
    }).catch(() => {
        message.channel.send("Cannot kick user");
    });
}

module.exports.help = {
    name: 'kick',
    description: 'kicks user',
    usage: 'kick **<user> <reason>**'
}