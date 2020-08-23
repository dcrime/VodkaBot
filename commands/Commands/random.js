const Discord = module.require("discord.js");
const math = require('mathjs')

module.exports.run = async (bot, message, msg, args) => {
    var arg0 = args[0];
    var arg1 = args[1];
    arg0 = Number(arg0)
    arg1 = Number(arg1)

    if (isNaN(arg0) || isNaN(arg1) || arg0 > arg1) {
        message.channel.send('**Invalid usage, "random ** ***<min> <max>*** **".**')
    } else {
        var calc = math.randomInt(arg0, arg1 + 1)
        console.log(arg0 + " " + arg1)
        message.channel.send("Random number between\n`" + arg0 + "` and `" + arg1 + "`\n`" + calc + "`");
    }
}

module.exports.help = {
    name: "random",
    description: 'Random number generator',
    usage: 'random **<min> <max>**'
}