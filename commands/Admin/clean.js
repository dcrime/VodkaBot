const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg,  args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You can't clean this!!!").then(msg => { msg.delete(3000) });
    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply("I don't have permission to clean channels").then(msg => { msg.delete(3000) });
    if(isNaN(args[0])) {
        message.channel.bulkDelete(1)
        return
    };

    const count = Number(args[0]) + 1
    console.log("Deleting " + count + " messages");

    if(args[0] == 0){
        message.bulkDelete(1);

    }else if(args[0] >= 1){
        message.channel.bulkDelete(1)
        const fetched = await message.channel.fetchMessages({limit: count});
        message.channel.bulkDelete(fetched)
    }
        
    
}

module.exports.help = {
    name: "clean",
    description: 'clean the chat',
    usage: 'clean **<number>**'
}