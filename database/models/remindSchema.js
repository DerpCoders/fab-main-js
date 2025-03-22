const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    guildID: { type: String, required: true },
    nextRemind: { type: Date, required: true },
    author: { type: String },
    message: { type: String },
    channelID: { type: String }
});

module.exports = mongoose.model('reminders', schema);