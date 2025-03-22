const Discord = require("discord.js");
const cmdCD = new Set();

module.exports = {
  name: "kill",
  execute(message, args) {
    const killUser = message.mentions.users.last();
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var url1;
    let origin;
    let title;
    let footer;
    var random = getRandomInt(0, 4);
    if (random == 0) {
      url1 = "https://media1.giphy.com/media/xCzLjOXGjHJoA/giphy.gif?cid=ecf05e47c68287a88684bd70560ce2bb26d35d8024970ab4&rid=giphy.gif";
      origin = "Source: Giphy";
      title = "oh no :^( RIP";
      footer = null;
    } else if (random == 1) {
      url1 = "https://64.media.tumblr.com/tumblr_m2om8pBc6d1qgn1epo1_500.gif";
      origin = "Source: Tumblr";
      title = "RIP";
      footer = null;
    } else if (random == 2) {
      url1 = "https://i.gifer.com/D2Lo.gif";
      origin = "Source: Gifer";
      title = "LMAO";
      footer = null;
    } else if (random == 3) {
      url1 = "https://i.kym-cdn.com/photos/images/newsfeed/001/856/131/1af.gif";
      title = '\;(';
      origin = "Source: Know your meme";
    } else if (random == 4) {
      url1 = 'https://tenor.com/view/indian-serials-nonsensical-wtf-wtf-is-going-on-dramatic-gif-13707255';
      title = 'lmao';
      origin = 'Source: Tenor';
    }
    if (cmdCD.has(message.author.id)) {
      message.channel
        .send({content: `**🚫 Please wait 5 seconds before using that command again**`})
        .then((sentmsg) => {
          setTimeout(()=>{
            sentmsg.delete()
          },5000)
        });
    } else if (!killUser || message.author.id == killUser.id) {
      message.channel.send({content: "❌ **Wrong arguments please mention someone.**"});
      cmdCD.add(message.author.id);
      setTimeout(() => {
        cmdCD.delete(message.author.id);
      }, 5000);
    } else if (killUser.id === "759762948016177195")
      return message.channel.send({content: "Hahaha, you can't do that with me."});
    else {
      const aEmbed = new Discord.EmbedBuilder()
        .setColor('Random')
        .setAuthor({
          name:`${message.author.username} killed ${
            message.guild.members.cache.get(killUser.id).displayName
          }..... ` + title,
          iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true })
    })
        .setImage((URL = url1))
        .setFooter({
          text: `${origin}  ||  RIP ${message.guild.members.cache.get(killUser.id).displayName}`
    });
      message.channel.send({embeds: [aEmbed]});
      cmdCD.add(message.author.id);
      setTimeout(() => {
        cmdCD.delete(message.author.id);
      }, 5000);
    }
  },
};
