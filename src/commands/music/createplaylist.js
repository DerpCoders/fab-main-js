const Discord = require('discord.js');
const playSchema = require('../../../database/models/playlistSchema');

module.exports = {
  name: 'createplaylist', async execute(message, args) {
    let name = args.slice(0).join(" ")
    if (!name) return message.channel.send({content: ':warning: Invalid Arguments\n**Expected:** `createplaylist <name>`'})
    let data = await playSchema.findOne({ userID: message.author.id });
    if (!data) {
      data = new playSchema({ userID: message.author.id, playlists: [] });
    }
    if (data.playlists.length >=3) return message.channel.send({content: ':warning: You already have max no. of playlists! (3)'});
    data.playlists.push({name: name, songs: []});
    data.save();
    message.channel.send({content: `✅ Playlist **${name}** created successfully!`})
  }
}