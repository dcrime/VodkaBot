const Discord = module.require("discord.js");

module.exports.run = async(bot, message, msg, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor('Command modules')
        .setColor('#006600')
        .setTimestamp()
        .setFooter('help <module>')
    for (i of bot.modules) {
        creator = i[1].loader.show == 'creator' ? message.author.id == '154322320045899785' ?  true : false : true 
        if (i[1].loader.description && creator) {
            embed.addField(i[1].loader.description, i[1].loader.name, true)
        }
    }
    message.channel.send({ embed })

}

module.exports.help = {
    name: "modules",
    description: "Lists modules",
    usage: "al help **module/command**"
}