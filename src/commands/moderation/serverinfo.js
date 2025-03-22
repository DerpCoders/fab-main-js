const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "serverinfo",
  async execute(message, args) { 
    let ownr = await message.guild.fetchOwner()
      let mbed = new Discord.EmbedBuilder()
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
            value: `${ownr.user.username}`,
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
            name: "🔫 Total Stickers",
            value: `${message.guild.stickers.cache.size}`,
            inline: true
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
              message.guild.channels.cache.filter((c) => c.type === Discord.ChannelType.GuildCategory)
                .size
            } \n💬 Total Text: ${
              message.guild.channels.cache.filter((c) => c.type === Discord.ChannelType.GuildText).size
            } \n🌙 AFK Channel: <#${
              message.guild.afkChannelId
            }>\n🔊 Total Voice: ${
              message.guild.channels.cache.filter((c) => c.type === Discord.ChannelType.GuildVoice)
                .size
            }`,
            inline: true,
          },
        )
        .setTimestamp()
        .setFooter({
          text: `${message.guild.name}`,
          iconURL: message.guild.iconURL({ dynamic: true })
  });
      if (message.guild.premiumTier == 1)
        mbed.spliceFields(5, 0, {
          name: "💎 Boost perks-",
          value:
            "Animated Server icon,\n Server invite background, \n50+ Emoji slots",
          inline: true,
        });
        else if(message.guild.premiumTier == 2)
        mbed.spliceFields(5, 0, {
          name: "💎 Boost perks-",
          value:
            "Server banner,\n1080p 60fps Go Live streams,\n50 MB upload limit for all members,\n 50+ Emoji slots (Total 150)",
          inline: true,
        })
      message.channel.sendTyping();
      setTimeout(()=> {
        message.channel.send({embeds: [mbed]})
      }, 2000)
    }
  }