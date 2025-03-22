const { joinVoiceChannel } = require('@discordjs/voice');
const Discord = require('discord.js');
const ytsearch = require('yt-search');

module.exports = {
    name: 'play',
    /**
     * @param {Discord.ChatInputCommandInteraction} interaction 
     * @param {Discord.Client} client 
     * @param {string} args 
     * @param {Object} serverQueue 
     * @param {any} play 
     * @param {Map} queue 
     * @returns 
     */
    async execute(interaction, client, serverQueue, play, queue) {
        try {
            if (!interaction.member.voice.channel) return await interaction.followUp({ content: `You need to be in a voice channel!` , flags: Discord.MessageFlags.Ephemeral });
            const perms = interaction.member.voice.channel.permissionsFor(client.user);
            if (!perms.has(Discord.PermissionFlagsBits.Connect)) return await interaction.followUp({ content: `❌ **I don\'t have permission to join ${interaction.member.voice.channel.name}!**` });
            if (!perms.has(Discord.PermissionFlagsBits.Speak)) return await interaction.followUp({ content: `❌ **I don't have permission to speak in that channel!**` });
            const channel = interaction.member.voice.channel;
            let music = interaction.options.getString('song');
            if (music === 'error') return await interaction.followUp('❌ Error, Invalid song/URL provided!')
            const yo = await ytsearch(music.toString());
            let totalinSec = yo.videos[0].duration.seconds;
            const song = {
                title: yo.videos[0].title,
                url: yo.videos[0].url,
                thumbnail: yo.videos[0].thumbnail,
                startTime: Date.now(),
                reqBy: interaction.user,
                duration: totalinSec,
            }
            if (!serverQueue) {
                const queueConst = {
                    textChannel: interaction.channel,
                    voiceChannel: interaction.member.voice.channel,
                    connection: null,
                    songs: [],
                    volume: 1,
                    loop: false,
                    playing: true,
                    pausedTime: null,
                    player: null,
                    resource: null
                }
                queue.set(interaction.guild.id, queueConst);
                queueConst.songs.push(song);
                var connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                    selfDeaf: true,
                    selfMute: false,
                    bitrate: 384000
                });
                queueConst.connection = connection;
                await play(interaction, queueConst.songs[0])
            } else {
                serverQueue.songs.push(song);
                await interaction.followUp({ content: `**${song.title}** has been added to the queue!\nPosition in queue: **${serverQueue.songs.length}**` })
            }
        } catch (err) {
            console.log(err);
            return await interaction.followUp(
                `❌ **There was an error while running this command!** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
            );
        }
    }
}
