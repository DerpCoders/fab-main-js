const Discord = require("discord.js");

module.exports = {
  name: "permissions",
  async execute(message, args) {
    try {
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.send(
          "❌ **You are missing `Manage Roles` permission to view member permissions!**"
        );
      const permMember = message.mentions.members.last() || message.member;
      let perms = permMember.permissions.toArray();
      var fi = perms.join(`\n`);

      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `Permissions - ${permMember.user.username}`,
          permMember.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("RANDOM")
        .setDescription(`\`\`\`${fi}\`\`\``)
        .setFooter(`Requested by ${message.author.tag}`)
        .setThumbnail(
          permMember.user.displayAvatarURL({ dynamic: true, size: 2048 })
        );
      message.channel.send(embed);
    } catch (eror) {
      return message.channel.send(
        `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``
      );
    }
  },
};
