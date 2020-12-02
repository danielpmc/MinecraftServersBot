//Global Defined
global.Discord = require("discord.js");
global.fs = require("node-fs-extra");
global.spawn = require('child_process').spawn;
global.client = new Discord.Client({disableEveryone: true});
global.config = require("./config.json");
global.exec = require('child_process').exec;

//Database - Quick.DB
const db = require('quick.db');
global.settings = new db.table("settings"); //Guild settings, Stored: Prefix, GuildID, Admins only
global.userSettings = new db.table("userSettings"); //User settings, Stored: Premium User, Dedicated Port, Premium Ram, Server

//Post stats to websites
var DanBotHosting = require("danbot-hosting");

//Client event ready
client.on("ready", async () => {
  console.log(client.user.username + " is online with " + client.guilds.cache.size + " servers!");
  client.user.setActivity('Minecraft | Free Minecraft Servers!')

  //Start posting stats (DanBotHosting)
  const API = new DanBotHosting.Client(config.DanBotHosting.apikey, client);
 
  // Start posting
  let initalPost = await API.autopost();

  if (initalPost) {
    console.error(initalPost); // console the error
  };

  //Automatic 30second git pull.
  setInterval(() => {
    exec(`git pull`, (error, stdout) => {
        let response = (error || stdout);
        if (!error) {
            if (response.includes("Already up to date.")) {
                //console.log('Bot already up to date. No changes since last pull')
            } else {
                client.channels.cache.get('783799656722595842').send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                setTimeout(() => {
                    process.exit();
                }, 1000)
            };
        }
    })
}, 30000)
});

//Client event guild join
client.on("guildCreate", (guild) => {
    //set guild settings
    settings.set(guild.id, {
        "prefix": config.DiscordBot.defaultprefix,
        "adminonly": "false"
    });
    
    //Log new guild join in console
    client.channels.cache.get('783799548395913246').send('Joined: ' + guild.name + "(ID: " + guild.id + ") \nGuild owner: " + guild.owner + " \n\nTotal: " + client.guilds.cache.size)
});

//Command handler
client.on('message', message => {
    if (message.channel.type === 'dm') {
        minecraftServerProcess.stdin.write(message.content);
    }
    if (message.author.bot) return;
    if (message.author.id == "137624084572798976") {

    const prefix = settings.get(message.guild.id).prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandargs = message.content.split(' ').slice(1).join(' ');
    const command = args.shift().toLowerCase();
    console.log(`[${message.author.username}] [${message.author.id}] >> ${prefix}${command} ${commandargs}`);
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {
                if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                    return;
             }
    } 

    }
})

client.login(config.DiscordBot.token);