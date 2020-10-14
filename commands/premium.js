exports.run = async (client, message, args) => {
    //Enables premium for a user
    //Will work like: MCS^premium enable userid creative/survival
    if (args[0] == "enable") {
        if (!args[1]) {
            message.channel.send("Command format: `" + settings.get(message.guild.id).prefix + "premium enable userid creative/survival`")
            
        } else {
            //Make sure settings are pre-set to ignore any errors
            if (userSettings.get(args[1]) == null) {
                userSettings.set(args[1], {
                    "premiumport":  true,
                    "creativeenabled": false,
                    "survivalenabled": false,
                    "creativedport": "0",
                    "survivaldport": "0",
                    "premiumram": false
                });
            }

            if (args[2] == "survival") {
                function serverport(length) {
                       var result           = '';
                       var characters       = '234562345623456';
                       var charactersLength = characters.length;
                       for ( var i = 0; i < length; i++ ) {
                          result += characters.charAt(Math.floor(Math.random() * charactersLength));
                       }
                       return result;
                }

                userSettings.set(args[1], {
                    "premiumport":  true,
                    "creativeenabled": userSettings.get(args[1]).creativeenabled,
                    "survivalenabled": true,
                    "creativedport": userSettings.get(args[1]).creativedport,
                    "survivaldport": serverport(5),
                    "premiumram": userSettings.get(args[1]).premiumram
                });
                message.channel.send("Enabled dedicated port for user: `" + args[1] + "` for the server: `" + args[2] + "`!") 
            } else if (args[2] == "creative") {
                function serverport(length) {
                       var result           = '';
                       var characters       = '234562345623456';
                       var charactersLength = characters.length;
                       for ( var i = 0; i < length; i++ ) {
                          result += characters.charAt(Math.floor(Math.random() * charactersLength));
                       }
                       return result;
                }

                userSettings.set(args[1], {
                    "premiumport":  true,
                    "creativeenabled": true,
                    "survivalenabled": userSettings.get(args[1]).survivalenabled,
                    "creativedport": serverport(5),
                    "survivaldport": userSettings.get(args[1]).survivaldport,
                    "premiumram": userSettings.get(args[1]).premiumram
                });
                message.channel.send("Enabled dedicated port for user: `" + args[1] + "` for the server: `" + args[2] + "`!") 
            }
        }
    } else if (args[0] == "disable") {
        if (!args[1]) {
            message.channel.send("Command format: `" + settings.get(message.guild.id).prefix + "premium disable userid creative/survival`")
        } else { 
            if (args[2] == "creative") {
                userSettings.set(args[1], {
                    "premiumport":  true,
                    "creativeenabled": false,
                    "survivalenabled": userSettings.get(args[1]).survivalenabled,
                    "creativedport": userSettings.get(args[1]).creativedport,
                    "survivaldport": userSettings.get(args[1]).survivaldport,
                    "premiumram": userSettings.get(args[1]).premiumram
                });
                message.channel.send("Disabled dedicated port for user: `" + args[1] + "` for the server: `" + args[2] + "`!") 
            } else if (args[2] == "survival") {
                userSettings.set(args[1], {
                    "premiumport":  true,
                    "creativeenabled": userSettings.get(args[1]).creativeenabled,
                    "survivalenabled": false,
                    "creativedport": userSettings.get(args[1]).creativedport,
                    "survivaldport": userSettings.get(args[1]).survivaldport,
                    "premiumram": userSettings.get(args[1]).premiumram
                });
                message.channel.send("Disabled dedicated port for user: `" + args[1] + "` for the server: `" + args[2] + "`!") 
            }
        }
    }
};