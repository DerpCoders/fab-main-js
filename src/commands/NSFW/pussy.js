const Discord = require('discord.js');
const CLI = require('nekos.life');
const neko = new CLI();
module.exports = { name: "pussy", async execute(message, args){

if (!message.channel.nsfw)
return message.channel.send(
  "**❌ Error**\n Try again in NSFW channel."
);
const image = await neko.nsfw.pussy();
const embed = new Discord.MessageEmbed()
.setTitle(`Pussy Image/GIF`)
.setColor("f58888")
.setImage(image.url)
.setFooter(
  `Requested by ${message.author.username} || Source: Anime Nekos`,
  message.author.displayAvatarURL({ dynamic: true })
);
message.channel.send(embed);
}
}