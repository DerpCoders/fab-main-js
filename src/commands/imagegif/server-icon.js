const Discord = require("discord.js");

module.exports = {
  name: "server-icon",
  description: "server-icon",
  execute(message, args) {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Server icon - ${message.guild.name}`)
      .setColor('Random')
      .setImage(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setTimestamp();
    message.channel.send({embeds: [embed]});
  },
};
