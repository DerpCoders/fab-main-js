const Discord = require("discord.js");

module.exports = {
  name: "help",
  /**
   * @param {Discord.ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const exampleEmbed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setTitle("Commands, Default Prefix is ` ")
      .setDescription(
        "\n\n**⛔ MODERATION-**\n`ban`, `softban`, `kick`, `mute`, `tempmute`, `poll`, `clear`, `warn`, `fetchwarns`, `clearwarns`, `serverinfo`, `userinfo`, `settings`, `clearafk`\n\n**🏃 FUN-**\n `npm`, `youtube`, `gis`, `instagram`, `news`, `discrim`, `kiss`, `feed`, `punch`, `pat`, `slap`, `cuddle`, `kill`, `spank`, `gaymeter`, `pp` `poke`, `hug`, `avatar`\n\n**💎 Leveling- **\n`rank`, `leaderboard`\n\n**🏓 Games- **\n`battle`, `ispy`, `tictactoe`\n\n**🎶 Music-**\n`play`, `stop`, `queue`, `volume`, `remove`, `now-playing`, `lyrics`, `skip`, `pause`, `resume`, `loop`, `shuffle`, `createplaylist`, `addtoplaylist`, `playlist`\n\n**📷 Images/Gifs- **\n`meme`, `blur`, `gay`, `delete`, `anime`, `jail`, `trigger`\n\n**⚙ Server settings-**\n`setprefix`, `setlogs`, `setlevelup`, `set-welcome`,`enablelevels`, `disablecmd`, `enablecmd`, `disable-welcome`, `disablelogs`, `disablelevels`, `disablelevelup`\n\n**🛠 Utility-**\n`ping`, `stats`, `afk`, `uptime`\n\n - [Join our support server](https://discord.gg/astromk) or DM to \`papaemeritus.4\`\n\n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=70528110&scope=bot%20applications.commands)\n\nUse `help <command> for more info about a command"
      )
      .setTimestamp()
      .setFooter({ text: "Commands are still being added" })
      .setThumbnail(
        "https://cdn.discordapp.com/icons/729340392327217193/30232e21b6efa0e86b0b107b56f0af71.png?size=2048"
      );
    interaction.user.send({ embeds: [exampleEmbed] }) &&
      interaction.user.send({ content: "Join if you still need help - discord.gg/astromk" })
        .catch((err) => {
          return (
            interaction.channel.send({ content: "**You have DMs turned off!**" }) &&
            console.log(err)
          );
        });
    await interaction.reply({content: '✅ Check your DMs', flags: Discord.MessageFlags.Ephemeral })
  },
};
