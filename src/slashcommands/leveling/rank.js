const canvacord = require('canvacord')
require('canvacord').Font.loadDefault()
const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');
const Levels = require('discord-xp');
const Discord = require('discord.js');

module.exports = {
  name: 'rank', 
  /**
   * @param {Discord.ChatInputCommandInteraction} interaction
   * @param {string[]} args 
   * @param {Discord.Client} client 
   */
  async execute(interaction, targetUser, client) {
    try {
      const settigs = await levelSchema.findOne({
        guildID: interaction.guild.id,
      });
      if (!settigs) {
        const newData = new levelSchema({
          guildID: interaction.guild.id,
          guildName: interaction.guild.name,
          disabled: false
        })
        newData.save();
      }
      if (settigs.disabled) return interaction.followUp({content: ':warning: Leveling system is disabled in this server!', flags: Discord.MessageFlags.Ephemeral })
      if (targetUser.bot) return await interaction.followUp({ content: "Bots cannot earn XP!" });
      const user = await Levels.fetch(targetUser.id, interaction.guild.id);
      const neededxp = await Levels.xpFor(parseInt(user.level) + 1);
      if (!user.level)
        return await interaction.followUp(
          "Seems like this user has not earned enough XP for rank card."
        );
      if (!user)
        return await interaction.followUp(
          "Seems like this user has not earned any xp so far."
        );
      const rawLead = await Levels.fetchLeaderboard(interaction.guild.id, 50);
      const leaderboard = await Levels.computeLeaderboard(
        client,
        rawLead,
        true
      );
      let status;
      if (interaction.guild.members.cache.get(targetUser.id).presence == null) {
        status = "offline"
      } else {
        status = interaction.guild.members.cache.get(targetUser.id).presence.status
      }
      const userrank = leaderboard.find((uss) => uss.userID === targetUser.id);
      const ran = userrank.position;
      const rank = new canvacord.RankCardBuilder()
        .setAvatar(targetUser.displayAvatarURL({ extension: "png", forceStatic: true }))
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRank(ran)
        .setBackground(
          "https://i1.wp.com/thefriendlyserver.phokxx.com/wp-content/uploads/2021/08/Discord-Banner-Competition-5-SophUnicornDust.jpg?resize=1140%2C481&ssl=1"
        )
        .setRequiredXP(neededxp)
        .setStatus(status)
        .setDisplayName(targetUser.displayName?? targetUser.globalName)
      await rank.build().then(async (data) => {
        const attachment = new Discord.AttachmentBuilder(data, {name:"card.png"});
        await interaction.followUp({ files: [attachment] });
      });
    } catch (err) {
      console.log(err);
      return await interaction.followUp({ content: `❌ **Unable to find that user!**` })
    }
  }
}