const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: "softban",
  description: "softban",
  execute(message, args) {
    try {
      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles))
        return message.channel.send(
          "❌**You don't have `MANAGE ROLES` permission!**"
        );

      let banuser;

      if(message.mentions.members.last()){
        banuser = message.mentions.members.last();
      }else if(args[0]){
        banuser = message.guild.members.cache.get(args[0])
      }else {
        return message.channel.send({content: '⚠️ **Invalid arguments:**\nExample usage - `softban @user`'})
      }

      const banRole = message.guild.roles.cache.find(
        (r) => r.name === "Banned"
      );

      if (!banuser) return message.channel.send({content: "I can't find that member!"});
      if (banuser.permissions.has(PermissionsBitField.Flags.Administrator))
        return message.channel.send({content: "❌ **That user is an Admin!**"});
      if (banuser.roles.cache.has(banRole))
        return message.channel.send({content: "That member is already banned."});

      if (!banRole){
        banuser.roles.set([])
        message.guild.roles.create({
              name: "Banned",
              color: "GREY",
              permissions: [PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ViewChannel],
              reason: `${message.author.username} soft banned ${banuser.user.username}`
          })
          .then((role) => {
            banuser.roles.add(role);
          });
      message.channel.send({content: `✅ ${banuser} was banned softly!`});
      } else {
        banuser.roles.set([])
      banuser.roles.add(banRole);
      message.channel.send({content: `✅ ${banuser} was banned softly!`});
      }
    } catch (eror) {
      return message.channel.send(
        `❌ **I don't have enough permissions to do that!** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
      );
    }
  },
};
