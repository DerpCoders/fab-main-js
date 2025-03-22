const mongoose = require('mongoose');
const warnSchema = require('../../../database/models/ModSchema');
const { EmbedBuilder, PermissionsBitField  } = require('discord.js');

module.exports = {
  name: 'fetchwarns', description: 'Fetches warns for mentioned member', async execute(message, args) {
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
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: '❌ **You are missing `ADMINISTRATOR` permission!**' });
      if (warnUser.user.bot) return message.channel.send({ content: 'Bots do not have warnings!' })
      const settings = await warnSchema.findOne({
        GuildID: message.guild.id,
        UserID: warnUser.user.id
      });
      let mod;
      let modBy;
      let datei;
      let warnBy = ''
      if (!settings) return message.channel.send({ content: `**${warnUser.user.username} has 0 warnings!** <:Noice:790821832773074964>` });
      let wars = settings.Punishments.length;
      for (var i = 0; i < settings.Punishments.length; i++) {
        mod = message.guild.members.cache.find(meme => meme.user.id === settings.Punishments[i].Moderator).user;
        modBy = mod.username;
        datei = settings.Punishments[i].Date || 'Unable to fetch';
        const date = new Date(datei);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        warnBy += `**${i + 1}) Reason** - ${settings.Punishments[i].Reason}\n **Moderator** - ${modBy}\n**Date** - ${formattedDate}\n\n`;
      }
      const msg = new EmbedBuilder()
        .setTitle(`:warning: Warnings for ${warnUser.user.username}`)
        .setColor(warnUser.displayHexColor || 'RED')
        .setDescription(`${warnBy}`)
        .setThumbnail(warnUser.user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `Total ${wars} warning(s)`})
        .setTimestamp()
      message.channel.send({ embeds: [msg] });
    } catch (err) {
      console.log(err);
      return message.channel.send({ content: '❌ **Could not find that user**' });
    }
  }
}