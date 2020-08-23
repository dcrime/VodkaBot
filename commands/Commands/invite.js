const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg,  args) => {
    message.reply("Here, invite me to your server then UwU - https://discordapp.com/oauth2/authorize?client_id=391634230008086539&scope=bot&permissions=8 >.<")
}

module.exports.help = {
    name: "invite",
    description: 'Gives the bot invite'
}