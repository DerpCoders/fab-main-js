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
    var random = getRandomInt(0, 3);
    if (random == 0) {
      url1 =
        "https://media1.giphy.com/media/xCzLjOXGjHJoA/giphy.gif?cid=ecf05e47c68287a88684bd70560ce2bb26d35d8024970ab4&rid=giphy.gif";
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
      origin = "Source: Know your meme";
    }
    if (cmdCD.has(message.author.id)) {
      message.channel
        .send(`**🚫 Please wait 5 seconds before using that command again**`)
        .then((sentmsg) => sentmsg.delete({ timeout: 5000 }));
    } else if (!killUser || message.author.id == killUser.id) {
      message.channel.send("❌ **Wrong arguments please mention someone.**");
      cmdCD.add(message.author.id);
      setTimeout(() => {
        cmdCD.delete(message.author.id);
      }, 5000);
    } else if (killUser.id === "759762948016177195")
      return message.channel.send("Hahaha, you can't do that with me.");
    else {
      const aEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          `${message.author.username} killed ${
            message.guild.member(killUser).displayName
          }..... ` + title,
          message.author.displayAvatarURL({ size: 2048, dynamic: true })
        )
        .setImage((URL = url1))
        .setFooter(
          `${origin}  ||  RIP ${message.guild.member(killUser).displayName}`
        );
      message.channel.send(aEmbed);
      cmdCD.add(message.author.id);
      setTimeout(() => {
        cmdCD.delete(message.author.id);
      }, 5000);
    }
  },
};
