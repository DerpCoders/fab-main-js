const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
require("moment-duration-format");
const search = require("libnpmsearch");

module.exports = {
  name: "npm",
  async execute(message, args) {
    try {
      const query = args.slice(0).join(" ").trim("%27");
      if (!query)
        return message.reply(
          `What do you want to search?\nType - \`npm <query>\` to search any package on NPM.`
        );
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
      const embed = new Discord.MessageEmbed();
      if (bar === undefined) return message.channel.send("❌ Unknown package");
      embed.setAuthor(
        `NPM Search`,
        "https://pbs.twimg.com/profile_images/1285630920263966721/Uk6O1QGC_400x400.jpg"
      );
      embed.setDescription(
        `**[${query}](https://www.npmjs.com/package/${final.name}/)**`
      );
      embed.setColor("RED");
      embed.addFields(
        { name: "Name-", value: `${final.name}`, inline: true },
        { name: "Desctiption-", value: `${final.description}`, inline: true },
        { name: "Maintainers-", value: `${foo}`, inline: true },
        { name: "Version-", value: `${final.version}`, inline: true },
        { name: "Keywords-", value: `${bar.join(", ")}`, inline: true },
        { name: "Last Publish-", value: `${final.date}`, inline: true }
      );
      embed.setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      message.channel.send(embed);
    } catch (err) {
      return (
        message.channel.send(
          `❌ **Unknown Package** \`\`\`${err}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``
        ) && console.log(err)
      );
    }
  },
};
