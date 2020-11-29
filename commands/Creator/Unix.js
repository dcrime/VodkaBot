const Discord = module.require("discord.js");
let child_process = require("child_process");

module.exports.run = async (bot, message, msg, args) => {
    if (message.author.id !== '154322320045899785') return;
    let time = new Date()
    let code = args.join(' ')
    child_process.exec(code, (err, stdout, stderr) => {

        const embed = new Discord.RichEmbed()
            .addField('Input', "```sh\n"
                +
                (code.length > 1024 - 11
                    ? 'The input is too long'
                    : !(code instanceof NaN || code == "NaN") && code.length > 0
                        ? code
                        : " "
                )
                +
                "\n```"
            )
            .addField('Output', "```sh\n"
                +
                (stdout.length > 1024 - 11
                    ? 'The output is too long'
                    : stdout.length > 0
                        ? stdout
                        : " "
                )
                +
                "\n```"
            )
            .addField('Output Error', "```sh\n"
                +
                (stderr.length > 1024 - 11
                    ? 'The output error is too long'
                    : stderr.length > 0
                        ? stderr
                        : " "
                )
                +
                "\n```"
            )
            .addField('Error', "```js\n"
                +
                (typeof err == null && err.length > 1024 - 11
                    ? 'The error is too long or null'
                    : err.length > 0
                        ? err
                        : " "
                )
                +
                "\n```"
            )

            .addField('Time', "``" + (new Date() - time) + "``ms")
            .setColor(01000)
            .setTimestamp()
        message.channel.send({ embed })

    });
}

module.exports.help = {
    name: "unix",
    description: 'Execute commands on the local machine rather than just in the bot process',
    usage: 'unix **<command>**'
}