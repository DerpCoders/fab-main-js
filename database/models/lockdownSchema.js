const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   guildID: { type: String },
   channels: { type: Array }
});