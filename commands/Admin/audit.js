// Discord module
const Discord = module.require("discord.js");
var moment = require('moment')
const fs = require("fs");

// Guild audit config
var guilds = require('../../config/guilds.json');

var icons = {
    delete: '',
    edit: '',
    join: '',
    leave: '',
    mute: '',
    serverMute: '',
    deafen: '',
    serverDeafen: '',
    move: '',
    disconnect: '',
    user: '',
    nick: ''
}
var data = {
    user: false,
    userL: false,
    content: false,
    newContent: false,
    channel: false,
    newChannel: false,
    creationDate: false,
    lastEdit: false,
    endDate: false
}

// Events

// Message events

async function messageDelete(message) {
    if (!guilds[message.guild.id]) return
    if (!guilds[message.guild.id].delete) return
    if (message.author.bot) return

    var guild = guilds[bot.guilds.find(e => e.id == message.guild.id).id]

    var tmp = {...data };

    const entry = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first())
    let user = ''
    let deleted = ''
    let now = Date.now()
    if (entry.extra.channel.id === message.channel.id &&
        (entry.target.id === message.author.id) &&
        (entry.createdTimestamp > (now - 5000)) &&
        (entry.extra.count >= 1)) {
        user = entry.executor.tag
        deleted = new Date(entry.createdTimestamp).toUTCString()
        tmp.userL = ['Deleted by', user, true]
    } else {
        user = message.author.tag
        deleted = new Date(now).toUTCString()
    }

    tmp.user = ['User', message.author.tag, true]
    tmp.content = ['Message', message.content]
    tmp.channel = ['Channel', `<#${message.channel.id}>`]
    tmp.creationDate = ['Created at', new Date(message.createdTimestamp).toUTCString(), true]
    tmp.endDate = ['Deleted at', deleted, true]
    auditLog('Message deleted', 'delete', global.bot, message.guild.id, tmp)

};

async function messageEdit(message, newMessage) {
    if (message.content === newMessage.content) return
    if (!guilds[message.guild.id]) return
    if (!guilds[message.guild.id].edit) return
    if (message.author.bot) return

    var guild = guilds[bot.guilds.find(e => e.id == message.guild.id).id]

    var tmp = {...data };

    tmp.user = ['User', message.author.tag]
    tmp.content = ['Old message', message.content, true]
    tmp.newContent = ['New message', newMessage.content, true]
    tmp.channel = ['Channel', `<#${message.channel.id}>`]
    tmp.creationDate = ['Created at', new Date(message.createdTimestamp).toUTCString(), true]
    if (message.editedTimestamp)
        tmp.lastEdit = ['Last edit', new Date(message.editedTimestamp).toUTCString(), true]
    tmp.endDate = ['Edited at', new Date(newMessage.editedTimestamp).toUTCString(), true]
    auditLog('Message edited', 'edit', global.bot, message.guild.id, tmp)

};

// Join events

function joinGuild(member) {
    if (!guilds[member.guild.id]) return
    if (!guilds[member.guild.id].join) return

    var tmp = {...data };

    args = {
        thumbnail: member.user.avatarURL
    }

    tmp.user = ['User', member.user.tag]
    tmp.creationDate = ['Created', new Date(member.user.createdTimestamp).toUTCString() + ` (${moment(member.user.createdTimestamp).fromNow(true)})`]
    auditLog('User joined the guild', 'join', global.bot, member.guild.id, tmp, args)
}

function leaveGuild(member) {
    if (!guilds[member.guild.id]) return
    if (!guilds[member.guild.id].join) return

    var tmp = {...data };

    args = {
        thumbnail: member.user.avatarURL
    }

    tmp.user = ['User', member.user.tag]
    tmp.creationDate = ['Created at', new Date(member.user.createdTimestamp).toUTCString() + ` (${moment(member.user.createdTimestamp).fromNow()})`, true]
    tmp.endDate = ['Joined', new Date(member.joinedTimestamp).toUTCString() + ` (Tme on the server: ${moment(member.joinedTimestamp).fromNow(true)})`, true]
    auditLog('User joined the guild', 'join', global.bot, member.guild.id, tmp, args)
}

// Voice events

