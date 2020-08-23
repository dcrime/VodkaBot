const Discord = module.require("discord.js");

module.exports.run = async (bot, message, msg, args) => {
    function run() {
        if (!message.member.hasPermission("ADMINISTRATOR") || args[0] == null) return;
        var options = global.options
        if (!global.options[message.guild.id]) {
            global.options[message.guild.id] = {};
            options = global.options[message.guild.id];
        }
        console.log(global.options[message.guild.id])

        var logs = ["movement", "auditlog", "userlog", "auditmsg", "voice"]
        if (args[0] == 'help') {
            message.channel.send("Command usage: `nazi logchan <logtype> <channel>` (`Remove` instead of the channel name removes logs for the channel)`\n--Available log types--\nmovement - join/leave/ban/unban\nauditlog - nickname change\nuserlog - user account changes username/discriminator/profile pic\nauditmsg - delete/change\nvoice - join/leave/move (doesn't detect who moved the person)")
        }

        if (typeof options[message.guild.id].auditlog == 'undefined') options.auditlog = `audit-log`;
        if (typeof options[message.guild.id].auditmsg == 'undefined') options.auditmsg = false;
        if (typeof options[message.guild.id].movement == 'undefined') options.movement = `in-out`;
        if (typeof options[message.guild.id].voice == 'undefined') options.voice = false;
        if (typeof options[message.guild.id].userlog == 'undefined') options.userlog = false;

        global.options[message.guild.id] = {
            userlog: options.userlog,
            auditmsg: options.auditmsg,
            movement: options.movement,
            voice: options.voice,
            userlog: options.userlog
        }

        if (!logs.includes(args[0])) return;
        if (typeof args[1] === 'undefined') {
            if (args[0] == 'movement') {
                message.channel.send(options[message.guild.id].movement)
            }
            if (args[0] == 'auditlog') {
                message.channel.send(options[message.guild.id].auditlog)
            }
            if (args[0] == 'userlog') {
                message.channel.send(options[message.guild.id].userlog)
            }
            if (args[0] == 'auditmsg') {
                message.channel.send(options[message.guild.id].auditmsg)
            }
            if (args[0] == 'voice') {
                message.channel.send(options[message.guild.id].voice)
            }
        } else if (args[1] == 'Remove') {
            if (args[0] == 'movement') {
                global.options[message.guild.id].movement = false;
            }
            if (args[0] == 'auditlog') {
                global.options[message.guild.id].auditlog = false;
            }
            if (args[0] == 'userlog') {
                global.options[message.guild.id].userlog = false;
            }
            if (args[0] == 'auditmsg') {
                global.options[message.guild.id].auditmsg = false;
            }
            if (args[0] == 'voice') {
                global.options[message.guild.id].voice = false;
            }
        } else {
            if (args[0] == 'movement') {
                global.options[message.guild.id].movement = args[1];
            }
            if (args[0] == 'auditlog') {
                global.options[message.guild.id].auditlog = args[1];
            }
            if (args[0] == 'userlog') {
                global.options[message.guild.id].userlog = args[1];
            }
            if (args[0] == 'auditmsg') {
                global.options[message.guild.id].auditmsg = args[1];
            }
            if (args[0] == 'voice') {
                global.options[message.guild.id].voice = args[1];
            }
        }
    }
    run();
}

module.exports.help = {
    name: "logchan"
}