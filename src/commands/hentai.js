const Discord = require('discord.js');
const client = require('nekos.life');
const nekos = new client()

module.exports = { name: 'hentai', async execute(message, args) {
    try{
    const image = await nekos.nsfw.hentai();
    if(!message.channel.nsfw) return message.channel.send('**❌ Error**\n Try again in NSFW channel.');
const embed = new Discord.MessageEmbed()
.setTitle(`Anime Hentai`)
    .setColor('f58888')
    .setImage(image.url)
    .setFooter(`Requested by ${message.author.username} || Source: Anime Nekos`, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed);
    } catch (err) {
            return message.channel.send(`❌ **Unknown Package** \`\`\`${err}\`\`\` \n Please contact Fab was taken#0001`) && console.log(eror);
        }
}
}