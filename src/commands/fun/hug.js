const Discord = require("discord.js");
const client = require("nekos.life");
const nekos = new client();
const CMD = new Set();

module.exports = {
  name: "hug",
  async execute(message, args) {
    try {
      const image = await nekos.hug();
      const mem = message.mentions.members.last();
      if (CMD.has(message.author.id)) {
        message.channel
          .send({content: `**🚫 Please wait 5 seconds before using that command again**`})
          .then((sentmsg) => {
            setTimeout(()=>{
              sentmsg.delete();
            },5000)
          });
      } else if (!mem || message.author.id == mem.id) {
        message.channel.send({content: "❌ **Wrong arguments please mention someone.**"});
      } else if (mem.user.bot)
        return message.channel.send({content: "No, not with bots!"});
      else if (mem.id === "759762948016177195")
        return message.channel.send({content: "Nope"});
      else {
        const embed = new Discord.EmbedBuilder()
          .setAuthor({
            name: `${message.author.username} hugged ${mem.user.username} :D`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
          .setColor('Random')
          .setFooter({
            text: `${mem.user.username} || Source: Anime Neko`,
            iconURL: mem.user.displayAvatarURL({ dynamic: true })
      })
          .setImage(image.url);
        message.channel.send({embeds: [embed]});
        CMD.add(message.author.id);
        setTimeout(() => {
          CMD.delete(message.author.id);
        }, 5000);
      }
    } catch (eror) {
      return (
        message.channel.send(
          `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
        ) && console.log(eror)
      );
    }
  },
};
