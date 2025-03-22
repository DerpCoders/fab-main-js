const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    guildID: { type: String , required: true },
    moderatorID: { type: String, required: true },
    categoryID: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('serverstats', schema);