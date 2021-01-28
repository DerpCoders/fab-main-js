const Discord = require("discord.js");
const commandCooldown = new Set();
const Client = require('nekos.life');
const nekos = new Client
module.exports = {
  name: "pat",
  description: "pat",
  async execute(message, args) {
    const image = await nekos.sfw.pat();
    const mem = message.mentions.members.last();
    if (commandCooldown.has(message.author.id)) {
      message.channel
        .send(`**🚫 Please wait 5 seconds before using that command again**`)
        .then((sentmsg) => sentmsg.delete({ timeout: 5000 }));
    } else if (!mem || message.author.id == mem.id) {
      message.channel.send("❌ **Wrong arguments please mention someone.**");
    } else if (mem.user.bot)
      return message.channel.send("No, not with bots!");
    else if (mem.id === "759762948016177195")
      return message.channel.send("Haha, you can't do that with me");
    else {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.username} pats ${mem.user.username} :)`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("RANDOM")
        .setFooter(
          `${mem.user.username} || Source: Anime Neko`,
          mem.user.displayAvatarURL({ dynamic: true })
        )
        .setImage(image.url);
      message.channel.send(embed);
      commandCooldown.add(message.author.id);
      setTimeout(() => {
        commandCooldown.delete(message.author.id);
      }, 5000);
    }
  }
}
