const canvacord = require('canvacord')
require('canvacord').Font.loadDefault()
const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');
const Levels = require('discord-xp');
const Discord = require('discord.js');

module.exports = {
  name: 'rank', 
  /**
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @param {Discord.Client} client 
   */
  async execute(message, args, client) {
    try {
      const settigs = await levelSchema.findOne({
        guildID: message.guild.id,
      });
      if (!settigs) {
        const newData = new levelSchema({
          guildID: message.guild.id,
          guildName: message.guild.name,
          disabled: false
        })
        newData.save();
      }
      if (settigs.disabled) return;
      let target;
      if (message.mentions.users.last()) {
        target = message.mentions.users.last();
      }
      else if (args[0]) {
        target = message.guild.members.cache.get(args[0]).user;
      }
      else {
        target = message.author;
      }
      if (target.bot) return message.channel.send({ content: "Bots cannot earn XP!" });
      const user = await Levels.fetch(target.id, message.guild.id);
      const neededxp = await Levels.xpFor(parseInt(user.level) + 1);
      if (!user.level)
        return message.channel.send(
          "Seems like this user has not earned any xp so far."
        );
      if (!user)
        return message.channel.send(
          "Seems like this user has not earned any xp so far."
        );
      const msg = await message.channel.send({ content: "*Generating...*" })
      const rawLead = await Levels.fetchLeaderboard(message.guild.id, 50);
      const leaderboard = await Levels.computeLeaderboard(
        client,
        rawLead,
        true
      );
      let status;
      if (message.guild.members.cache.get(target.id).presence == null) {
        status = "offline"
      } else {
        status = message.guild.members.cache.get(target.id).presence.status
      }
      const userrank = leaderboard.find((uss) => uss.userID === target.id);
      const ran = userrank.position;
      const rank = new canvacord.RankCardBuilder()
        .setAvatar(target.displayAvatarURL({ extension: "png", forceStatic: true }))
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRank(ran)
        .setBackground(
          "https://i1.wp.com/thefriendlyserver.phokxx.com/wp-content/uploads/2021/08/Discord-Banner-Competition-5-SophUnicornDust.jpg?resize=1140%2C481&ssl=1"
        )
        .setRequiredXP(neededxp)
        .setStatus(status)
        .setDisplayName(target.displayName?? target.globalName)
      await rank.build().then((data) => {
        const attachment = new Discord.AttachmentBuilder(data, {name:"card.png"});
        msg.edit({ content: null, files: [attachment] });
      });
    } catch (err) {
      console.log(err);
      return message.channel.send({ content: `❌ **Unable to find that user!**` })
    }
  }
}
