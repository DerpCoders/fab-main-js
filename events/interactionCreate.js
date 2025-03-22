const Discord = require('discord.js');
const { playy, queue, afkSets } = require('../index');

module.exports = {
  name: Discord.Events.InteractionCreate,
  /**
   * @param {Discord.Interaction} interaction 
   * @param {Discord.Client} client 
   * @returns 
   */
  async execute(interaction, client) {
    if (!interaction.guild && interaction.isChatInputCommand()) return await interaction.reply({ content: ':warning: Commands can only be used in an integrated server!', flags: Discord.MessageFlags.Ephemeral })
    try {
      if (interaction.isButton()) return;
      if (interaction.isAnySelectMenu()) return;

      if (interaction.commandName === 'help') {
        client.scutilcmds.get('help').execute(interaction);
        return;
      }
      if (interaction.commandName === 'ping') {
        client.scutilcmds.get('ping').execute(interaction, client);
        return;
      }
      if (interaction.isChatInputCommand()) {
        await interaction.deferReply();
      }
      if (interaction.commandName === 'instagram') {
        client.scfuncmds.get('instagram').execute(interaction, interaction.options.getString('username'));
      }
      if (interaction.commandName === 'leaderboard') {
        client.sclvlcmds.get('leaderboard').execute(interaction, client)
      }
      if (interaction.commandName === 'rank') {
        client.sclvlcmds.get('rank').execute(interaction, interaction.options.getUser('user') || interaction.user, client)
      }
      if (interaction.commandName === 'play') {
        if (interaction.isAutocomplete()) {
          let focusedValue = interaction.options.getFocused();
          if (!focusedValue) {
            return interaction.respond([{ name: '❌ No songs found!', value: 'error' }]);
          }
          if (focusedValue.toLowerCase().includes('spotify.com/playlist')) {
            return interaction.respond([{ name: '⚠️ Please use `addtoplaylist` command to add songs from spotify.', value: 'error' }])
          }
          if (focusedValue.toLowerCase().includes('spotify.com/track')) {
            const { getData } = require('spotify-url-info')(fetch);
            const data = await getData(focusedValue);
            if (!data) return interaction.respond([{ name: '❌ No songs found!', value: 'error' }]);
            focusedValue = `${data.name} ${data.artists[0].name}`
          }
          const yts = require('yt-search');
          const results = await yts(focusedValue);
          if (results.videos.length === 0) return interaction.respond([{ name: '❌ No songs found!', value: 'error' }])
          const choices = results.videos.slice(0, 7).map(video => ({
            name: video.title,
            value: video.url
          }));
          await interaction.respond(choices);
        } else if (interaction.isCommand()) {
          client.scmusiccmds.get('play').execute(interaction, client, queue.get(interaction.guild.id), playy, queue);
        }
      }
      if (interaction.commandName === 'help') {
        client.scutilcmds.get('help').execute(interaction);
      }
      if (interaction.commandName === 'ban') {
        client.scmodcmds.get('ban').execute(interaction);
      }
      if (interaction.commandName === 'levelup') {
        if (interaction.options.getSubcommand() === 'channel') {
          client.scutilcmds.get('setlevelup').execute(interaction);
        }
      }
      if (interaction.commandName === 'gis') {
        client.scfuncmds.get('gis').execute(interaction);
      }
      if (interaction.commandName === 'avatar'){
        client.scfuncmds.get('avatar').execute(interaction);
      }
      if (interaction.commandName === 'clear'){
        client.scmodcmds.get('clear').execute(interaction);
      }
      if (interaction.commandName === 'playlist'){
        if (interaction.options.getSubcommand() === 'create'){
          client.scmusiccmds.get('createplaylist').execute(interaction)
        }
        if (interaction.options.getSubcommand() === 'add'){
         client.scmusiccmds.get('addtoplaylist').execute(interaction);
        }
        if (interaction.options.getSubcommand() === 'view'){
          client.scmusiccmds.get('playlist').execute(interaction, playy, queue.get(interaction.guild.id), queue, client);
        }
      }
      if (interaction.commandName === 'now'){
        if (interaction.options.getSubcommand('playing')){
          client.scmusiccmds.get('now-playing').execute(interaction, queue.get(interaction.guild.id));
        }
      }
      if (interaction.commandName === 'afk'){
        client.scutilcmds.get('afk').execute(interaction, afkSets);
      }
      if (interaction.commandName === 'statistics'){
        client.scutilcmds.get('stats').execute(interaction, client)
      }
    } catch (error) {
      console.error(error);
      await interaction.channel.send({
        content: ":x: An error occurred while executing this command.",
      });
    }
  }
}