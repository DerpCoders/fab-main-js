const Discord = require("discord.js");
const commandCOOLDOWN = new Set();

module.exports = {
  name: "punch",
  description: "punch",
  execute(message, args) {
    if (message.channel.type === Discord.ChannelType.GuildText) {
      const punchUser = message.mentions.members.last();
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      var url1;
      let origin;
      let title;
      var random = getRandomInt(0, 8);
      if (random == 0) {
        url1 =
          "https://i.pinimg.com/originals/e6/f9/7c/e6f97cb321e8b8a0fed85195d47d7832.gif";
        origin = "Source: Pinterest";
        title = "oof!";
      } else if (random == 1) {
        url1 =
          "https://i.pinimg.com/originals/d7/c3/0e/d7c30e46a937aaade4d7bc20eb09339b.gif";
        origin = "Source: Pinterest";
        title = "ouch!";
      } else if (random == 2) {
        url1 =
          "https://i.chzbgr.com/full/8579535360/hDD734FAF/thats-gonna-hurt.gif";
        origin = "Source: Cheezburger.com";
        title = "ouch! xD";
      } else if (random == 3) {
        url1 =
          "https://i.chzbgr.com/full/8583163648/h2396FC8A/screw-you-power-star.gif";
        origin = "Source: Cheezburger.com";
        title = "oof!";
      } else if (random == 4) {
        url1 =
          "https://media1.tenor.com/images/31686440e805309d34e94219e4bedac1/tenor.gif?itemid=4790446";
        origin = "Source: Tenor ";
        title = "oof!";
      } else if ((random = 5)) {
        url1 =
          "https://media1.tenor.com/images/6834932465e2659dc5b1ee38dfd42b44/tenor.gif?itemid=14615839";
        origin = "Source: Tenor";
        title = "oof!";
      } else if (random == 6) {
        url1 =
          "https://64.media.tumblr.com/2850598977b96577f44a95c0277971ca/tumblr_mu544kbOCR1s6eseao1_r1_400.gif";
        origin = "Source: Tumblr";
        title = "oof!";
      } else if (random == 7) {
        url1 =
          "https://i.pinimg.com/originals/92/f4/59/92f4595d3f6ac39b6c175eb3d454fec2.gif";
        origin = "Source: Pinterest";
        title = "ouch!";
      }
      if (commandCOOLDOWN.has(message.author.id)) {
        message.channel
          .send({content: `**🚫 Please wait 5 seconds before using that command again**`})
          .then((sentmsg) => {
            setTimeout(()=>{
              sentmsg.delete()
            },5000)
          });
      } else if (!punchUser || message.author.id == punchUser.id) {
        message.channel.send({content: "❌ **Wrong arguments please mention someone.**"});
        commandCOOLDOWN.add(message.author.id);
        setTimeout(() => {
          commandCOOLDOWN.delete(message.author.id);
        }, 5000);
      } else if (punchUser.id === "759762948016177195")
        return message.channel.send({content: "Hahaha, you can't do that with me."});
      else {
        const aEmbed = new Discord.EmbedBuilder()
          .setColor('Random')
          .setAuthor({
            name: `${message.author.username} punched ${punchUser.displayName} ` +
              title,
            iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true })
      })
          .setImage((URL = url1))
          .setFooter({text:origin});
        message.channel.send({embeds: [aEmbed]});
        commandCOOLDOWN.add(message.author.id);
        setTimeout(() => {
          commandCOOLDOWN.delete(message.author.id);
        }, 5000);
      }
    }
  },
};
