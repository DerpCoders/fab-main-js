const mongoose = require('mongoose');
const Discord = require("discord.js");
const cSchema = require("../../../database/models/countSchema");

module.exports = {
  name: 'disablestats', async execute(message, args, client) {
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({content: '❌ **You are missing `ADMINISTRATOR` permissions!**'});
    let data = await cSchema.findOne({
      guildID: message.guild.id
    });
    if (!data) return message.channel.send({content: 'Server stats is already disabled..'});
    let category = message.guild.channels.cache.find(c => c.type === Discord.ChannelType.GuildCategory && c.id === data.categoryID)
    let VCS = category.children.cache.filter(ch => ch.type === Discord.ChannelType.GuildVoice);
    let memberCOUNT = VCS.find(vc => vc.name.startsWith('Member'));
    if (!memberCOUNT) return message.channel.send({content: '⚠ **One or more stats voice channel is missing!**'});
    let userCOUNT = VCS.find(vc => vc.name.startsWith('User'));
    if (!userCOUNT) return message.channel.send({content: '⚠ **One or more stats voice channel is missing!**'});
    let roleCOUNT = VCS.find(vc => vc.name.startsWith('Role'));
    if (!roleCOUNT) return message.channel.send({content: '⚠ **One or more stats voice channel is missing!**'});
    let botCOUNT = VCS.find(vc => vc.name.startsWith('Bot'));
    if (!botCOUNT) return message.channel.send({content: '⚠ **One or more stats voice channel is missing!**'});
    let emojiCOUNT = VCS.find(vc => vc.name.startsWith('Emoji'));
    if(!emojiCOUNT) return message.channel.send({content: '⚠ **One or more stats voice channel is missing!**'});
    let channelCOUNT = VCS.find(vc => vc.name.startsWith('Channel'));
    if (!channelCOUNT) return message.channel.send({content: '⚠ **One or more stats voice channel is missing!**'});
    let categoryCOUNT = VCS.find(vc => vc.name.startsWith('Category'));
    if (!categoryCOUNT) return message.channel.send({content: '⚠ **One or more stats voice channel is missing!**'});
    memberCOUNT.delete();
    userCOUNT.delete();
    roleCOUNT.delete();
    botCOUNT.delete();
    emojiCOUNT.delete();
    channelCOUNT.delete();
    categoryCOUNT.delete();

    await cSchema.deleteOne({
      guildID: message.guild.id,
    });

    message.channel.send({content: '✅ Disabled server stats for ' + message.guild.name});
  }
}