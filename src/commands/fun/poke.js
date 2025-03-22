const Discord = require("discord.js");
const cmdCooldown = new Set();
const Client = require('nekos.life');
const nekos = new Client();

module.exports = {
  name: "poke",
  description: "poke",
  async execute(message, args) {
    try {
      const image = await nekos.poke();
      const mem = message.mentions.members.last();
      if (cmdCooldown.has(message.author.id)) {
        message.channel
          .send({ content: `**🚫 Please wait 5 seconds before using that command again**` })
          .then((sentmsg) => {
            setTimeout(() => {
              sentmsg.delete()
            }, 5000)
          });
      } else if (!mem || message.author.id == mem.id) {
        message.channel.send({ content: "❌ **Wrong arguments please mention someone.**" });
      } else if (mem.user.bot)
        return message.channel.send({ content: "No, not with bots!" });
      else if (mem.id === "759762948016177195")
        return message.channel.send({ content: "Haha, you can't do that with me" });
      else {
        const embed = new Discord.EmbedBuilder()
          .setAuthor({
            name: `${message.author.username} poked ${mem.user.username}!`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
          .setColor('Random')
          .setFooter({
            text: `${mem.user.username} || Source: Anime Neko`,
            iconURL: mem.user.displayAvatarURL({ dynamic: true })
      })
          .setImage(image.url);
        message.channel.send({ embeds: [embed] });
        cmdCooldown.add(message.author.id);
        setTimeout(() => {
          cmdCooldown.delete(message.author.id);
        }, 5000);
      }
    } catch (e) {
      console.log(e);
      message.channel.send(`❌ An error occured \n \`${e}\``);
    }
  }
}
