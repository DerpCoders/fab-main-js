const Discord = require('discord.js');
const { ButtonStyle } = require('discord.js');
const playSchema = require('./../../../database/models/playlistSchema');
const ytsearch = require('yt-search');
const { getData } = require('spotify-url-info')(fetch);

module.exports = {
    name: 'addtoplaylist',
    /** 
     * @param {Discord.ChatInputCommandInteraction} interactionn
     * @param {string[]} args 
     */
    async execute(interactionn) {
        try {
            const data = await playSchema.findOne({ userID: interactionn.user.id });
            if (!data) return await interactionn.followUp({ content: "You don't have any playlist.\nUse `createplaylist <name>` to create one now!" });
            const playlistButtons = data.playlists.map((v, i) => ({
                label: v.name,
                description: `${v.songs.length} song(s)`,
                value: `playlist_${i}`,
                default: false
            }));
            const newButtons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`song_0`)
                    .setLabel('1')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_1`)
                    .setLabel('2')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_2`)
                    .setLabel('3')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_3`)
                    .setLabel('4')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_4`)
                    .setLabel('5')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
            )
            const newButtons1 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`song_0`)
                    .setLabel('1')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_1`)
                    .setLabel('2')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_2`)
                    .setLabel('3')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_3`)
                    .setLabel('4')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_4`)
                    .setLabel('5')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
            )
            const newButtons2 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`song_0`)
                    .setLabel('1')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_1`)
                    .setLabel('2')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_2`)
                    .setLabel('3')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_3`)
                    .setLabel('4')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_4`)
                    .setLabel('5')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
            )
            const newButtons3 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`song_0`)
                    .setLabel('1')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_1`)
                    .setLabel('2')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_2`)
                    .setLabel('3')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_3`)
                    .setLabel('4')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_4`)
                    .setLabel('5')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
            )
            const newButtons4 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`song_0`)
                    .setLabel('1')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_1`)
                    .setLabel('2')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_2`)
                    .setLabel('3')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_3`)
                    .setLabel('4')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_4`)
                    .setLabel('5')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
            )
            const newButtons5 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`song_0`)
                    .setLabel('1')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_1`)
                    .setLabel('2')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_2`)
                    .setLabel('3')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_3`)
                    .setLabel('4')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId(`song_4`)
                    .setLabel('5')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
            )

            const row = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('select_playlist')
                    .setPlaceholder('Choose a playlist')
                    .addOptions(playlistButtons)
            );
            const postRow = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('select_playlist')
                    .setPlaceholder('Choose a playlist')
                    .addOptions(playlistButtons)
                    .setDisabled(true)
            )
            let plMsg = await interactionn.followUp({ content: '🎵 **Select a playlist from below-**', components: [row] })
            const playCollector = plMsg.createMessageComponentCollector({
                time: 30000,
            });
            playCollector.on('collect', async (interaction) => {
                if (interaction.user.id !== interactionn.user.id) return await interaction.reply({content: 'This message is not for you!', flags: Discord.MessageFlags.Ephemeral });
                const index = parseInt(interaction.values[0].split('_')[1])
                const selectedPl = data.playlists[index];
                if (selectedPl.songs.length >= 10) return interaction.reply({ content: ':warning: That playlist already has max no. of songs!' }) && plMsg.edit({ components: [postRow] })
                await interaction.reply(`Selected **${selectedPl.name}**. Now type a song name/url-`);
                playCollector.stop();
                plMsg.edit({ components: [postRow] })
                const songCollector = interaction.channel.createMessageCollector({
                    filter: (i) => i.author.id === interactionn.user.id,
                    time: 30000
                });
                songCollector.on('collect', async (msg) => {
                    if (msg.content.toLowerCase() === 'cancel') {
                        songCollector.stop();
                        return await interaction.channel.send("Canceled.");
                    }
                    let toSearch = msg.content;
                    if (msg.content.toLowerCase().includes('spotify.com/playlist')) {
                        let msgg = await interaction.channel.send("*Fetching data from spotify...*");
                        try {
                            const dat = await getData(msg.content);
                            if (!dat || typeof dat !== "object" || JSON.stringify(dat).includes("<!DOCTYPE html")) {
                                return interaction.channel.send(":x: This Spotify playlist is either private, invalid, or requires authentication.");
                            }
                            const remainingSlots = 10 - selectedPl.songs.length;
                            const newData = dat.trackList.slice(0, remainingSlots);
                            for (const track of newData) {
                                let search = await ytsearch(`${track.title} ${track.subtitle}`);
                                let selectedSong = search.videos[0];
                                let totalInSec = selectedSong.duration.seconds;

                                const song = {
                                    title: selectedSong.title,
                                    url: selectedSong.url,
                                    thumbnail: selectedSong.thumbnail,
                                    startTime: Date.now(),
                                    reqBy: {
                                        id: interactionn.user.id,
                                        username: interactionn.user.username,
                                        avatar: interactionn.user.avatar,
                                    },
                                    duration: totalInSec,
                                };

                                selectedPl.songs.push(song);
                            }
                            data.markModified('playlists');
                            await data.save();
                            return await interaction.channel.send(
                                `Added **${newData.length}** song(s) from your playlist **${dat.name}**. ${newData.length < dat.trackList.length ? "Some songs couldn't be added due to the 10-song limit." : ""
                                }`
                            ) && msgg.delete();
                        } catch (err) {
                            console.log(err);
                            return await interaction.channel.send(
                                `❌ **Error: Please make sure the provided playlist was public and accessible.** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
                            );
                        }
                    }
                    else if (msg.content.toLowerCase().includes('spotify.com/track')) {
                        let sData = await getData(msg.content);
                        toSearch = `${sData.name} ${sData.artists[0].name}`
                    }
                    const search = await ytsearch(toSearch);
                    if (!search.videos.length) {
                        return await interaction.channel.send("No results found.");
                    }
                    let searchResult = search.videos.slice(0, 5)
                    const embed = new Discord.EmbedBuilder()
                        .setTitle(`Choose a song for - **${selectedPl.name}**`)
                        .setDescription(searchResult.map((v, i) => `**${i + 1}.** [${v.title}](${v.url})\nChannel- ${v.author.name}`).join('\n\n'))
                        .setThumbnail('https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png')
                        .setColor('Red')
                        .setTimestamp()
                    const songButtons = searchResult.map((v, i) => {
                        return new Discord.ButtonBuilder()
                            .setCustomId(`song_${i}`)
                            .setLabel(`${i + 1}`)
                            .setStyle(ButtonStyle.Primary)
                    });
                    const songRow = new Discord.ActionRowBuilder().addComponents(songButtons);
                    const songSelectionMsg = await msg.channel.send({ embeds: [embed], components: [songRow] });
                    const buttonCollector = songSelectionMsg.createMessageComponentCollector({
                        time: 30000,
                        max: 1
                    });
                    buttonCollector.on('collect', async (interaction) => {
                        if (interaction.user.id !== interactionn.user.id) return await interaction.followUp({content: 'This message is not for you!', flags: Discord.MessageFlags.Ephemeral });
                        await interaction.deferReply();
                        const selectedIndex = parseInt(interaction.customId.split('_')[1]);
                        const selectedSong = searchResult[selectedIndex];
                        let totalinSec = selectedSong.duration.seconds;
                        const song = {
                            title: selectedSong.title,
                            url: selectedSong.url,
                            thumbnail: selectedSong.thumbnail,
                            startTime: Date.now(),
                            reqBy: interactionn.user,
                            duration: totalinSec,
                        }
                        selectedPl.songs.push(song)
                        data.save();
                        if (selectedIndex == 0) {
                            await interaction.followUp({ content: `Added **${selectedSong.title}** to ${selectedPl.name}` })
                            await songSelectionMsg.edit({ components: [newButtons] })
                        } else if (selectedIndex == 1) {
                            await interaction.followUp({ content: `Added **${selectedSong.title}** to ${selectedPl.name}` })
                            await songSelectionMsg.edit({ components: [newButtons1] })
                        } else if (selectedIndex == 2) {
                            await interaction.followUp({ content: `Added **${selectedSong.title}** to ${selectedPl.name}` })
                            await songSelectionMsg.edit({ components: [newButtons2] })
                        } else if (selectedIndex == 3) {
                            await interaction.followUp({ content: `Added **${selectedSong.title}** to ${selectedPl.name}` })
                            await songSelectionMsg.edit({ components: [newButtons3] })
                        } else if (selectedIndex == 4) {
                            await interaction.followUp({ content: `Added **${selectedSong.title}** to ${selectedPl.name}` })
                            await songSelectionMsg.edit({ components: [newButtons4] })
                        }
                    });
                    buttonCollector.on('end', async (collected) => {
                        if (collected.size === 0) {
                            await songSelectionMsg.edit({ content: "⏰ Confirmation timed out.", components: [newButtons5] });
                            data.save();
                        }
                    });
                });
                songCollector.on('end', async (collected, reason) => {
                    if (reason === 'time' && collected.size === 0) {
                        await interaction.channel.send('⏰ Confirmation timed out.');
                    }
                    data.save();
                })
            });
            playCollector.on('end', async (collected) => {
                if (collected.size === 0) {
                    await plMsg.edit({ content: "⏰ Confirmation timed out.", components: [postRow] });
                    data.save();
                }
            });
        } catch (err) {
            console.log(err);
            return await interactionn.followUp(
                `❌ **There was an error while running this command!** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
            );
        }
    }
}