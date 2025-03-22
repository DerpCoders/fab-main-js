const mongoose = require('mongoose');
const Discord = require('discord.js');
const ecoSchema = require('../../../database/models/ecoSchema');

module.exports = {
    name: 'deleteprofile', async execute(message, args, client) {
        let data = await ecoSchema.findOne({
            userID: message.author.id
        });
        if (!data) return message.reply('you don\'t have a profile??');
        await ecoSchema.deleteOne({
            userID: message.author.id,
        });
        message.reply('aight I deleted your profile!');
    }
}
