const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg,  args) => {
    var timestamp = message.createdTimestamp
    var now = Date.now()
    message.channel.send(`\`\`\`Pong   | ${now -timestamp} ms\`\`\``).then(m => {m.edit(m.content.slice(0, -3) + `\nPong^2 | ${Date.now() -m.createdTimestamp} ms\nHeartbeat ${Math.round(bot.ping)} ms\`\`\``)})
}

module.exports.help = {
    name: 'ping',
    description: 'Pong!',
    usage: ''
}