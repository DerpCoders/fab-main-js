const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "poll",
  description: "poll",
 async execute(message, args) {
    try {
      const q = args.slice(1).join(" ");
      let time = args[0];
      let regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);
      if(regex.test(time)){
      let timeInMS = ms(time);
      if (!q)
        return message.channel.send(
          "❌ **Error** ```Required argument <poll title> is missing!\n                   ^^```"
        );
      setTimeout(()=>{
        message.delete();
      },2000)
      const pollEmbed = new Discord.EmbedBuilder()
        .setColor('Random')
        .setTitle(`Poll - ${q}`)
        .setDescription(
          `<:YOS:764504833448345640> -  Yos \n\n<:nopefarod:749166580503412787> - Nope \n\n :white_circle: - Other (send in this channel) \n Time - ${time} `
        )
        .setTimestamp()
        .setFooter({
          text: `Poll created by ${message.member.displayName}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true })
      });
   let sentEmbed = await message.channel.send({embeds: [pollEmbed]})
        sentEmbed.react("764504833448345640");
        sentEmbed.react("749166580503412787");
        sentEmbed.react("⚪");
        const reactionFilter = (reaction) => ['YOS', 'nopefarod', '⚪'].includes(reaction.emoji.name); 
        let collector = sentEmbed.createReactionCollector(reactionFilter, {time: parseInt(timeInMS)});
        collector.on('end', collected => {
         let yesVotes = collected.find(r => r.emoji.id === '764504833448345640');
         let noVotes = collected.find(r => r.emoji.id === '749166580503412787');
         let otherVotes = collected.find(r => r.emoji.name === '⚪');
         let embed = new Discord.EmbedBuilder()
         .setTitle('Poll ended!')
         .setDescription(`Duration: ${time}\n\nResults:\n Yes - ${yesVotes.users.cache.size},\n No - ${noVotes.users.cache.size}, \n Other - ${otherVotes.users.cache.size}`)
         .setColor('Random')
         .setTimestamp()
         message.channel.send({content: `${message.author}, **Poll ended!**`});
         message.channel.send({embeds: [embed]});
        });
     } else return message.channel.send({content: 'Invalid time provided'});
    } catch (err) {
      return (
        message.channel.send(
          `❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
        ) && console.log(err)
      );
    }
  },
};