function voiceEvent(oldMember, newMember) {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    var tmp = {...data };
    tmp.user = ['User', oldMember.user.tag]

    var event;

    args = {
        thumbnail: oldMember.user.avatarURL
    }

    // User channel
    if (guilds[oldMember.guild.id].move) {
        if (oldUserChannel !== undefined && newUserChannel !== undefined && oldUserChannel !== newUserChannel) {
            // Move channel
            event = 'Move channel'
            tmp.channel = ['Moved from', oldUserChannel.name, true]
            tmp.newChannel = ['Moved to', newUserChannel.name, true]
        } else if (oldUserChannel === undefined && newUserChannel !== undefined) {
            // Join channel
            event = 'Channel joined'
            tmp.channel = ['Voice channel', newUserChannel.name]
        } else if (newUserChannel === undefined) {
            // Leave channel
            event = 'Channel left'
            tmp.channel = ['Voice channel', oldUserChannel.name]
        }
        auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
    }

    // User mute
    if (oldMember.serverMute == false && newMember.serverMute == true) {
        // Server muted
        if (guilds[oldMember.guild.id].serverMute) {
            event = 'Server muted'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }
    } else if (oldMember.serverMute == true && newMember.serverMute == false) {
        // Server unmuted
        if (guilds[oldMember.guild.id].serverMute) {
            event = 'Server unmuted'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }
    } else if (oldMember.selfMute == false && newMember.selfMute == true) {
        // User muted
        if (guilds[oldMember.guild.id].mute) {
            event = 'Muted'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }
    } else if (oldMember.selfMute == true && newMember.selfMute == false) {
        // User unmuted
        if (guilds[oldMember.guild.id].mute) {
            event = 'Unmuted'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }
    }

    // User deafen

    if (oldMember.serverDeaf == false && newMember.serverDeaf == true) {
        // Server deafened
        if (guilds[oldMember.guild.id].serverDeafen) {
            event = 'Server deafened'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }

    } else if (oldMember.serverDeaf == true && newMember.serverDeaf == false) {
        // Server undeafened
        if (guilds[oldMember.guild.id].serverDeafen) {
            event = 'Server undeafened'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }

    } else if (oldMember.selfDeaf == false && newMember.selfDeaf == true) {
        // User deafened
        if (guilds[oldMember.guild.id].deafen) {
            event = 'Deafened'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }
    } else if (oldMember.selfDeaf == true && newMember.selfDeaf == false) {
        // User undeafened
        if (guilds[oldMember.guild.id].deafen) {
            event = 'Undeafened'
            tmp.channel = ['Voice channel', oldUserChannel.name]
            auditLog(event, 'join', global.bot, oldMember.guild.id, tmp, args)
        }
    }
}

// User changes

function userChange(oldMember, newMember) {
    if (!guilds[oldMember.guild.id]) return
    if (!guilds[oldMember.guild.id].user) return
    var usernameChangedMsg = null;
    var discriminatorChangedMsg = null;
    var avatarChangedMsg = null;

    // search the member from all guilds, since the userUpdate event doesn't provide guild information as it is a global event.
    bot.guilds.forEach(function(guild, guildid) {
        guild.members.forEach(function(member, memberid) {
            if (newUser.id == memberid) {
                // var member = bot.guilds.get(guildid).members.get(member.id)

                //USERNAME CHANGED
                if (oldMember.username != newMember.username) {
                    var tmp = {...data };
                    var event = 'Change username';
                    tmp.user = ['Old username', oldMember.user.tag, true]
                    tmp.content = ['New username', newMember.user.tag, true]

                    args = {
                        thumbnail: newMember.user.avatarURL
                    }
                    auditLog(event, 'user', global.bot, oldMember.guild.id, tmp, args)
                }

                //DISCRIMINATOR CHANGED
                if (oldUMember.discriminator != newMember.discriminator) {
                    var tmp = {...data };
                    var event = 'Change tag';
                    tmp.user = ['User', newMember.user.tag, true]
                    tmp.content = ['Old tag', newMember.discriminator, true]

                    args = {
                        thumbnail: newMember.user.avatarURL
                    }
                    auditLog(event, 'user', global.bot, oldMember.guild.id, tmp, args)
                }

                //AVATAR CHANGED
                if (oldMember.avatar != newMember.avatar) {
                    var tmp = {...data };
                    var event = 'Change avatar';
                    tmp.user = ['User', newMember.user.tag]

                    args = {
                        thumbnail: oldMember.user.avatarURL,
                        image: newMember.user.avatarURL
                    }
                    auditLog(event, 'user', global.bot, oldMember.guild.id, tmp, args)
                }
            }
        });
    });
}

