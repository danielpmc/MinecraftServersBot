exports.run = async (client, message, args) => {

    //Message embed for help of the command and also missing args
    const embed = new Discord.MessageEmbed()
        .addField('**Types:**', '**Spigot:** \nCreative \nSurvival \n')
        .addField('**Versions:**', '1.16.1 \n1.16.2 \n1.16.3 \n1.16.4')
        .setFooter(settings.get(message.guild.id).prefix + 'create type version')
}