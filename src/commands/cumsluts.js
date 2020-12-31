const Discord = require('discord.js');
const client = require('nekos.life');
const nekos = new client()

module.exports = { name: 'cumsluts', async execute(message, args) {
    try{
       if(!message.channel.nsfw) return message.channel.send('**❌ Error**\n Try again in NSFW channel.');
       const image = await nekos.nsfw.cumsluts()
       const embed = new Discord.MessageEmbed()
       .setTitle(`Cum sluts`)
    .setColor('f58888')
    .setImage(image.url)
    .setFooter(`Requested by ${message.author.username} || Source: Anime Nekos`, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed);
    }catch (eror){
            return message.channel.send(`❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact Fab was taken#0001`) && console.log(eror);
        }
}
}