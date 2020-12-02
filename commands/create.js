exports.run = async (client, message, args, socket) => {

    const embed = new Discord.MessageEmbed()
    .addField('**Types:**', '**Spigot:** \nCreative \nSurvival \n')
    .addField('**Versions:**', '1.16.1 \n1.16.2 \n1.16.3')
    .setFooter(settings.get(message.guild.id).prefix + 'create type version')
    
    function log(data) {
        process.stdout.write(data.toString());
        //client.users.cache.get(message.author.id).send(data.toString())
    }
    
    //Server IP generation
     function serverport(length) {
         if (userSettings.get(message.author.id) == null) {
            var result           = '';
            var characters       = '23456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         } else if (userSettings.get(message.author.id).premiumport == true) {
             if (args[0] == "survival") {
                if (userSettings.get(message.author.id).survivalenabled == false) {
                    var result           = '';
                    var characters       = '23456789';
                    var charactersLength = characters.length;
                    for ( var i = 0; i < length; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                } else {
                    var result = userSettings.get(message.author.id).survivaldport;
                    return result;
                }
             } else if (args[0] == "creative") {
                if (userSettings.get(message.author.id).creativeenabled == false) {
                    var result           = '';
                    var characters       = '23456789';
                    var charactersLength = characters.length;
                    for ( var i = 0; i < length; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                } else {
                    var result = userSettings.get(message.author.id).creativedport;
                    return result;
                }
             }
         }
     }

    let versions = [ "1.16.1", "1.16.2", "1.16.3"];
    if (!args[0]) {
        message.channel.send(embed)
    } else if (args[0].toLowerCase() == "survival") {
        if (versions.includes(args[1])) {
                const sport = serverport(4);   
        fs.copy('./storage/survival/', './servers/' + message.author.id + "-survival/", function (err) {
            if (err) {
              message.channel.send('The server you created already running!')
            } else {
                const embed = new Discord.MessageEmbed()
                    .addField('__**Server Started!**__', '**Server IP:** `161.97.138.124:' + sport + '` \n**Gamemode:** `Survival` \n**Version:** ' + args[1] + ' \n **Player Slots:** 50')
                    .setFooter('To manage the server. Please see DMs for info')
                message.channel.send(embed)
                client.channels.cache.get('783799548395913246').send('Minecraft server started for <@' + message.author.id + '> (ID: ' + message.author.id + ') \nIP: `161.97.138.124' + sport + '` \nGamemode: Survival \nVersion: ' + args[1])
                fs.copy('./storage/serverjars/spigot-' + args[1] + ".jar", './servers/' + message.author.id + "-survival/spigot-" + args[1] + ".jar")
                setTimeout(() => {
                    const minecraftServerProcess = spawn('java', [
                        '-Xmx1024M',
                        '-Xms1024M',
                        '-DIReallyKnowWhatIAmDoingISwear',
                        '-XX:ParallelGCThreads=1',
                        '-jar',
                        'spigot-' + args[1] + '.jar',
                        '-p' + sport,
                        '-s50',
                        'nogui' ], { cwd: './servers/' + message.author.id + '-survival/' }); 
                        minecraftServerProcess.stdout.on('data', log);
                        minecraftServerProcess.stderr.on('data', log);
    
                        setInterval(() => {
                            minecraftServerProcess.stdin.write("save-all \n");
                            }, 297000)
        
                            setTimeout(() => {
                                //3hours timeout
                                minecraftServerProcess.stdin.write('say You have 1hour left before the server will shutdown \n')
                                setTimeout(() => {
                                    //30mins timeout
                                    minecraftServerProcess.stdin.write('say You have 30mins left before the server will shutdown \n')
                                    setTimeout(() => {
                                        //15mins timeout
                                        minecraftServerProcess.stdin.write('say You have 15mins left before the server will shutdown \n')
                                        setTimeout(() => {
                                            //5mins timeout
                                            minecraftServerProcess.stdin.write('say You have 5mins left before the server will shutdown \n')
                                            setTimeout(() => {
                                                //30seconds timeout
                                                minecraftServerProcess.stdin.write('say The 4hour timeslot is up! Please re-run the command to start the server again for another 4hours! Shutting down server in 30seconds.')
                                                client.users.cache.get(message.author.id).send("The `" + args[0] + "` server you created has just expired! \nYou can run `MCS^create " + args[0] + "` to start your server again in any discord server. (No files or data will be lost)")
                                                minecraftServerProcess.stdin.write("kick @a Free server hosted by MinecraftServers discord bot. 4hour timeslot is up!\n");
                                                minecraftServerProcess.stdin.write('save-all \n')
                                                    setTimeout(() => {
                                                        //5seconds timeout
                                                        minecraftServerProcess.stdin.write("stop \n");
                                                        //5seconds timeout - Shutdown warning
                                                    }, 5000)
                                                //30seconds timeout - Shutdown warning
                                            }, 30000)
                                            //5mins timeout - Shutdown warning
                                        }, 300000)
                                        //15mins timeout - Shutdown warning
                                    }, 900000)
                                    //30mins timeout - Shutdown warning
                                }, 	1800000)
                                //3hours timeout - Shutdown warning
                            }, 10800000)
                        //2seconds timeout - server creation
                    }, 2000)
            }
        });
        } else {
            message.channel.send(embed)
        }

      } else if (args[0].toLowerCase() == "creative") {
        //Check if server version is supported
        if (versions.includes(args[1])) {
        //Generat random port
        const sport = serverport(4); 
        //Copy basic server files 
        fs.copy('./storage/creative/', './servers/' + message.author.id + "-creative/", function (err) {
            if (err) {
                message.channel.send('The server you created already running!')
            } else {
                //Server created message
                const embed = new Discord.MessageEmbed()
                .addField('__**Server Started!**__', '**Server IP:** `161.97.138.124:' + sport + '` \n**Gamemode:** `Creative` \n**Version:** `' + args[1] + '` \n **Player Slots:** 50')
                    .setFooter('To manage the server. Please see DMs for info')
                message.channel.send(embed)
                client.channels.cache.get('783799548395913246').send('Minecraft server started for <@' + message.author.id + '> (ID: ' + message.author.id + ') \nIP: `161.97.138.124' + sport + '` \nGamemode: Creative \nVersion: ' + args[1])
                //Copy server jar files over
                fs.copy('./storage/serverjars/spigot-' + args[1] + ".jar", './servers/' + message.author.id + "-creative/spigot-" + args[1] + ".jar")
                //Launch the server 
                setTimeout(() => {
                    var minecraftServerProcess = spawn('java', [
                        '-Xmx1024M',
                        '-Xms1024M',
                        '-DIReallyKnowWhatIAmDoingISwear',
                        '-XX:ParallelGCThreads=1',
                        '-jar',
                        'spigot-' + args[1] + '.jar',
                        '-p' + sport,
                        '-s50',
                        'nogui' ], { cwd: './servers/' + message.author.id + '-creative/' }); 
                        minecraftServerProcess.stdout.on('data', log);
                        minecraftServerProcess.stderr.on('data', log);

                        setInterval(() => {
                        minecraftServerProcess.stdin.write("save-all \n");
                        }, 297000)
    
                        setTimeout(() => {
                            //3hours timeout
                            minecraftServerProcess.stdin.write('say You have 1hour left before the server will shutdown \n')
                            setTimeout(() => {
                                //30mins timeout
                                minecraftServerProcess.stdin.write('say You have 30mins left before the server will shutdown \n')
                                setTimeout(() => {
                                    //15mins timeout
                                    minecraftServerProcess.stdin.write('say You have 15mins left before the server will shutdown \n')
                                    setTimeout(() => {
                                        //5mins timeout
                                        minecraftServerProcess.stdin.write('say You have 5mins left before the server will shutdown \n')
                                        setTimeout(() => {
                                            //30seconds timeout
                                            minecraftServerProcess.stdin.write('say The 4hour timeslot is up! Please re-run the command to start the server again for another 4hours! Shutting down server in 30seconds.')
                                            client.users.cache.get(message.author.id).send("The `" + args[0] + "` server you created has just expired! \nYou can run `MCS^create " + args[0] + "` to start your server again in any discord server. (No files or data will be lost)")
                                            minecraftServerProcess.stdin.write("kick @a Free server hosted by MinecraftServers discord bot. 4hour timeslot is up!\n");
                                            minecraftServerProcess.stdin.write('save-all \n')
                                                setTimeout(() => {
                                                    //5seconds timeout
                                                    minecraftServerProcess.stdin.write("stop \n");
                                                    //5seconds timeout - Shutdown warning
                                                }, 5000)
                                            //30seconds timeout - Shutdown warning
                                        }, 30000)
                                        //5mins timeout - Shutdown warning
                                    }, 300000)
                                    //15mins timeout - Shutdown warning
                                }, 900000)
                                //30mins timeout - Shutdown warning
                            }, 	1800000)
                            //3hours timeout - Shutdown warning
                        }, 10800000)
                    //2seconds timeout - server creation
                }, 2000)
            }
        });
    } else {
        message.channel.send(embed)
    }
    } else {
        message.channel.send(embed)
    }
};