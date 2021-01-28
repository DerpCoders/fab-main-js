const Discord = require("discord.js");

module.exports = {
  name: "dmhelp",
  execute(message) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Commands, Default Prefix is ` ")
      .setDescription(
        "\n\n**⛔ MODERATION-**\n`ban`, `softban`, `kick`, `poll`, `clear`, `warn`, `bcount`, `serverinfo`, `userinfo`, `settings`\n\n**🏃 FUN-**\n `npm`, `youtube`, `gis`, `news`, `joke`, `advice`, `kpop`, `kiss`, `punch`, `pat`, `slap`, `kill`, `spank`, `poke`, `hug`, `avatar`\n\n**💎 Leveling- **\n`rank`, `leaderboard`\n\n**🏓 Games- **\n`battle`, `ispy` \n\n**🎶 Music-**\n`play`, `stop`, `queue`, `volume`, `remove`, `now-playing`, `lyrics`, `skip`, `pause`, `resume`\n\n**📷 Images/Gifs- **\n`meme`, `blur`, `gay`, `delete`, `anime`, `jail`, `trigger`\n\n**⚙ Server settings-**\n`setprefix`, `setlogs`, `setlevelup`, `set-welcome`,`enablelevels`, `disable-welcome`, `disablelogs`, `disablelevels`, `disablelevelup`\n\n**😏 NSFW- **\n`pussy`, `cumsluts`, `hentai`\n\n**🛠 Utility-**\n`ping`, `stats`, `uptime`, `guildcount`, `owner`, `invite`\n\n**NOTE: If you want to disable any commands or messages for your server (because we don't have a database yet) - [Join our support](https://discord.gg/r2sqEsV) or DM to \`Hey Fab, I'mma kill you#0640\`**\n\n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=339078271&scope=bot%20applications.commands) \n [Join our Support server](https://discord.gg/r2sqEsV)\n\nUse `help <command> for more info about a command"
      )
      .setTimestamp()
      .setFooter("Commands are still being added")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/624080970731094016/760842758423707678/oie_6twFRGwWX7oC.jpg"
      );
    message.channel.send(exampleEmbed) &&
      message.channel.send("Join if you still need help - discord.gg/r2sqEsV")
}
}
