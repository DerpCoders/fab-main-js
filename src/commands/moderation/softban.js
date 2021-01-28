module.exports = {
  name: "softban",
  description: "softban",
  execute(message, args) {
    try {
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.send(
          "❌**You don't have `MANAGE ROLES` permission!**"
        );

      const banuser = message.mentions.members.last();

      const banRole = message.guild.roles.cache.find(
        (r) => r.name === "Banned"
      );

      if (!banuser) return message.channel.send("I can't find that member!");
      if (banuser.hasPermission("ADMINISTRATOR"))
        return message.channel.send("❌ **That user is an Admin!**");
      if (banuser.roles.cache.has(banRole))
        return message.channel.send("That member is already banned.");

      //All roles will be removed
      banuser.roles
        .set([])
        .then((member) =>
          console.log(`Member roles is now of ${member.roles.cache.size} size`)
        );

      if (!banRole)
        return message.guild.roles
          .create({
            data: {
              name: "Banned",
              color: "GREY",
              permissions: ["READ_MESSAGE_HISTORY"],
            },
          })
          .then((role) => {
            banuser.roles.add(role);
          });

      banuser.roles.add(banRole);
      message.channel.send(`✅ ${banuser} was banned softly!`);
    } catch (eror) {
      return message.channel.send(
        `❌ **Maybe I don't have enough permissions to do that!** \`\`\`${eror}\`\`\` \n Please contact Radioactive#9921`
      );
    }
  },
};
