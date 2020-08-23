const Discord = module.require("discord.js");
const math = require('mathjs')

function parseIDs(text){
    var baseURL = 'https://cdn.discordapp.com/emojis/'
	let emojis = [];

	let parsedEmojis = text.match(/<a?:[a-z0-9_]+:[0-9]+>/gi);

	for(let i in parsedEmojis){
		let emoji = parsedEmojis[i];
		let name = emoji.match(/:[a-z0-9_]+:/gi)[0].substr(1).slice(0,-1);
		let id = emoji.match(/:[0-9]+>/gi)[0].substr(1).slice(0,-1);
		let gif = (emoji.match(/<a:/gi)?true:false);
		let url = baseURL+id+(gif?".gif":".png");
		emojis.push({name,id,gif,url});
	}
	return emojis;
}

function getRandomItem(set) {
    let items = Array.from(set);
    return items[math.randomInt(0, items.length)];
}

module.exports.run = async(bot, message, msg, args) => {
    if(!args[0]){
        const attachment = {file: getRandomItem(bot.emojis)[1].url}
        return message.channel.send(attachment)
    }
    emojis = parseIDs(msg)
    if(!emojis.length){
        const attachment = {file: getRandomItem(bot.emojis)[1].url}
        return message.channel.send(attachment)
    }
    const randomEmoji = emojis[math.randomInt(0, emojis.length)];
    
    const attachment = {file: randomEmoji.url}
    message.channel.send(attachment)
}

module.exports.help = {
    name: 'randomemoji',
    description: 'Displays a random emoji ()',
    usage: 'randemoji **<emojis>** (optional)'
}