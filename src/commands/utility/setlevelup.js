const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'setlevelup', async execute(message, args) {
        const chann = message.mentions.channels.first();
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send({content: '❌ **You are missing `MANAGE_GUILD` permission!**'});
        const settings = await levelSchema.findOne({
            guildID: message.guild.id,
        })
        if (!settings) {
            const newData = new levelSchema({
                guildID: message.guild.id,
                guildName: message.guild.name,
                disabled: false,
                levelupChannelID: null
            })
            newData.save();
            return message.channel.send({content: 'Please re-type this command as this server was not in my database!'});
        } else{
            if (!chann) return message.channel.send({content: `❌ **Please provide a valid channel!**\nExample usage - \`setlevelup #levels\``})
        await settings.updateOne({
            levelupChannelID: chann.id
        })
        message.channel.send({content: `✅ **Level up channel set to** ${chann}!`});
    }
    }
}