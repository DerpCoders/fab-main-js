const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "serverinfo",
  execute(message, args) {
    if (message.channel.type === "text") {
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.reply(`❌**You can't use that**`);
      let mbed = new Discord.MessageEmbed()
        .setColor("ffa600")
        .setTitle(`Server Information - ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
        .addFields(
          {
            name: "📝 Server Name",
            value: `${message.guild.name}`,
            inline: true,
          },
          {
            name: "🎃 Owner",
            value: `${message.guild.owner.user.tag}`,
            inline: true,
          },
          {
            name: "📅 Creation Date",
            value: `${message.guild.createdAt.toLocaleString()}`,
            inline: true,
          },
          { name: "🆔 Server ID", value: `${message.guild.id}`, inline: true },
          {
            name: "💎 Premium (Boost)",
            value: `No. of boosts: ${message.guild.premiumSubscriptionCount}\nBoost level: ${message.guild.premiumTier}`,
            inline: true,
          },
          {
            name: "✅ Total Roles",
            value: `${message.guild.roles.cache.size}`,
            inline: true,
          },
          {
            name: "🎉 Total Emojis",
            value: `${message.guild.emojis.cache.size}`,
            inline: true,
          },
          {
            name: `🤖 Members`,
            value: `😶 Total: ${message.guild.memberCount}\n😀 Humans Alive: ${
              message.guild.members.cache.filter((m) => !m.user.bot).size
            }\n🤖 Bots: ${
              message.guild.members.cache.filter((m) => m.user.bot).size
            }`,
            inline: true,
          },
          {
            name: "💬 Channels",
            value: `🟢 Total: ${
              message.guild.channels.cache.size
            } \n🟢 Total Categories: ${
              message.guild.channels.cache.filter((c) => c.type === "category")
                .size
            } \n💬 Total Text: ${
              message.guild.channels.cache.filter((c) => c.type === "text").size
            } \n🔊 Total Voice: ${
              message.guild.channels.cache.filter((c) => c.type === "voice")
                .size
            }`,
            inline: true,
          },
          { name: "🏳 Region", value: `${message.guild.region}`, inline: true }
        )
        .setTimestamp()
        .setFooter(
          `${message.guild.name}`,
          message.guild.iconURL({ dynamic: true })
        );
      if (message.guild.premiumTier === 1)
        mbed.spliceFields(5, 0, {
          name: "💎 Boost perks-",
          value:
            "Animated Server icon,\n Server invite background, \n50+ Emoji slots",
          inline: true,
        });
        else if(message.guild.premiumTier === 2)
        mbed.spliceFields(5, 0, {
          name: "💎 Boost perks-",
          value:
            "Server banner,\n1080p 60fps Go Live streams,\n50 MB upload limit for all members,\n 50+ Emoji slots (Total 150)",
          inline: true,
        })
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.stopTyping();
        message.channel.send(mbed);
      }, 1000);
    }
  },
};
