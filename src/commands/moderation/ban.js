const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "ban",
  execute(message, args) {
    try {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "❌**You dont have permissions to ban members! LUL**"
        );
      let toBan = message.mentions.members.last();
      let reas = args.slice(1).join(" ");
      let guildname = message.guild.name;
      if (!args[0])
        return message.channel.send(
          "Wasting my time bruh, can't you mention someone?"
        );
      if (!toBan) return message.channel.send(`${args[0]} is not a member `);
      if (toBan.user.id === message.author.id)
        return message.channel.send(
          "Why do you want to ban yourself? Leave the server, simple as that!"
        );
      if (toBan.roles.highest.position > message.member.roles.highest.position) return message.channel.send("❌ **That member is higher than you in role hierarchy!**");
      if (!reas) reas = 'No reason given.'

      if (toBan.user.id === "759762948016177195")
        return message.channel.send("Hmmm, It seems like you don't like me :(");
      if (!toBan.bannable)
        return message.channel.send(
          "❌ I can't ban ;(, that member is **Moderator/Admin** (Higher than me in role hierarchy)"
        );

      if (toBan.bannable) {
        let tis = new Discord.MessageEmbed()
          .setTitle(`✅ **Successfully banned** ${toBan}`)
          .addField("Member banned-", toBan)
          .addField("Banned by-", message.author)
          .addField("Reason-", reas)
          .setThumbnail(
            "https://media1.tenor.com/images/ae83976e867ebc2722054a632ff045ad/tenor.gif"
          )
          .addField("Date-", message.createdAt)
          .setColor("#ff0307");

        message.channel.send(tis);

        toBan
          .send(
            `You were banned from **${guildname}** by **${message.author.username}**\nReason - **${reas}**`
          )
          .catch(() =>
            message.channel.send(
              `DM to ${toBan.user.username} wasn't sent! Because they have DMs turned off!`
            )
          );

        toBan.ban( {reason: reas} );
      }
    } catch (eror) {
      return message.channel.send(
        `❌ **Maybe I don't have enough permissions to do that!** \`\`\`${eror}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``
      );
    }
  },
};
