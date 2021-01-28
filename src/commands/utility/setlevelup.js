const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');

module.exports = {
    name: 'setlevelup', async execute(message, args) {
        const chann = message.mentions.channels.first();
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
            if (!chann) return message.channel.send(`❌ **Please provide a valid channel!**\nExample usage - \`setlevelup #levels\``)
        await settings.updateOne({
            levelupChannelID: chann.id
        })
        message.channel.send(`✅ **Level up channel set to** ${chann}!`);
    }
    }
}