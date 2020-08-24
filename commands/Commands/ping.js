const { msToTime } = require("../../functions");

const Discord = module.require("discord.js");

bigger = (a, b) => {return a > b ? a - b : b - a};

module.exports.run = async(bot, message, msg, args) => {
    var timestamp = message.createdTimestamp
    var now = Date.now()
    message.channel.send(`\`\`\`Pong   | ${bigger(now, timestamp)} ms\`\`\``).then(m => { m.edit(m.content.slice(0, -3) + `\nPong^2 | ${bigger(Date.now(), m.createdTimestamp)} ms\nHeartbeat ${Math.round(bot.ping)} ms\`\`\``) })
}

module.exports.help = {
    name: 'ping',
    description: 'Pong!',
    usage: 'al ping'
}

// clear()
// for (let key of keys(os)) {
//     if (['constants', 'EOL'].includes(key)) continue;
//     switch (typeof os[key]) {
//         case 'string':
//             console.log(key + ': ' + os[key])
//             break;
//         case 'function':
//             if (os[key].length) continue;
//             switch (key) {
//                 case 'uptime':
// 					let time = os[key]()*1000
//                     console.log(key + ': ' + msToTime(time))
//                     break;
//                 default:
//                     console.log(key + ': ' + os[key]())
//                     break;
//             }
//             break;
//         case 'object':
//             console.log(key + ': ' + JSON.stringify(os[key], null, 4))
//             break;
//         default:
//             console.log(typeof os[key])
//             break;
//     }

// }