const Discord = module.require("discord.js");

module.exports.run = async(bot, message, msg, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You're not allowed to ban members").then(msg => { msg.delete(3000) });
    if (!message.guild.me.permissions.has('ADMINISTRATOR ') || !message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply("I'm not allowed to ban anyone").then(msg => { msg.delete(3000) });
    var member = message.mentions.members.first();
    args.splice(0, 1).join(' ')
    if (!member.banable) return message.reply(member.displayName + ' can\'t be banned').then(msg => { msg.delete(3000) })
    member.ban(args.length > 0 ? args : '').then((member) => {
        message.channel.send("User " + member.displayName + " has been banned from the server" + args.length ? `for ${args}` : '');
    }).catch(() => {
        message.channel.send("Cannot ban user");
    });
}

module.exports.help = {
    name: 'ban',
    description: 'bans user',
    usage: 'ban **<user> <reason>**'
}