const Discord = module.require("discord.js");
var moment = require('moment')

module.exports.run = async (bot, message, msg, args) => {
    if(message.mentions.users.size > 0){
        var author = message.mentions.users.first()
        var member = message.guild.members.find( e => e.id == message.mentions.users.first().id)
        message.author = author;
        message.member = member
    }
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setThumbnail(message.author.avatarURL)
        .setColor("#006600")
        .addField("Username:", `${message.author.username}`)
        .addField("ID", message.author.id)
        .addField("Created At", new Date(message.author.createdTimestamp).toUTCString() + ` (${moment(message.author.createdTimestamp).fromNow()})`)
        .addField("Joined At", new Date(message.member.joinedTimestamp).toUTCString() + ` (${moment(message.member.joinedTimestamp).fromNow()})`);

    message.channel.send(embed);

    return;
}

module.exports.help = {
    name: "userinfo",
    description: "Displays the user information",
    usage: 'userinfo **<user>** (Optional)'
}
