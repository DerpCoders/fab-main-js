const Discord = require("discord.js");
const NekoClient = require('nekos.life');
const neko = new NekoClient;
module.exports = {
  name: "kiss",
  description: "kiss",
 async execute(message, args) {
 
      const kissUser = message.mentions.members.last();
const image = await neko.sfw.kiss();
      if (!kissUser || message.author.id == kissUser.id) {
        message.channel.send("❌ **Wrong arguments please mention someone.**");
      } else if (kissUser.id === "759762948016177195")
        return message.channel.send("Uhhh, please stop");
      else {
        const iEmbed = new Discord.MessageEmbed()
          .setColor("f16ccd")
          .setAuthor(
            `${message.author.username} kissed ${kissUser.displayName}!`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setImage(image.url)
          .setFooter(`${kissUser.displayName} || Source: Anime Neko`, kissUser.user.displayAvatarURL({dynamic: true}))
        message.channel.send(iEmbed);
      }
    }
}
