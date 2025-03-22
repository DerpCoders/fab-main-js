const Discord = require('discord.js');
const mongoose = require('mongoose');
const muteSchema = require('../../../database/models/mute-schema');

module.exports = { name: 'unmute', async execute(message, client, args){
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) return message.channel.send({content: '❌ **You are missing `MANAGE_ROLES` permissions!**'});
    let member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send({content: '⚠ **User not found!**'});
    let data = await muteSchema.findOne({
      userID: member.user.id,
      guildID: member.guild.id
    });
    if(!data){
    let mRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
    if(!mRole) return message.channel.send({content: '⚠ **No `Muted` role found!**'});
    member.roles.remove(mRole);
    message.channel.send({content: `**${member.user.tag}** is now unmuted!`});
    }
    else if(data.current = true){
      return message.channel.send({content: `**${member.user.tag}** is temporarily muted by **${data.modName}**, they will be unmuted - ${data.expires}`});
    }
  }
}