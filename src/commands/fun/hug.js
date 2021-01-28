const Discord = require("discord.js");
const client = require("nekos.life");
const nekos = new client();
const CMD = new Set();

module.exports = {
  name: "hug",
  async execute(message, args) {
    try {
      const image = await nekos.sfw.hug();
      const mem = message.mentions.members.last();
      if (CMD.has(message.author.id)) {
        message.channel
          .send(`**🚫 Please wait 5 seconds before using that command again**`)
          .then((sentmsg) => sentmsg.delete({ timeout: 5000 }));
      } else if (!mem || message.author.id == mem.id) {
        message.channel.send("❌ **Wrong arguments please mention someone.**");
      } else if (mem.user.bot)
        return message.channel.send("No, not with bots!");
      else if (mem.id === "759762948016177195")
        return message.channel.send("Nope");
      else {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.username} hugged ${mem.user.username} :D`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("RANDOM")
          .setFooter(
            `${mem.user.username} || Source: Anime Neko`,
            mem.user.displayAvatarURL({ dynamic: true })
          )
          .setImage(image.url);
        message.channel.send(embed);
        CMD.add(message.author.id);
        setTimeout(() => {
          CMD.delete(message.author.id);
        }, 5000);
      }
    } catch (eror) {
      return (
        message.channel.send(
          `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``
        ) && console.log(eror)
      );
    }
  },
};
