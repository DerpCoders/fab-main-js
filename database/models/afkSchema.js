const mongoose = require('mongoose');

const afkSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    guildID: { type: String, required: true },
    reason: { type: String, required: true },
    time: { type: Date, required: true }
});

module.exports = mongoose.model('afks', afkSchema);