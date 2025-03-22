const playSchema = require('./../../../database/models/playlistSchema')
const Discord = require('discord.js');
const { ButtonStyle } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
    name: 'playlist',
    /**
     * 
     * @param {Discord.ChatInputCommandInteraction} interactionn
     * @param {Function} play 
     * @param {any} serverQueue
     * @param {Map} queue 
     * @returns 
     */
    async execute(interactionn, play, serverQueue, queue, client) {
        let data = await playSchema.findOne({ userID: interactionn.user.id });
        if (!data) return await interactionn.followUp({ content: "You don't have any playlist.\nUse `createplaylist <name>` to create one now!" });
        const options = data.playlists.map((v, i) => ({
            label: v.name,
            description: `${v.songs.length} song(s)`,
            value: `playlist_${i}`,
            default: false
        }));
        const row = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('select_playlist')
                .setPlaceholder('Choose a playlist')
                .addOptions(options)
        );
        const postRow = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('select_playlist')
                .setPlaceholder('Choose a playlist')
                .addOptions(options)
                .setDisabled(true)
        )
        const buttons = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('play')
                .setLabel('▶ Play')
                .setStyle(ButtonStyle.Primary),
            new Discord.ButtonBuilder()
                .setCustomId('rename')
                .setLabel('✏ Rename Playlist')
                .setStyle(ButtonStyle.Primary),
            new Discord.ButtonBuilder()
                .setCustomId('delete')
                .setLabel('❌ Delete Playlist')
                .setStyle(ButtonStyle.Danger),
        )
        const newButtons = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('play')
                .setLabel('▶ Play')
                .setStyle(ButtonStyle.Success)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('rename')
                .setLabel('✏ Rename Playlist')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('delete')
                .setLabel('❌ Delete Playlist')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
        )
        const newButtons2 = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('play')
                .setLabel('▶ Play')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('rename')
                .setLabel('✏ Rename Playlist')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('delete')
                .setLabel('❌ Delete Playlist')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true)
        )
        const newButtons3 = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('play')
                .setLabel('▶ Play')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('rename')
                .setLabel('✏ Rename Playlist')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('delete')
                .setLabel('❌ Delete Playlist')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
        )
        const newButtons4 = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('play')
                .setLabel('▶ Play')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('rename')
                .setLabel('✏ Rename Playlist')
                .setStyle(ButtonStyle.Success)
                .setDisabled(true),
            new Discord.ButtonBuilder()
                .setCustomId('delete')
                .setLabel('❌ Delete Playlist')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
        )
        let plMsg = await interactionn.followUp({ content: '🎵 **Select a playlist from below-**', components: [row] })
        const collector = plMsg.createMessageComponentCollector({
            time: 30000
        });
        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== interactionn.user.id) return await interaction.reply({content: 'This message is not for you!', flags: Discord.MessageFlags.Ephemeral });
            const index = parseInt(interaction.values[0].split('_')[1]);
            const selectedPl = data.playlists[index];
            if (selectedPl.songs.length <= 0) return interaction.reply({ content: ':warning: That playlist has no songs in it!\nUse `addtoplaylist` to add songs to your playlist.' }) && plMsg.edit({ components: [postRow] })
            collector.stop();
            await interaction.reply({content: `Selected **${selectedPl.name}**`})
            plMsg.edit({ components: [postRow] });
            const embed = new Discord.EmbedBuilder()
                .setTitle(`🎵 ${selectedPl.name}`)
                .setDescription(selectedPl.songs.map((v, i) => `**${i + 1}.** [${v.title}](${v.url})`).join('\n'))
                .setColor('Random')
                .setFooter({text: `${interactionn.user.globalName}'s playlist`, iconURL: interaction.user.displayAvatarURL()})
            const selectionMsg = await interactionn.channel.send({ embeds: [embed], components: [buttons] });
            const buttonCollector = selectionMsg.createMessageComponentCollector({
                time: 30000
            });

            buttonCollector.on('collect', async (interaction) => {
                if (interaction.user.id !== interactionn.user.id) return await interaction.reply({content: 'This message is not for you!', flags: Discord.MessageFlags.Ephemeral });
                await interaction.deferReply();
                if (interaction.customId === 'play') {
                    await selectionMsg.edit({ embeds: [embed.setColor('Grey')], components: [newButtons] });
                    if (!interactionn.member.voice.channel) return await interaction.followUp({ content: `You need to be in a voice channel!` });
                    const perms = interactionn.member.voice.channel.permissionsFor(client.user);
                    if (!perms.has(Discord.PermissionFlagsBits.Connect)) return await interaction.followUp({ content: `❌ **I don\'t have permission to join ${interactionn.member.voice.channel.name}!**` });
                    if (!perms.has(Discord.PermissionFlagsBits.Speak)) return await interaction.followUp({ content: `❌ **I don't have permission to speak in that channel!**` });
                    const channel = interactionn.member.voice.channel;
                    if (!serverQueue) {
                        const queueConst = {
                            textChannel: interactionn.channel,
                            voiceChannel: interactionn.member.voice.channel,
                            connection: null,
                            songs: [],
                            volume: 1,
                            loop: false,
                            playing: true,
                            player: null,
                            resource: null
                        }
                        selectedPl.songs.forEach(song => queueConst.songs.push(song))
                        queue.set(interactionn.guild.id, queueConst);
                        var connection = joinVoiceChannel({
                            channelId: channel.id,
                            guildId: interactionn.guild.id,
                            adapterCreator: interactionn.guild.voiceAdapterCreator,
                            selfDeaf: true,
                            selfMute: false,
                            bitrate: 384000
                        });
                        queueConst.connection = connection;
                        await interaction.followUp({ content: `Started playing **${selectedPl.name}**!` });
                        await play(interactionn, queueConst.songs[0]);
                    } else {
                        selectedPl.songs.forEach(song => serverQueue.songs.push(song));
                        await interaction.followUp({ content: `Song(s) from **${selectedPl.name}** have been added to the queue!` });
                    }
                }
                if (interaction.customId === 'delete') {
                    await selectionMsg.edit({ embeds: [embed.setColor('Grey')], components: [newButtons2] });
                    if (data.playlists.length === 1) {
                        await playSchema.deleteOne({userID: interactionn.user.id});
                        await interaction.followUp({ content: `:wastebasket: Your playlist **${selectedPl.name}** has been deleted.` });
                        return
                    }
                    await interaction.followUp({ content: `:wastebasket: Your playlist **${selectedPl.name}** has been deleted.` });
                    selectedPl.deleteOne();
                    data.save();
                }
                if (interaction.customId === 'rename') {
                    await selectionMsg.edit({ embeds: [embed.setColor('DarkGrey')], components: [newButtons4] });
                    let msg = await interaction.followUp({ content: 'Type new name for your playlist-' });
                    const filter = (ms) => ms.author.id === interactionn.user.id;
                    const collector = msg.channel.createMessageCollector({
                        filter: filter,
                        time: 15000,
                        max: 1
                    });
                    collector.on('collect', async (mssg) => {
                        if (mssg.content.toLowerCase() === 'cancel') {
                            collector.stop('cancelled');
                            mssg.reply('🚫 Operation cancelled!');
                            return;
                        }
                        if (typeof mssg.content !== 'string') return await interaction.followUp({ content: ':warning: Enter a valid name! (Message Timed out)' });
                        selectedPl.name = mssg.content;
                        data.save();
                        await interaction.followUp({ content: `✅ Playlist name set to - **${selectedPl.name}**` })
                    });
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time' && collected.size === 0) {
                            await interaction.channel.send('⏰ Message timed out.');
                        }
                    });
                }
            });

            buttonCollector.on('end', async (collected) => {
                if (collected.size === 0) {
                    await selectionMsg.edit({ content: "⏰ Message timed out.", components: [newButtons3] });
                    data.save();
                }
            });
        });
        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await plMsg.edit({ content: "⏰ Confirmation timed out.", components: [postRow] });
                data.save();
            }
        });
    }
}