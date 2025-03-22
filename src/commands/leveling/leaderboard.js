const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');
const Levels = require('discord-xp')
const Discord = require('discord.js');
const { ButtonStyle } = require('discord.js')
const canvacord = require('canvacord')
require('canvacord').Font.loadDefault();

module.exports = {
  name: 'leaderboard',
  /**
   * @param {Discord.Message} message 
   * @param {Discord.Client} client  
   */ 
  async execute(message, client) {
    const settings = await levelSchema.findOne({
      guildID: message.guild.id,
    });
    if (!settings) {
      const newData = new levelSchema({
        guildID: message.guild.id,
        guildName: message.guild.name,
        disabled: false
      })
      newData.save();
    }
    if (settings.disabled) return;
    const rawLead = await Levels.fetchLeaderboard(message.guild.id, 7);
    if (rawLead.length < 1)
      return message.channel.send({ content: "Nobody's in leaderboard yet!" });
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLead,
      true
    );
    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("Image")
          .setLabel("Image")
          .setStyle(ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId('embed')
          .setLabel("Embed")
          .setStyle(ButtonStyle.Primary)
      )
    const postrow = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("Image")
          .setLabel("Image")
          .setDisabled(true)
          .setStyle(ButtonStyle.Success),
        new Discord.ButtonBuilder()
          .setCustomId('embed')
          .setLabel("Embed")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      )
    const postrow1 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("Image")
          .setLabel("Image")
          .setDisabled(true)
          .setStyle(ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('embed')
          .setLabel("Embed")
          .setStyle(ButtonStyle.Success)
          .setDisabled(true)
      )
    const postrow2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("Image")
          .setLabel("Image")
          .setDisabled(true)
          .setStyle(ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId('embed')
          .setLabel("Embed")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      )
    const msg = await message.channel.send({ content: "📊 **Choose leaderboard type:**", components: [row] });

    const collector = msg.createMessageComponentCollector({
      time: 15000
    });

    collector.on('collect', async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        return await interaction.reply({content: 'This message is not for you!', flags: Discord.MessageFlags.Ephemeral });
      }
      await interaction.deferReply();
      if (interaction.customId === 'Image') {
        let arr = [];
        leaderboard.forEach(e => {
          let dn = message.guild.members.cache.get(e.userID);
          if (!dn) dn = e.username;
          else dn = dn.displayName;
          arr.push(
            {
              avatar: client.users.cache.get(e.userID).displayAvatarURL({forceStatic: true, extension: 'png'}),
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
            title: message.guild.name,
            image: message.guild.iconURL({forceStatic: true, extension: 'png'}),
            subtitle: `${message.guild.members.cache.size} members`
          })
          .setPlayers(arr)
          .setBackground("https://i.pinimg.com/736x/7e/c2/7e/7ec27eb533cbe3fcc36eb03e2b91a0ed.jpg")
          .adjustCanvas()
        card.setVariant('default')

        const image = await card.build({ format: "png" })

        await interaction.followUp({ files: [image] })
        await msg.edit({ components: [postrow] })
      } else if (interaction.customId === 'embed') {
        let no1user = leaderboard.find(e => e.position == 1)
        const idof1 = no1user.userID;
        let find1 = message.guild.members.cache.find(meee => meee.user.id === idof1);
        const lb = leaderboard.map(
          (e) =>
            `**${e.position}. ${e.username}**Level: ${e.level
            }\nXP: ${e.xp.toLocaleString()}`
        );
        const embed = new Discord.EmbedBuilder()
          .setTitle(`🏆 Leaderboard - ${message.guild.name}`)
          .setDescription(`${lb.join("\n\n")}`)
          .setTimestamp()
          .setColor(find1.displayHexColor || 'GREEN')
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setFooter({text: 'Top 7 members in this server'})
        await interaction.followUp({ embeds: [embed] })
        await msg.edit({ components: [postrow1] })
      }
    });

    collector.on('end', async (collected) => {
      if (collected.size === 0) {
        await msg.edit({ content: "⏰ Confirmation timed out.", components: [postrow2] })
      }
    });
  }
}