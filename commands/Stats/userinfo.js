const Discord = module.require("discord.js");
var moment = require('moment');
const { string } = require('mathjs');

module.exports.run = async(bot, message, msg, args) => {
    let author, member;
    if (message.mentions.users.size > 0) {
        author = message.mentions.users.first()
        member = message.guild.members.get(author.id)
    } else if (!Number.isNaN(parseInt(args[0]))) {
        message.channel.send(`Can't search by id till I update discord.js`)
        return
        author = bot.users.get(args[0])
        member = bot.guilds.filter(guild => guild.members.get(args[0]));
        if (!author) {
            author = await bot.users.fetch(args[0], false)
            if (!author) {
                message.channel.send(`Can't find the user.`)
            }
        }
    } else {
        author = message.author;
        member = message.member;
    }
    let embed = new Discord.RichEmbed()
        .setAuthor(author.username)
        .setThumbnail(author.avatarURL)
        .setColor("#006600")
        .addField("Username:", `${author.username}`)
        .addField("ID", author.id)
        .addField("Created At", new Date(author.createdTimestamp).toUTCString() + ` (${moment(author.createdTimestamp).fromNow()})`)

    if (member && !member.size)
        embed.addField("Joined At", new Date(member.joinedTimestamp).toUTCString() + ` (${moment(member.joinedTimestamp).fromNow()})`);
    else if (member) {
        embed.addField('Mutual guilds', (() => {
            guilds = [];
            member.forEach(guild => guilds.push([guild.name, guild.id]));
            return JSON.stringify(guilds);
        }))
        member.forEach(guild => {
            member = guild.get(author.id);
            embed.addField("Joined At", new Date(member.joinedTimestamp).toUTCString() + ` (${moment(member.joinedTimestamp).fromNow()})`);
        })
    }

    message.channel.send(embed);

    return;
}

module.exports.help = {
    name: "userinfo",
    description: "Displays the user information",
    usage: 'userinfo **<user/id>** (Optional)'
}