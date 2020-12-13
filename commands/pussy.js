const Discord = require('discord.js');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
    name: 'pussy',
    description: 'random pussy gifs',
  async  execute(message, args){
    if(!message.channel.nsfw) return message.channel.send('**❌ Error**\n Try again in NSFW channel.')
    const image = await neko.nsfw.pussy();
const embed = new Discord.MessageEmbed()
    .setTitle(`Pussy Image`)
    .setColor('pink')
    .setImage(image.url);
message.channel.send(embed);
  }
}