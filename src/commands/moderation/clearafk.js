const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'clearafk',
  async execute(message, client, args) {
    const afkS = require('../../../database/models/afkSchema');
    try {
      let afkUser;
      if (message.mentions.members.last()) {
        afkUser = message.mentions.members.last();
      } else if (args[0]) {
        afkUser = message.guild.members.cache.get(args[0]);
      } else {
        return message.channel.send({ content: 'Mention a member!' });
      }
      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send({ content: '❌ **You are missing `MANGE_GUILD` permissions!**' });
      const data = await afkS.findOne({
        userID: afkUser.user.id,
        guildID: message.guild.id
      });
      if (!data) return message.channel.send({ content: `${afkUser.displayName} is not afk.` });
      await afkS.deleteOne({
        userID: afkUser.user.id,
        guildID: message.guild.id
      });
      let currentNickname = afkUser.displayName;
      let newNickname = currentNickname.replace('[AFK]', '');
      afkUser.setNickname(newNickname);
      message.channel.send({ content: `${afkUser.displayName}'s AFK status has been removed.` });
    } catch (err) {
      console.log(err);
      return message.channel.send({ content: '❌ **Could not find that user**' });
    }
  }
}