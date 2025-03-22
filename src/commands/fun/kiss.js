const Discord = require("discord.js");
const NekoClient = require('nekos.life');
const neko = new NekoClient;

module.exports = {
  name: "kiss",
  description: "kiss",
 async execute(message, args) {
      const kissUser = message.mentions.members.last();
      const image = await neko.kiss();
      if (!kissUser || message.author.id == kissUser.id) {
        message.channel.send({content: "❌ **Wrong arguments please mention someone.**"});
      } else if (kissUser.id === "759762948016177195")
        return message.channel.send({content: "Uhhh, please stop"});
      else {
        const iEmbed = new Discord.EmbedBuilder()
          .setColor("f16ccd")
          .setAuthor({
            name: `${message.author.username} kissed ${kissUser.displayName}!`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
          .setImage(image.url)
          .setFooter({text: `${kissUser.displayName} || Source: Anime Neko`, iconURL:kissUser.user.displayAvatarURL({dynamic: true})})
        message.channel.send({embeds: [iEmbed]});
      }
    }
}
