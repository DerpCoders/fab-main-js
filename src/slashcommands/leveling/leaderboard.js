const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');
const Levels = require('discord-xp')
const Discord = require('discord.js');
const canvacord = require('canvacord')
require('canvacord').Font.loadDefault();

module.exports = {
    name: 'leaderboard',
    /**
     * @param {Discord.Interaction} interaction
     * @param {Discord.Client} client  
     */
    async execute(interaction, client) {
        try {
            const settings = await levelSchema.findOne({
                guildID: interaction.guild.id,
            });
            if (!settings) {
                const newData = new levelSchema({
                    guildID: interaction.guild.id,
                    guildName: interaction.guild.name,
                    disabled: false
                })
                newData.save();
            }
            if (settings.disabled) return interaction.followUp({content: ':warning: Leveling system is disabled in this server!', flags: Discord.MessageFlags.Ephemeral })
            const rawLead = await Levels.fetchLeaderboard(interaction.guild.id, 7);
            if (rawLead.length < 1)
                return await interaction.followUp({ content: "Nobody's in leaderboard yet!" });
            const leaderboard = await Levels.computeLeaderboard(
                client,
                rawLead,
                true
            );
            const format = interaction.options.getString('format')
            if (format === 'image') {
                let arr = [];
                leaderboard.forEach(e => {
                    let dn = interaction.guild.members.cache.get(e.userID);
                    if (!dn) dn = e.username;
                    else dn = dn.displayName;
                    arr.push(
                        {
                            avatar: client.users.cache.get(e.userID).displayAvatarURL({ forceStatic: true, extension: 'png' }),
                            level: e.level,
                            rank: e.position,
                            username: e.username,
                            displayName: dn,
                            xp: e.xp
                        }
                    )
                });
                const card = new canvacord.LeaderboardBuilder()
                    .setHeader({
                        title: interaction.guild.name,
                        image: interaction.guild.iconURL({ forceStatic: true, extension: 'png' }),
                        subtitle: `${interaction.guild.members.cache.size} members`
                    })
                    .setPlayers(arr)
                    .setBackground("https://i.pinimg.com/736x/7e/c2/7e/7ec27eb533cbe3fcc36eb03e2b91a0ed.jpg")
                    .adjustCanvas()
                card.setVariant('default')

                const image = await card.build({ format: "png" })

                await interaction.followUp({ files: [image] })
            } else if (format === 'embed') {
                let no1user = leaderboard.find(e => e.position == 1)
                const idof1 = no1user.userID;
                let find1 = interaction.guild.members.cache.find(meee => meee.user.id === idof1);
                const lb = leaderboard.map(
                    (e) =>
                        `**${e.position}. ${e.username}**Level: ${e.level
                        }\nXP: ${e.xp.toLocaleString()}`
                );
                const embed = new Discord.EmbedBuilder()
                    .setTitle(`🏆 Leaderboard - ${interaction.guild.name}`)
                    .setDescription(`${lb.join("\n\n")}`)
                    .setTimestamp()
                    .setColor(find1.displayHexColor || 'GREEN')
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setFooter({ text: 'Top 7 members in this server' })
                await interaction.followUp({ embeds: [embed] })
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'An error occured while running this cmd.', flags: Discord.MessageFlags.Ephemeral })
        }
    }
}