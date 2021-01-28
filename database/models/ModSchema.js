const mongoose = require('mongoose');

const modSchema = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    Punishments: Array,
    lastUpdatedAt: { type: Date , default: new Date() }
})

const messageModel = module.exports = mongoose.model('Moderation', modSchema);