const mongoose = require('mongoose');

const welcomeSchema = new mongoose.Schema({
    guildID: String,
    guildName: String,
    channelID: String,
    lastUpdatedAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('welcome-channels', welcomeSchema)