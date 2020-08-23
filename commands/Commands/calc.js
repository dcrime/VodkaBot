const Discord = module.require("discord.js");
const math = require('mathjs')

module.exports.run = async(bot, message, msg, args) => {
    try {
        jArgs = args.join(' ')
        calculated = math.evaluate(jArgs)
        let embed = new Discord.RichEmbed()
            .setColor("#006600")
            .addField("Equasion:", `${jArgs}`)
            .addField("Solution:", `${calculated}`)
            .setTimestamp()
        message.channel.send(embed)
    } catch (err) {
        message.channel.send('Can\'t calculate. Sorry!')
    }
}

module.exports.help = {
    name: 'calc',
    description: 'Calculate anything',
    usage: 'calc **<numbers>**'
}