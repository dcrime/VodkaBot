const Discord = module.require("discord.js");

function Reverse(str) {
    return str.split("").reverse().join("");
}

module.exports.run = async (bot, message, msg, args) => {
    msg = message.content.slice(10);

    message.channel.send(Reverse(msg))

}

module.exports.help = {
    name: "reverse",
    description: 'txet sesrever',
    usage: 'reverse **<text>**'
}