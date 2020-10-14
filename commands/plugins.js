const embed = new Discord.MessageEmbed()
    .addField('**Supported plugins:**', 'WorldEdit \nEssentials')
    .setFooter('MCS^plugins enable/disable pluginname creative/survival')

exports.run = async (client, message, args) => {
    if (!args[0]) {
        message.channel.send(embed)
    } else if (args[0].toLowerCase() == "enable") {
        if (args[1].toLowerCase() == "essentials") {
            if (args[2].toLowerCase() == "creative") {
                fs.copyFile('./storage/plugins/EssentialsX-2.17.1.11.jar', './servers/' + message.author.id + "-creative/plugins/EssentialsX-2.17.1.11.jar", function (err) {
                    if (err) {
                      console.error(err);
                      message.channel.send(err)
                    } else {
                        message.channel.send('Enabled `Essentials` for your `' + args[2] + "` server!")
                    };
                });
            } else if (args[2].toLowerCase() == "survival") {
                fs.copy('./storage/plugins/EssentialsX-2.17.1.11.jar', './servers/' + message.author.id + "-survival/plugins/EssentialsX-2.17.1.11.jar", function (err) {
                    if (err) {
                      console.error(err);
                      message.channel.send(err)
                    } else {
                        message.channel.send('Enabled `Essentials` for your `' + args[2] + "` server!")
                    };
                });
            } else {
                //else options
                message.channel.send('Options are `creative/survival`. Sorry!')
            }
        } else if (args[1].toLowerCase() == "worldedit") {
            if (args[2].toLowerCase() == "creative") {
                fs.copyFile('./storage/plugins/worldedit-bukkit-7.2.0-beta-05.jar', './servers/' + message.author.id + "-creative/plugins/worldedit-bukkit-7.2.0-beta-05.jar", function (err) {
                    if (err) {
                      console.error(err);
                      message.channel.send(err)
                    } else {
                        message.channel.send('Enabled `WorldEdit` for your `' + args[2] + "` server!")
                    };
                });
            } else if (args[2].toLowerCase() == "survival") {
                fs.copy('./storage/plugins/worldedit-bukkit-7.2.0-beta-05.jar', './servers/' + message.author.id + "-survival/plugins/worldedit-bukkit-7.2.0-beta-05.jar", function (err) {
                    if (err) {
                      console.error(err);
                      message.channel.send(err)
                    } else {
                        message.channel.send('Enabled `WorldEdit` for your `' + args[2] + "` server!")
                    };
                });
            } else {
                //else options
                message.channel.send('Options are `creative/survival`. Sorry!')
            }
        } else {
            //Not supported plugin
            message.channel.send(embed)
        }
    } else {
        //Other than enable
        message.channel.send('Not finished')
    }
};