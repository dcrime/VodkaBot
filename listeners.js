var funcs;

exports.load = () => {
    funcs = bot.commands.get('audit').functions;
    events()
}

function events() {
    global.bot.on("messageUpdate", async(message, newMessage) => {
        try {
            funcs.messageEdit(message, newMessage)
        } catch {}
    });
    global.bot.on("messageDelete", async message => {
        try {
            funcs.messageDelete(message)
        } catch {}
    });
    global.bot.on('guildMemberAdd', member => {
        try {
            funcs.joinGuild(member)
        } catch {}
    });
    global.bot.on('guildMemberRemove', (member) => {
        try {
            funcs.leaveGuild(member)
        } catch {}
    });
    global.bot.on('voiceStateUpdate', (oldMember, newMember) => {
        try {
            funcs.voiceEvent(oldMember, newMember)
        } catch {}
    });
    global.bot.on('userUpdate', (oldUser, newUser) => {
        try {
            funcs.userChange(oldUser, newUser)
        } catch {}
    });
    global.bot.on('guildMemberUpdate', (oldMember, newMember) => { // this event triggers when a member changes their nickname.
        try {
            funcs.nickChange(oldMember, newMember)
        } catch {}
    });
}