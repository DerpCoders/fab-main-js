const mongoose = require('mongoose');
const LogSchema = require('../../../database/models/LogsSchema');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'setlogs',
    async execute(message, args){
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send({content: '❌ **You are missing `MANAGE_GUILD` permissions!**'});
        const chain = message.mentions.channels.first();
        if (!chain) return message.channel.send({content: '❌ **Please provide a channel!**\nExample usage - `setlogs #welcome`'});
        await LogSchema.findOneAndUpdate({
          guildID: message.guild.id,
          guildName: message.guild.name
        }, {
          guildID: message.guild.id,
          guildName: message.guild.name,
          channelID: chain.id,
          channelName: chain.name
        }, {
          upsert: true
        });
        message.channel.send({content: `✅ **Logs channel set for** ${chain} !`}) && console.log(`logs for ${message.guild.name} in channel ${chain}`);
    }
}