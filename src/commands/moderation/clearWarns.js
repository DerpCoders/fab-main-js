const mongoose = require('mongoose');
const modSchema = require('../../../database/models/ModSchema');
const Discord = require('discord.js');

module.exports = {
  name: 'clearWarns', async execute(message, args, client) {
    try {
      let warnUser;

      if (message.mentions.members.last()) {
        warnUser = message.mentions.members.last();
      }
      else if (args[0]) {
        warnUser = message.guild.members.cache.get(args[0]);
      }
      else {
        return message.channel.send({ content: `<:PepeWeirdWut:960869988812603402> **Please mention a member!**` });
      }
      if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: '❌ **You are missing `ADMINISTRATOR` permission!**' });
      let data = await modSchema.findOne({
        UserID: warnUser.user.id,
        GuildID: message.guild.id
      });
      if (!data) return message.channel.send({ content: `**${warnUser.displayName}** has **0** warnings! Good work :)` });
      await modSchema.deleteOne({
        GuildID: message.guild.id,
        UserID: warnUser.user.id
      });
      message.channel.send({ content: `✅ **Cleared warns for ${warnUser.user.username}**` });
    } catch (err) {
      console.log(err);
      return message.channel.send({ content: '❌ **Could not find that user**' });
    }
  }
}