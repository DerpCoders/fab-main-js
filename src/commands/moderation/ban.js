const Discord = require("discord.js");
const { PermissionsBitField } = require('discord.js')
module.exports = {
  name: "ban",
  description: "ban",
  async execute(message, args) {
    try {
      if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return message.channel.send(
          "❌**You dont have permissions to ban members! LMAO**"
        );
      let toBan;
      if (message.mentions.members.last()) {
        toBan = message.mentions.members.last();
      } else if (args[0]) {
        toBan = message.guild.members.cache.get(args[0]);
      }
      else {
        return message.channel.send({ content: '⚠️ **Invalid arguments:**\nExample usage - `ban @user <reason>`' });
      }
      let reas = args.slice(1).join(" ");
      let guildname = message.guild.name;
      if (!toBan) return message.channel.send({ content: `⚠ **Invalid member**` });
      if (toBan.user.id === message.author.id)
        return message.channel.send(
          "Why do you want to ban yourself? Leave the server, simple as that!"
        );
      if (message.author.id !== message.guild.ownerID) {
        if (toBan.roles.highest.position > message.member.roles.highest.position) {
          return message.channel.send({ content: "❌ **That member is higher than you in role hierarchy!**" });
        }
      }
      if (!reas) reas = 'No reason given.'

      if (toBan.user.id === "759762948016177195")
        return message.channel.send({ content: "Hmmm, It seems like you don't like me :(" });
      if (!toBan.bannable)
        return message.channel.send(
          "❌ I can't ban ;(, that member is **Moderator/Admin** (Higher than me in role hierarchy)"
        );
      if (toBan.bannable) {
        const reactionFilter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && (message.author.id === user.id)
        const confirmMsg = await message.reply(`Do you really want to ban **${toBan.user.username}** for **${reas}**?\nReact to proceed`);
        await confirmMsg.react('✅');
        await confirmMsg.react('❌');

        const collector = confirmMsg.createReactionCollector({ reactionFilter, time: 15000, max: 1});
        collector.on('collect', reaction => {
          if (reaction.emoji.name === '✅') {
            let tis = new Discord.EmbedBuilder()
              .setTitle(`✅ **Successfully banned** ${toBan.user.username}`)
              .addFields(
                {name: "Member banned-", value: toBan.user.username, inline: true },
                {name: 'Banned by-', value:message.author.username, inline: true},
                {name: 'Reason-', value: reas, inline: true},
                {name: 'Date-', value: message.createdAt.toString(), inline: true}
              )
              .setThumbnail(
                "https://media1.tenor.com/images/ae83976e867ebc2722054a632ff045ad/tenor.gif"
              )
              .setColor("#ff0307");

            message.channel.send({ embeds: [tis] });
            toBan.send({content: `You were banned from **${guildname}** by **${message.author.username}**\nReason - **${reas}**`})
              .catch((err) =>
                message.channel.send({
                  content: `:warning: Unable to send DM to \`${toBan.user.username}\`.`
                })
              );

            toBan.ban({ reason: reas });
          } else if (reaction.emoji.name === '❌') {
            return confirmMsg.edit({ content: '❌ **Canceled**' });
          }
          collector.stop();
        });
        collector.on('end', (_, reason) => {
          if (reason === 'time') {
            confirmMsg.edit({content: '⏰ Ban confirmation timed out.'});
          }
        });
      }
    } catch (eror) {
      return message.channel.send({
        content: `❌ **There was an error while running this command!** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
      });
    }
  }
}
