const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
   guildID: String,
   guildName: String,
   moderator: String,
   prefix: String,
   lastUpdatedAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');