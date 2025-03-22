const cmdsArray = [`ban`, `softban`, `kick`, `mute`, `tempmute`, `poll`, `spam`, `clear`, `warn`, `fetchwarns`, `clearwarns`, `serverinfo`, `userinfo`, `settings`, `npm`, `youtube`, `gis`, `instagram`, `news`, `discrim`, `kiss`, `punch`, `pat`, `slap`, `cuddle`, `kill`, `spank`, `createplaylist`,`addtoplaylist`,`tictactoe`, `playlist`, `gaymeter`, `pp`, `poke`, `hug`, `avatar`, `rank`, `leaderboard`, `battle`, `ispy`, `play`, `stop`, `queue`, `volume`, `remove`, `now-playing`, `lyrics`, `skip`, `pause`, `resume`, `loop`, `shuffle`, `meme`, `blur`, `gay`, `delete`, `anime`, `jail`, `trigger`, `setprefix`, `setlogs`, `setlevelup`, `set-welcome`, `enablelevels`, `disable-welcome`, `disablelogs`, `disablelevels`, `disablelevelup`, `pussy`, `cumsluts`, `hentai`, `ping`, `stats`, `afk`, `uptime`];
const mongoose = require("mongoose");
const cmdschema = require('../../../database/models/cmdSchema');
const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'enablecmd', async execute(message, args, client) {
        let cmd = args[0];
        if (!cmd) return message.channel.send({content: ":warning: **Please provide a command to enable!**"})
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({content: '❌ **You are missing `ADMINISTRATOR` permissions!**'});
        if (!cmdsArray.includes(cmd.toLowerCase())) return message.channel.send({content: '⚠️ **That commands does not exists!**'});
        await cmdschema.findOne({ guildID: message.guild.id }).then(async (data) => {
            if (data) {
                if (!data.commands.includes(cmd.toLowerCase())) return message.channel.send({content: `\`${cmd}\` is already enabled!`});
                for (let i = 0; i < data.commands.length; i++) {
                    if (data.commands[i] === cmd) data.commands.splice(i, 1);
                }
                await data.save();
                message.channel.send({content: `✅ \`${cmd}\` command enabled!`});
            } else return message.channel.send({content: 'All commands are enabled by default'});
        });
    }
}