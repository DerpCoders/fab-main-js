const gis = require("g-i-s");

module.exports = {
  name: "gis",
async execute(message, args) {
    try {
      let qu = args.slice(0).join(" ");
      if (!qu){
        const messageFilter = m => m.author.id === message.author.id;
        message.reply(
          "What do you want to search on google image search?\n Type `cancel` to cancel at anytime!"
        );
        await message.channel.awaitMessages(messageFilter, {max:1, time: 15000 }).then(async (collected) => {
          if(!collected) return;
          if(collected.first().content.toLowerCase() === 'cancel') return message.channel.send('❌ Canceled');
          qu = collected.first().content;
  
      gis(qu, logResults);

      function logResults(error, results) {
        if (error) return message.channel.send(error);
        else {
          if (!results)
            return message.channel.send(
              `**❌ 0 results found!** (For query -\`${qu}\`)`
            );
          message.channel.send(results[10].url);
        }
      }
    });
    } else {
      
      gis(qu, logResults);

      function logResults(error, results) {
        if (error) return message.channel.send(error);
        else {
          if (!results)
            return message.channel.send(
              `**❌ 0 results found!** (For query -\`${qu}\`)`
            );
          message.channel.send(results[10].url);
        }
      }
    }
    } catch (eror) {
      return message.channel.send(
        `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``
      );
    }
  },
};
