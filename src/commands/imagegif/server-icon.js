const Discord = require("discord.js");

module.exports = {
  name: "server-icon",
  description: "server-icon",
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Server icon - ${message.guild.name}`)
      .setColor("RANDOM")
      .setImage(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setTimestamp();
    message.channel.send(embed);
  },
};
