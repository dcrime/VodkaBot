const fs = require("fs");

module.exports.setup = async(bot, dir, folder) => {
    fs.readdir(`./${dir}/${folder}/`, (err, files) => {
        if (err) {
            console.error(err)
            return
        }

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
            console.log("No commands!");
            return;
        }

        console.log(`   loading ${jsfiles.length} commands!`);

        jsfiles.forEach((f, i) => {

            let props = require(`./${folder}/${f}`);
            console.log(`       ${i + 1}: ${f} loaded`);
            props.help.folder = folder
            props.help.show = 'creator'
            bot.commands.set(props.help.name, props, folder);
        });
    })
}

module.exports.loader = {
    name: 'Creator',
    folder: 'Creator',
    description: 'Creator commands',
    show: 'creator'
}