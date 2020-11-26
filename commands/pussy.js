const Discord = require('discord.js');
const NSFW = require('discord-nsfw');
const nsfw = new NSFW();

module.exports = {
    name: 'pussy',
    description: 'random pussy gifs',
  async  execute(message, args){
    const image = await nsfw.pussy();
const embed = new Discord.MessageEmbed()
    .setTitle(`Pussy Image`)
    .setColor("GREEN")
    .setImage(image.url);
message.channel.send(embed);
  }
}