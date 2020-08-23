// Loads the libray and declares the client and the config
const Discord = require('discord.js');
const fs = require("fs");
const listeners = require('./listeners')

const cfg = require('./config.json');

function blockInput(error) {
    console.log('\n\n\n')
    console.log(error)
    console.log('')
    console.log('Press any key to exit');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));

}

try {
    if (cfg.token.split('.').length != 3) {
        for (let param of process.argv) {
            if (param.split('.').length != 3) continue;
            cfg.token = param;
        }
        if (cfg.token === 'token') {
            blockInput('No token provided in the config or the parimiters\nparam: ' + cfg.token + '\n params: ' + process.argv);
        }
    }
} catch (e) {
    console.log(e)
}

const bot = new Discord.Client({ disableEveryone: true })
bot.functions = require('./functions')
global.bot = bot
bot.loaded = false

bot.modules = new Discord.Collection();
bot.commands = new Discord.Collection();
bot.pref = cfg.prefix
bot.cfg = cfg
folder = 'commands'

bot.load = function() {
    fs.readdir(`./${folder}/`, (err, files) => {
        if (err) console.error(err)

        let jsfiles = files.filter(f => f.split(".").pop() === "js" || f.split(".").pop() === "mod");
        if (jsfiles.length <= 0) {
            console.log("No commands!");
            return;
        }

        console.log(`loading ${jsfiles.length} modules!`);

        jsfiles.forEach((f, i) => {

            let props = require(`./${folder}/${f}`);
            if (f.endsWith('.mod')) {
                console.log(`${i + 1}: ${f} loaded`);
                bot.modules.set(props.loader.name, props);
                let cmd = bot.modules.get(props.loader.name)
                cmd.setup(bot, folder, props.loader.folder)
            } else {
                console.log(`${i + 1}: ${f} loaded`);
                bot.commands.set(props.help.name, props, folder);
            }
        });

    })
}
await bot.load()
console.log('Done loading modules!')

bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} (${bot.user.id}) started!`);
    bot.user.setActivity('myself', { type: 'watching' })
    if (!bot.loaded) {
        listeners.load()
        bot.loaded = true
    }
});

bot.on("message", message => {
    if (message.author.bot || message.channel.type === "dm") return;

    if (message.content === '/join') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => { // Connection is an instance of VoiceConnection
                    message.reply('I have successfully connected to the channel!');
                })
                .catch(console.log);
        } else {
            message.reply('You need to join a voice channel first!');
        }
    };

    const msg = message.content;
    let pref, command, args, msgArray
    if (msg.toLowerCase().startsWith(cfg.prefix.toLowerCase() + ' ')) {
        msgArray = message.content.split(/\s+/g);
        pref = msgArray[0]
        command = msgArray[1]
        args = msgArray.slice(2)
    } else if (msg.toLowerCase().startsWith(cfg.prefix.toLowerCase())) {
        pref = message.content.slice(0, cfg.prefix.length)
        msgArray = message.content.substr(pref.length).split(/\s+/g);
        command = msgArray[0]
        args = msgArray.slice(1)
    } else {
        return
    }
    try {
        //let cmd = bot.commands.get(command);
        let cmd = bot.commands.filter(e => e.help.name ? e.help.name.toLowerCase() == command.toLowerCase() : false)
        if (cmd) cmd.first().run(bot, message, msg, args);
        console.log(`|\nUser: ${message.author.tag} (${message.author.id})\nPref ${cfg.prefix}\nCommand: ${command}\nArgs: ${args}\n|`);
    } catch (err) {
        console.log('|\n' + err + '\n|')
    }
});


bot.login(cfg.token).catch(err => {
    blockInput(err.message)
});