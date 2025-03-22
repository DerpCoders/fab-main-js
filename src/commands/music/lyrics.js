const lyricsFinder = require('@faouzkk/lyrics-finder');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'lyrics',
  async execute(message, client, args, serverQueue) {
    let artist = args.slice(0).join(' ');
    if (!artist) return message.channel.send({ content: '❌ **Please provide an artist name!**' });

    let pages = [];
    let currentPage = 0;
    let songName = '';

    const messageFilter = (m) => m.author.id === message.author.id;

    message.reply('(This message will be canceled in 15 seconds)\nNoice, now enter a **song name** -');
    const msgCollector = message.channel.createMessageCollector({ max: 1, time: 15000, filter: messageFilter });

    msgCollector.on('collect', async (collected) => {
      if (collected.content.toLowerCase() === 'cancel') return message.channel.send({ content: '❌ Canceled' });

      songName = collected.content;
      await finder(artist, songName, message, pages);

      if (pages.length === 0) {
        return message.channel.send({ content: '❌ No lyrics found for this song!' });
      }

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('previous')
          .setLabel('⬅')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === 0),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel('➡')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === pages.length - 1)
      );

      const lyricEmbed = await message.channel.send({
        embeds: [pages[currentPage]],
        components: [row],
      });

      const collector = lyricEmbed.createMessageComponentCollector({ time: 60000 });

      collector.on('collect', async (interaction) => {
        if (interaction.user.id !== message.author.id) return await interaction.reply({content: 'This message is not for you!', flags: Discord.MessageFlags.Ephemeral });
        if (interaction.customId === 'previous' && currentPage > 0) {
          currentPage--;
        } else if (interaction.customId === 'next' && currentPage < pages.length - 1) {
          currentPage++;
        }

        ButtonBuilder.from(row.components[0]).setDisabled(currentPage === 0);
        ButtonBuilder.from(row.components[1]).setDisabled(currentPage === pages.length - 1);

        await interaction.update({
          embeds: [pages[currentPage]],
          components: [row],
        });
      });

      collector.on('end', () => {
        lyricEmbed.edit({ components: [] });
      });
    });

    msgCollector.on('end', (collected, reason) => {
      if (reason === 'time') {
        message.channel.send('⏰ Message timed out.');
      }
    });
  },
};

async function finder(artist, songName, message, pages) {
  let fullLyrics = (await lyricsFinder(`${artist} ${songName}`)) || 'Not found!';
  for (let i = 0; i < fullLyrics.length; i += 2048) {
    const lyric = fullLyrics.substring(i, Math.min(fullLyrics.length, i + 2048));
    const embed = new EmbedBuilder()
      .setDescription(lyric)
      .setColor('ffee5a')
      .setTitle(`Lyrics - ${songName}`)
      .setFooter({ text: 'Source: Genius lyrics', iconURL: 'https://www.pinclipart.com/picdir/middle/59-598221_genius-lyrics-logo-transparent-clipart.png' });

    pages.push(embed);
  }
}