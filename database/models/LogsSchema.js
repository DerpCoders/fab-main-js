const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    channelID: String,
    channelName: String,
    lastUpdatedAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('LogsDB', LogSchema);

