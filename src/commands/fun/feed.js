const Discord = require("discord.js");
const client = require("nekos.life");
const nekos = new client();
const CMD = new Set();

module.exports = {
  name: "feed",
  async execute(message, args) {
    try {
      const image = await nekos.feed();
      let mem;
      
      if(message.mentions.members.last()) {
             mem = message.mentions.members.last();
           }
            else if(args[0]){
              mem = message.guild.members.cache.get(args[0]);
           }
           else {
             return message.channel.send({content: '❌ **Wrong arguments please mention someone.**'});
           }
      if (CMD.has(message.author.id)) {
        message.channel
          .send({content: `**🚫 Please wait 5 seconds before using that command again**`})
          .then((sentmsg) => setTimeout(()=>{sentmsg.delete()},2000));
      } else if (mem.user.bot)
        return message.channel.send({content: "No, not with bots!"});
      else if (mem.id === "759762948016177195")
        return message.channel.send({content: "nay nay"});
      else {
        const embed = new Discord.EmbedBuilder()
          .setAuthor({
            name: `${message.author.username} fed ${mem.user.username} 🍼 :D `,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
          .setColor('Random')
          .setFooter({
            text: `${mem.user.username} || Source: Neko`,
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
      return message.channel.send({content: `❌ **Could not find that user!**`}) && console.log(eror);
    }
  },
};
