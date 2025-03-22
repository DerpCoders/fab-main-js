const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userID: { type: String, required: true },
    playlists: [
        {
            name: { type: String, required: true },
            songs: { type: Array, default: [] },
        }
    ],
    songLimit: { type: Number, default: 10 }
});

module.exports = mongoose.model("playlists", schema);