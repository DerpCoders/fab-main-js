const Discord = require("discord.js");

module.exports = {
  name: "permissions",
  async execute(message, args) {
    try {
      if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles))
        return message.channel.send(
          "❌ **You are missing `Manage Roles` permission to view member permissions!**"
        );
      const permMember = message.mentions.members.last() || message.member;
      let perms = permMember.permissions.toArray();
      var fi = perms.join(`\n`);

      const embed = new Discord.EmbedBuilder()
        .setAuthor({
          name: `Permissions - ${permMember.user.username}`,
          iconURL: permMember.user.displayAvatarURL({ dynamic: true })
    })
        .setTimestamp()
        .setColor('Random')
        .setDescription(`\`\`\`${fi}\`\`\``)
        .setFooter({text:`Requested by ${message.author.tag}`})
        .setThumbnail(
          permMember.user.displayAvatarURL({ dynamic: true, size: 2048 })
        );
      message.channel.send({embeds: [embed]});
    } catch (eror) {
      return message.channel.send(
        `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
      );
    }
  },
};
