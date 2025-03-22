const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');
const { PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'disablelevelup',
    async execute(message, args) {
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
        await settings.updateOne({
            levelupChannelID: null
        });
        message.channel.send({content: `✅ **Level up channel disabled**!`});
    }
    }
}