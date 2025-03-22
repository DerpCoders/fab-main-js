const Discord = require("discord.js");
const search = require("libnpmsearch");

module.exports = {
  name: "npm",
  async execute(message, args) {
    try {
      let query = args.slice(0).join(" ").trim("%27");
      if (!query){
        message.reply(`What do you want to search on NPM?\n Type \`cancel\` to cancel at anytime!`);
        const filter = m => m.author.id === message.author.id
        await message.channel.awaitMessages(filter, {max: 1, time: 15000}).then(async collected => {
          if(!collected) return;
          if(collected.first().content.toLowerCase() === 'cancel') return message.channel.send({content: '❌ Canceled'});
          query = collected.first().content.toLowerCase();
          const result = await search(query);
      if (result.length == 0)
        return message.channel.send(
          `**❌ 0 packages found!** (For query -\`${query}\`)`
        );
      const final = result[0];
      const fin = final.maintainers.map((main) => main.username);
      if (fin === undefined)
        return message.channel.send(
          `**❌ 0 packages found!** (For query -\`${query}\`)`
        );
      const foo = fin.join(", ");
      const bar = final.keywords;
      const embed = new Discord.EmbedBuilder();
      if (bar === undefined) return message.channel.send({content: "❌ Unknown package"});
      embed.setAuthor({
        name: `NPM Search`,
        iconURL: "https://pbs.twimg.com/profile_images/1285630920263966721/Uk6O1QGC_400x400.jpg"
        });
      embed.setDescription(
        `**[${query}](https://www.npmjs.com/package/${final.name}/)**`
      );
      embed.setColor('Red');
      embed.addFields(
        { name: "Name-", value: final.name.toString(), inline: true },
        { name: "Desctiption-", value: final.description.toString(), inline: true },
        { name: "Maintainers-", value: foo.toString(), inline: true },
        { name: "Version-", value: final.version.toString(), inline: true },
        { name: "Keywords-", value: bar.join(", ").toString(), inline: true },
        { name: "Last Publish-", value: final.date.toString(), inline: true }
      );
      embed.setFooter({
        text: message.author.username,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
        });
      embed.setTimestamp();
      message.channel.send({embeds: [embed]});
        });
      } else {
      const result = await search(query);
      if (result.length == 0)
        return message.channel.send(
          `**❌ 0 packages found!** (For query -\`${query}\`)`
        );
      const final = result[0];
      const fin = final.maintainers.map((main) => main.username);
      if (fin === undefined)
        return message.channel.send(
          `**❌ 0 packages found!** (For query -\`${query}\`)`
        );
      const foo = fin.join(", ");
      const bar = final.keywords;
      const embed = new Discord.EmbedBuilder();
      if (bar === undefined) return message.channel.send({content: "❌ Unknown package"});
      embed.setAuthor({
        name:`NPM Search`,
        iconURL: "https://pbs.twimg.com/profile_images/1285630920263966721/Uk6O1QGC_400x400.jpg"
      });
      embed.setDescription(
        `**[${query}](https://www.npmjs.com/package/${final.name}/)**`
      );
      embed.setColor('Red');
      embed.addFields(
        { name: "Name-", value: final.name.toString(), inline: true },
        { name: "Desctiption-", value: final.description.toString(), inline: true },
        { name: "Maintainers-", value: foo.toString(), inline: true },
        { name: "Version-", value: final.version.toString(), inline: true },
        { name: "Keywords-", value: bar.join(", ").toString(), inline: true },
        { name: "Last Publish-", value: final.date.toString(), inline: true }
      );
      embed.setFooter({
        text: message.author.username,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      });
      embed.setTimestamp();
      message.channel.send({embeds: [embed]});
      }
    } catch (err) {
      return (
        message.channel.send(
          `❌ **Unknown Package** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
        ) && console.log(err)
      );
    }
  },
};
