const Discord = module.require("discord.js");

function bigger(num, num2){
    if(num > num2)
        return num;
    else
        return num2;
}

module.exports.run = async (bot, message, msg,  args) => {
    var timestamp = message.createdTimestamp
    var now = Date.now()
    message.channel.send(`\`\`\`Pong   | ${bigger(now -timestamp)} ms\`\`\``).then(m => {m.edit(m.content.slice(0, -3) + `\nPong^2 | ${bigger(Date.now() -m.createdTimestamp)} ms\nHeartbeat ${Math.round(bot.ping)} ms\`\`\``)})
}

module.exports.help = {
    name: 'ping',
    description: 'Pong!',
    usage: 'al ping'
}