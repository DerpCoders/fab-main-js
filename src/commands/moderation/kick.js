const Discord = require("discord.js");
const kCooldown = new Set();

module.exports = {
  name: "kick",
  description: "kick",
  execute(message, args) {
    try {
      if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers))
        return message.channel.send(
          "❌**You dont have permissions to kick members!**"
        );
      let toKick;
      if(message.mentions.members.last()){
        toKick = message.mentions.members.last();
      }else if(args[0]){
        toKick = message.guild.members.cache.get(args[0]);
      }else {
        return message.channel.send({content: '⚠️ **Invalid arguments:**\nExample usage - `kick @user <reason>`'})
      }
      let reaso = args.slice(1).join(" ");
      let guildname = message.guild.name;
      if (!toKick) return message.channel.send({content: `⚠ **Invalid member**`});
      if (toKick.user.id === message.author.id)
        return message.channel.send(
          "Why do you want to kick yourself? Leave the server, simple as that!"
        );
        if(message.author.id !== message.guild.ownerID){ 
          if (toKick.roles.highest.position > message.member.roles.highest.position){
          return message.channel.send({content: "❌ **That member is higher than you in role hierarchy!**"})
          }
        }
      if (!reaso) reaso = 'No reason given.'

      if (toKick.user.id === "759762948016177195")
        return message.channel.send({content: "Hmmm, It seems like you don't like me :("});

      if (!toKick.kickable)
        return message.channel.send(
          "❌ I can't kick ;(, that member is **Moderator/Admin** (Higher than me in role hierarchy)"
        );

      if (toKick.kickable) {
        let tise = new Discord.EmbedBuilder()
          .setTitle(`✅ **Successfully kicked** ${toKick.user.tag}`)
          .addFields(
            {name: 'Member kicked', value: toKick.toString(), inline: false },
            {name: 'Kicked by', value: message.author.username, inline: false },
            {name: 'Reason', value: reaso, inline: false},
            {name: 'Date', value: message.createdAt.toString(), inline: false }
          )
          .setThumbnail(
            "https://media.tenor.com/images/e4b140b4735bc82fdfc3021ea3200914/tenor.gif"
          )
          .setColor("#ff0307")
          .setFooter({text:`ID: ${toKick.id}`})
          .setTimestamp()

        message.channel.send({embeds: [tise]});
        toKick
          .send(
            `You were kicked from **${guildname}** by moderator **${message.author.username}**\nReason - **${reaso}**`
          )
          .catch(() =>
            message.channel.send(
              `:warning: Unable to send DM to \`${toBan.user.username}\`.`
            )
          );

        toKick.kick(reaso);
      }
    } catch (eror) {
      return message.channel.send(
        `❌ **There was an error while running ${this.name} command!** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
      ) && console.log(eror);
    }
  },
};
