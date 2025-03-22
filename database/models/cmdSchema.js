const mongoose = require('mongoose');

const schemas = new mongoose.Schema({
    guildID: { type: String },
    commands: { type: Array },
    modName: { type: String }
});

module.exports = mongoose.model('cmds', schemas);