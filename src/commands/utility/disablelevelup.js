const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');

module.exports = {
    name: 'disablelevelup', async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('❌ **You are missing `MANAGE_GUILD` permission!**');
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
            return message.channel.send('Please re-type this command as this server was not in my database!');
        } else{
        await settings.updateOne({
            levelupChannelID: null
        })
        message.channel.send(`✅ **Level up channel disabled**!`);
    }
    }
}