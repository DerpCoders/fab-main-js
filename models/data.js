const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name: String,
    enabled: Boolean,
    guildID: String,
});

module.exports = mongoose.model("Data", dataSchema);