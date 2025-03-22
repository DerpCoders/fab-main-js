const Discord = require('discord.js');
const playSchema = require('../../../database/models/playlistSchema');

module.exports = {
  name: 'createplaylist', 
  /**
   * 
   * @param {Discord.ChatInputCommandInteraction} interaction 
   * @returns 
   */
  async execute(interaction) {
    let name = interaction.options.getString('name');
    let data = await playSchema.findOne({ userID: interaction.user.id });
    if (!data) {
      data = new playSchema({ userID: interaction.user.id, playlists: [] });
    }
    if (data.playlists.length >=3) return await interaction.followUp({content: ':warning: You already have max no. of playlists! (3)'});
    data.playlists.push({name: name, songs: []});
    data.save();
    await interaction.followUp({content: `✅ Playlist **${name}** created successfully!`})
  }
}