const { joinVoiceChannel } = require('@discordjs/voice');
const { getData } = require('spotify-url-info')(fetch);
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
  name: 'play', async execute(message, client, args, serverQueue, play, queue) {
    try {
      if (!message.member.voice.channel) return message.channel.send({ content: `You need to be in a voice channel!` });
      const perms = message.member.voice.channel.permissionsFor(message.client.user);
      if (!perms.has(PermissionFlagsBits.Connect)) return message.channel.send({ content: `❌ **I don\'t have permission to join ${message.member.voice.channel.name}!**` });
      if (!perms.has(PermissionFlagsBits.Speak)) return message.channel.send({ content: `❌ **I don't have permission to speak in that channel!**` });
      const channel = message.member.voice.channel;
      let music = args.slice(0).join(" ");
      if (!music) {
        return message.channel.send(':warning: Please provide a valid song title!')
      } else if (music.toLowerCase().includes('spotify.com/playlist')) {
        return message.channel.send(':warning: Please use `addtoplaylist` command to add songs from spotify.')
      } else if (music.toLowerCase().includes('spotify.com/track')) {
        const data = await getData(music);
        if (!data) return message.channel.send(':x: Cannot find that song!');
        const msg = await message.channel.send({ content: '*Searching...*' })
        const ytsearch = require('yt-search');
        const yo = await ytsearch(`${data.name} ${data.artists[0].name}`);
        let totalinSec = yo.videos[0].duration.seconds;
        const song = {
          title: yo.videos[0].title,
          url: yo.videos[0].url,
          thumbnail: yo.videos[0].thumbnail,
          startTime: Date.now(),
          reqBy: message.author,
          duration: totalinSec,
        }
        if (!serverQueue) {
          const queueConst = {
            textChannel: message.channel,
            voiceChannel: message.member.voice.channel,
            connection: null,
            songs: [],
            volume: 1,
            loop: false,
            playing: true,
            pausedTime: null,
            player: null,
            resource: null
          }
          queue.set(message.guild.id, queueConst);
          queueConst.songs.push(song);
          var connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false,
            bitrate: 384000
          });
          queueConst.connection = connection;
          msg.delete();
          await play(message, queueConst.songs[0])
        } else {
          serverQueue.songs.push(song);
          msg.edit({ content: `**${song.title}** has been added to the queue!\nPosition in queue: **${serverQueue.songs.length}**` })
        }
      }
      else {
        const msg = await message.channel.send({ content: '*Searching...*' })
        const ytsearch = require('yt-search');
        const yo = await ytsearch(music);
        if (yo.videos.length === 0) return message.channel.send({content: '❌ No songs found!'});
        let totalinSec = yo.videos[0].duration.seconds;
        const song = {
          title: yo.videos[0].title,
          url: yo.videos[0].url,
          thumbnail: yo.videos[0].thumbnail,
          startTime: Date.now(),
          reqBy: message.author,
          duration: totalinSec,
        }
        if (!serverQueue) {
          const queueConst = {
            textChannel: message.channel,
            voiceChannel: message.member.voice.channel,
            connection: null,
            songs: [],
            volume: 1,
            loop: false,
            playing: true,
            pausedTime: null,
            player: null,
            resource: null
          }
          queue.set(message.guild.id, queueConst);
          queueConst.songs.push(song);
          var connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false,
            bitrate: 384000
          });
          queueConst.connection = connection;
          msg.delete();
          await play(message, queueConst.songs[0])
        } else {
          serverQueue.songs.push(song);
          msg.edit({ content: `**${song.title}** has been added to the queue!\nPosition in queue: **${serverQueue.songs.length}**` })
        }
      }
    } catch (err) {
      console.log(err);
      return message.channel.send(
        `❌ **There was an error while running this command!** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
      );
    }
  }
}
