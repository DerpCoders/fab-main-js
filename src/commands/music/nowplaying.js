const { EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
  name: 'now-playing', execute(message, client, args, serverQueue) {
    if (!message.member.voice.channel) return message.channel.send({content: '❌ **You need to be in a voice channel!**'});
    if (!message.guild.members.me.voice.channel) return;
    if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({content: '❌ **You need to be in the same voice channel!**'});
    if (!serverQueue) return message.channel.send({content: 'There\'s nothing in queue!'});
    let nextsong;
    if (serverQueue.songs[1]) nextsong = serverQueue.songs[1].title;
    if (!nextsong) nextsong = 'No next song in queue';
    const song = serverQueue.songs[0]
    const isPaused = serverQueue.player.state.status === "paused";
    const elapsedMs = isPaused ? serverQueue.pausedTime - serverQueue.songs[0].startTime : Date.now() - serverQueue.songs[0].startTime;
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    const totalSeconds = song.duration;

    const progressSeconds = Math.min(elapsedSeconds, totalSeconds);

    const progressBar = generateProgressBar(progressSeconds, totalSeconds);

    const embed = new EmbedBuilder()
      .setTitle(isPaused ? "⏸️ Paused" : "Now Playing -")
      .setDescription(`🎶 **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**\n\n${formatTime(progressSeconds)} ${progressBar} ${formatTime(totalSeconds)}\n\n⏭ **Next up -**\n${nextsong}`)
      .setThumbnail(`${serverQueue.songs[0].thumbnail}`)
      .setColor(isPaused ? 'e7a329' : 'e72929')
      .setFooter({text:`Requested by - ${serverQueue.songs[0].reqBy.username}`, iconURL: `https://cdn.discordapp.com/avatars/${serverQueue.songs[0].reqBy.id}/${serverQueue.songs[0].reqBy.avatar}.webp?size=2048`});
    message.channel.send({embeds: [embed]});
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function generateProgressBar(currentTime, totalTime, barLength = 40) {
  const progress = Math.round((currentTime / totalTime) * barLength);
  const bar = '█'.repeat(progress) + '─'.repeat(barLength - progress);
  return `\`${bar}\``;
}