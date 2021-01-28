const mongoose = require('mongoose');

const lSchema = new mongoose.Schema({
    guildID: { type: String },
    guildName: { type: String },
    disabled: { type: Boolean, default: false },
    levelupChannelID: { type: String }
});

module.exports = mongoose.model('EDB', lSchema);