// Nickname change

function nickChange(member, newMember) {
    if (!guilds[member.guild.id]) return
    if (!guilds[member.guild.id].nick) return
    if (member.displayName == newMember.displayName) return;

    bot.guilds.get('387693679034368000').channels.get('724591687862583299').send('shit')

    var tmp = {...data };

    args = {
        thumbnail: member.user.avatarURL
    }

    tmp.user = ['User', newMember.user.tag]
    tmp.content = ['Old nickname', member.displayName, true]
    tmp.newContent = ['New nickname', newMember.displayName, true]
    auditLog('Nickname change', 'nick', global.bot, member.guild.id, tmp, args)
}

// Audit log GUI

// Settings

function auditSettings(id, message, bot) {
    var dict = guilds[id]
    const embed = new Discord.RichEmbed()
        .setAuthor('Logs')
        .setColor('#006600')
        .setTimestamp()
    for (i in dict) {
        embed.addField(i, dict[i] ? `<#${dict[i]}>` : 'off', true)
    }
    message.channel.send({ embed })
}

// Event trigger
function auditLog(typeMsg, type, bot, id, dict, args) {
    var guild = guilds[id]
    const embed = new Discord.RichEmbed()
        .setAuthor(typeMsg)
        .setColor('#006600')
        .setTimestamp()
    if (args) {
        if (args.thumbnail) {
            embed.setThumbnail(args.thumbnail)
        }
        if (args.image) {
            embed.setImage(args.image)
        }
    }
    for (let i of Object.keys(dict)) {
        if (!dict[i]) continue
        embed.addField(dict[i][0], dict[i][1], dict[i][2] ? true : false)
    }
    // bot.guilds.get('387693679034368000').channels.get('724591687862583299').send()
    // bot.guilds.get(id).channels.get('724591687862583299').send(JSON.stringify(embed))
    bot.guilds.get(id).channels.get(guild[type] ? guild[type] : '724591687862583299').send({ embed }).catch(e => {
        bot.guilds.get('387693679034368000').channels.get('724591687862583299').send('Error code: ' + e.code + '\nError message: ' + e.message)
    })
}

// Check if there's a log and make if there isn't

function checkEntery(message) {
    var id = message.guild.id
    var settings = {
        delete: false,
        edit: false,
        join: false,
        leave: false,
        mute: false,
        serverMute: false,
        deafen: false,
        serverDeafen: false,
        move: false,
        disconnect: false,
        user: false,
        nick: false
    }

    if (!guilds[id]) {
        guilds[id] = settings
    }
    return settings
}

module.exports = {
    functions: {
        messageEdit: messageEdit,
        messageDelete: messageDelete,
        joinGuild: joinGuild,
        leaveGuild: leaveGuild,
        voiceEvent: voiceEvent,
        userChange: userChange,
        nickChange: nickChange
    }
}

// Main function handler

module.exports.run = async(bot, message, msg, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("You're not an administrator");
    if (!message.guild.me.permissions.has('ADMINISTRATOR')) return message.reply("I don't have the Administrator permission");
    if (args.length <= 0) return bot.commands.get('help').run(bot, message, msg, ['Audit']);
    var settings = checkEntery(message)
    if (args[0].toLowerCase() == 'types' || args[0].toLowerCase() == 'logs') return auditSettings(message.guild.id, message, bot)
    if (!message.mentions.channels.size) return bot.commands.get('help').run(bot, message, msg, ['Audit'])

    var id = message.guild.id
    if (!(args[0] in settings)) return auditSettings(message.guild.id, message, bot)
    if (!guilds[id])
        guilds[id] = data
    if (!args[1].length || !(args[2] && args[2].toLowerCase() == 'on')) {
        guilds[id][args[0]] = false;
        message.channel.send(args[0] + ' has been turned off')
    } else {
        guilds[id][args[0]] = message.mentions.channels.first().id
        message.channel.send(args[0] + ` has been turned on for <#${message.mentions.channels.first().id}>`)
    }
    fs.writeFileSync('./config/guilds.json', JSON.stringify(guilds, null, 4))
}

module.exports.help = {
    name: 'audit',
    description: 'Audit logs',
    usage: 'audit **<type> <channel> <on>**\n audit types/logs',
    show: false,
}