const mongoose = require('mongoose');

const muteSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: false
    },
    moderatorID: {
        type: String,
        required: true
    },
    modName: {
        type: String,
        required: false
    },
    guildID: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    current: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Mutes', muteSchema);