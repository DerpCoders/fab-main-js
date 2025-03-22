const cmdsArray = [`ban`, `softban`, `kick`, `mute`, `tempmute`, `poll`, `spam`, `clear`, `warn`, `fetchwarns`, `clearwarns`, `serverinfo`, `userinfo`, `settings`, `npm`, `youtube`, `gis`, `instagram`, `news`, `discrim`, `kiss`, `punch`, `pat`, `slap`, `cuddle`, `kill`, `spank`, `createplaylist`, `addtoplaylist`, `tictactoe`, `playlist`, `gaymeter`, `pp`, `poke`, `hug`, `avatar`, `rank`, `leaderboard`, `battle`, `ispy`, `play`, `stop`, `queue`, `volume`, `remove`, `now-playing`, `lyrics`, `skip`, `pause`, `resume`, `loop`, `shuffle`, `meme`, `blur`, `gay`, `delete`, `anime`, `jail`, `trigger`, `setprefix`, `setlogs`, `setlevelup`, `set-welcome`, `enablelevels`, `disable-welcome`, `disablelogs`, `disablelevels`, `disablelevelup`, `ping`, `stats`, `afk`, `uptime`];
const mongoose = require("mongoose");
const cmdschema = require('../../../database/models/cmdSchema');
const Discord = require('discord.js')

module.exports = {
  name: 'disablecmd',
  cmds: cmdsArray,
  /**
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @param {Discord.Client} client 
   * @param {Array} cmdSettings 
   * @returns 
   */
  async execute(message, args, client) {
    let cmd = args[0];
    if (!cmd) return message.channel.send({ content: ":warning: **Please provide a command to disable!**" })
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: '❌ **You are missing `ADMINISTRATOR` permissions!**' });
    if (!cmdsArray.includes(cmd.toLowerCase())) return message.channel.send({ content: '⚠️ **That commands does not exists!**' });
    let data = await cmdschema.findOne({ guildID: message.guild.id });
    if (data) {
      if (data.commands.includes(cmd)) return message.channel.send({ content: 'That command is already disabled!' });
      data.commands.push(cmd);
      data.save();
      message.channel.send({ content: `\`${cmd}\` command is now disabled!` });
    } else {
      let newData = new cmdschema({
        guildID: message.guild.id,
        commands: cmd
      });
      await newData.save();
      message.channel.send({ content: `\`${cmd}\` command is now disabled!` });
    }
  }
}