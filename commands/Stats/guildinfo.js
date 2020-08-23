const Discord = module.require("discord.js");
var moment = require('moment')

module.exports.run = async (bot, message, msg, args) => {
    users = 0
    bots = 0
    message.guild.members.forEach(e => e.user.bot ? bots++ : users++)
    let embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .setColor("#006600")
        .addField("Guild name:", `${message.guild.name} (${message.guild.id})`)
        .addField("Owner", `${message.guild.owner.user.tag} (${message.guild.ownerID})`)
        .addField("Members", `All: ${message.guild.memberCount} \n Users: ${users} | Bots: ${bots}`)
        .addField("Roles", message.guild.roles.size)
        .addField("Created At", new Date(message.guild.createdTimestamp).toUTCString() + ` (${moment(message.guild.createdTimestamp).fromNow()})`)

    message.channel.send(embed);

    return;
}

module.exports.help = {
    name: "guild",
    description: "Displays the guild information"
}