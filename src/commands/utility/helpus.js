const Discord = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: 'help us',
  async execute(message, client, prefix) {
    let currentPage = 0;

    function createRow(currentPage) {
      return new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setLabel('<<')
          .setCustomId('first')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === 0),
        new Discord.ButtonBuilder()
          .setCustomId('prev')
          .setLabel('<')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === 0),
        new Discord.ButtonBuilder()
          .setCustomId('next')
          .setLabel('>')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === 8),
        new Discord.ButtonBuilder()
          .setCustomId('last')
          .setLabel('>>')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currentPage === 8)
      );
    }

    // Embed definitions (unchanged)
    const startup = new Discord.EmbedBuilder()
      .setColor('Random')
      .setDescription(`React to ◀ and ▶ to change pages\n\n**Commands are still being added**\n\nUse \`${prefix}help<command>\` for more info about a command.\n\n[Invite](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=70528110&scope=bot%20applications.commands) [Join our support server](https://discord.gg/astromk)\n\nPages - \n **Page 2:** ⛔ Moderation\n**Page 3:** 🏃‍♀️ Fun\n**Page 4:** 💎 Leveling system\n**Page 5:** 🏓 Games\n**Page 6:** 🎶 Music\n**Page 7:** 📷 Images/Gifs\n**Page 8:** ⚙ Server settings\n**Page 9:** 🛠 Utility`)
      .setTitle(`Commands, prefix is ${prefix}`)
      .setThumbnail(client.user.displayAvatarURL());

    const mod = new Discord.EmbedBuilder()
      .setTitle('⛔ Moderation -')
      .setThumbnail('https://i.imgur.com/O3DHIA5.gif?noredirect')
      .addFields(
        { name: 'ban', value: `\`ban\` command is used for banning any guild member with a DM to the member banned (Reason is optional)`, inline: true },
        { name: 'softban', value: `\`softban\` command is used for banning any member but that member is not banned from the guild. He/she can\'t send any messages.`, inline: true },
        { name: 'kick', value: "`kick` command is used for kicking any guild member with a DM to the member banned (Reason is optional)", inline: true },
        { name: 'mute', value: '`mute` command mutes a member without any duration, only a moderator can unmute that member.', inline: true },
        { name: 'tempmute', value: '`tempmute` command temporarily mutes a member for a specific time that is provided, **NOTE:** If a member is muted temporarily you can\'t unmute them manually!', inline: true },
        { name: 'poll', value: "`poll` command is used to create polls with reactions YES, NO or OTHER.", inline: true },
        { name: 'clear', value: "`clear` command is used for deleting multiple messages at a time.", inline: true },
        { name: 'warn', value: '`warn` command is used for warning any member with reason, Fab will DM that member with reason and moderator name.', inline: true },
        { name: 'fetchwarns', value: '`fetchwarns` command will fetch warns for mentioned member with reason and moderator name.', inline: true },
        { name: 'clearwarns', value: '`clearwarns` command is used for clearing warns for mention user.', inline: true },
        { name: 'serverinfo', value: "`serverinfo` command will send a neat embed with all information about a guild.", inline: true },
        { name: 'userinfo', value: "`userinfo` command is used for getting detailed info about a member/user in a neat embed.", inline: true },
        { name: 'settings', value: '`settings` command will send an embed with details/settings of your server, for example Logs channel, welcome channel, etc.', inline: true },
        { name: 'clearafk', value: '`clearafk` command removes AFK status from the mentioned member.', inline: true }
      )
      .setDescription(`**For more info about a command type ${prefix}help<command> **`)
      .setColor('Red');

    const cl = require('nekos.life');
    const nekos = new cl();
    const image = await nekos.slap();

    const fun = new Discord.EmbedBuilder()
      .setTitle('🏃‍♀️ Fun-')
      .setThumbnail(image.url)
      .addFields(
        { name: 'npm', value: '`npm` command is used for searching packages through NPM website.', inline: true },
        { name: 'youtube', value: "`youtube` or `yt` command will send a youtube link based on your arguments.", inline: true },
        { name: 'gis', value: "`gis` stands for *Google Image Search* that uses Google's API to search for images.", inline: true },
        { name: 'instagram', value: '`instagram` command fetches an Instagram User with basic details.', inline: true },
        { name: 'news', value: '`news` command sends a random latest news from reddit.', inline: true },
        { name: 'discrim', value: '`discrim` command will search for same discriminator of your or mentioned user and send a list in embed.', inline: true },
        { name: 'kiss', value: '`kiss` command sends a random kiss gif!', inline: true },
        { name: 'feed', value: '`feed` command sends random anime feed gif!', inline: true },
        { name: 'punch', value: '`punch` command sends a random punch gif!', inline: true },
        { name: 'pat', value: '`pat` command sends a random pat gif!', inline: true },
        { name: 'slap', value: '`slap` command sends a random slap gif!', inline: true },
        { name: 'cuddle', value: '`cuddle` command sends a random cuddle gif!', inline: true },
        { name: 'spank', value: '`spank` command sends a random spank gif (BUT NOT NSFW)!', inline: true },
        { name: 'gaymeter', value: '`gaymeter` tells that how gay you or mentioned member is! xd', inline: true },
        { name: 'pp', value: '`pp` command tells your pp size lol', inline: true },
        { name: 'poke', value: '`poke` command sends a random poke gif!', inline: true },
        { name: 'hug', value: '`hug` command sends a random hug gif!', inline: true },
        { name: 'avatar', value: '`avatar` command sends avatar of mentioned user or the message author', inline: true },
      )
      .setDescription(`**For more info about a command type ${prefix}help<command> **`)
      .setColor('Blue');

    const level = new Discord.EmbedBuilder()
      .setTitle('💎 Leveling system-')
      .setColor('Green')
      .addFields(
        { name: 'rank', value: '`rank` command sends your rank card with XP and Level!', inline: true },
        { name: 'leaderboard', value: '`leaderboard` command sends leaderboard of top 5 members in the guild!', inline: true },
        { name: 'lb', value: '`lb` command tells your or mentioned members\'s position on leaderboard for your server!', inline: true },
      )
      .setDescription(`**For more info about a command type ${prefix}help<command> **`);

    const games = new Discord.EmbedBuilder()
      .setTitle('🏓 Games-')
      .addFields(
        { name: 'battle', value: '`battle` command starts a battle between message author and mentioned user', inline: true },
        { name: 'ispy', value: '`ispy` command starts a game of ispy between message author and mentioned user', inline: true },
        { name: 'tictactoe', value: '`tictactoe` command initiates a small game of tic tac toe between the user and the bot using buttons.\nAliases: `ttt`', inline: true }
      )
      .setColor('Random')
      .setDescription(`**For more info about a command type ${prefix}help<command> **`);

    const music = new Discord.EmbedBuilder()
      .setTitle('🎶 Music-')
      .addFields(
        { name: 'play', value: '`play` command is used for playing song in a voice channel!', inline: true },
        { name: 'stop', value: '`stop` command stops playing music, disconnects Fab and deletes queue!', inline: true },
        { name: 'queue', value: '`queue` command sends an embed with songs that are in queue.', inline: true },
        { name: 'volume', value: '`volume` command sets the volume between 1 to 10', inline: true },
        { name: 'remove', value: '`remove` command is used for removing any song from queue.', inline: true },
        { name: 'now-playing', value: '`now-playing` or `np` command sends now playing song in the voice channel, or it will send null if no song is playing.', inline: true },
        { name: 'lyrics', value: '`lyrics` command sends lyrics of requested song', inline: true },
        { name: 'skip', value: '`skip` command skips to the next song in queue, if there is no next song Fab will simply disconnect from voice channel.', inline: true },
        { name: 'pause', value: '`pause` command pauses the song that is currently playing.', inline: true },
        { name: 'resume', value: '`resume` command resumes the song from where it was paused.', inline: true },
        { name: 'loop', value: '`loop` command is used for enabling or disabling loop if some is song is currently playing!', inline: true },
        { name: 'shuffle', value: '`shuffle` command shuffles all songs that are in queue, it won\'t work if there are less than 3 songs!', inline: true },
        { name: 'playlist', value: '`playlist` command shows your music playlist info with options to play, rename and delete. (If you have one)\nAliases: `pl`', inline: true },
        { name: 'createplaylist', value: '`createplaylist <name>` command creates a music playlist with song limit up to 10. (3 playlists per user) \n Aliases: `createpl <name>`', inline: true },
        { name: 'addtoplaylist', value: '`addtoplaylist <song>` command adds a song to your personal playlist if you have one. \n Aliases: `atp`', inline: true }
      )
      .setDescription(`**For more info about a command type ${prefix}help<command> **`)
      .setThumbnail('https://media2.giphy.com/media/tqfS3mgQU28ko/giphy.gif')
      .setColor('Aqua');

    const imageE = new Discord.EmbedBuilder()
      .setTitle('📷 Images/Gifs-')
      .addFields(
        { name: 'meme', value: '`meme` command sends a random meme from reddit.', inline: true },
        { name: 'blur', value: '`blur` command will send a blurred avatar of you or mention member', inline: true },
        { name: 'gay', value: '`gay` command sends avatar of mention user or message author with LGBT flag on his/her avatar, lol', inline: true },
        { name: 'delete', value: '`delete` command deletes any mention user or message author', inline: true },
        { name: 'jail', value: '`jail` command sends avatar in jail of mentioned user or message author', inline: true },
        { name: 'trigger', value: '`trigger` command sends triggered avatar gif of mention user or message author.', inline: true }
      )
      .setColor('Random')
      .setDescription(`**For more info about a command type ${prefix}help<command> **`)
      .setThumbnail((await nekos.feed()).url);

    const settingsE = new Discord.EmbedBuilder()
      .setColor('Random')
      .setTitle('⚙ Server settings- ')
      .addFields(
        { name: 'setprefix', value: '`setprefix` command is used for changing my prefix in a particular server.', inline: true },
        { name: 'setlogs', value: '`setlogs` command is used for setting logs channel.', inline: true },
        { name: 'setlevelup', value: '`setlevelup` command is used for setting Level up channel (Where level up message will be sent).', inline: true },
        { name: 'set-welcome', value: '`set-welcome` command is used for setting up welcome messages in a particular channel,', inline: true },
        { name: 'enablelevels', value: '`enablelevels` will enable leveling system for your guild, by default its enabled **(NOTE: Your XP and level will not be changed)**.', inline: true },
        { name: 'disablelevels', value: '`disablelevels` will disable leveling system for your guild and all leveling commands will stop working **(NOTE: Your XP and level will not be deleted, you can enable this anytime by using enablelevels command!)**.', inline: true },
        { name: 'enablecmd', value: '`enablecmd` enables a command if that cmd was disabled', inline: true },
        { name: 'disablecmd', value: '`disablecmd` disables a command if it was enabled', inline: true },
        { name: 'disable-welcome', value: '`disable-welcome` will disable welcome messages for your guild if it was enabled.', inline: true },
        { name: 'disablelogs', value: '`disablelogs` will disable logs for your guild if it was enabled', inline: true },
        { name: 'disablelevelup', value: '`disablelevelup` will disable level up channel for your guild and will send level up messages in the default channel.', inline: true }
      )
      .setThumbnail('https://lh3.googleusercontent.com/proxy/Rz4u4j3BrSoQLvLzCmsw77lWhl8lJx5-Q2rmXV9vKG2zoqFan4SDSwXffdCCnLoaH4Nq7CrWTIs50aDjBha44taPyOwjTMI')
      .setDescription(`**For more info about a command type ${prefix}help<command> **`);

    const utilE = new Discord.EmbedBuilder()
      .setTitle('🛠 Utility-')
      .setColor('Random')
      .setDescription(`**For more info about a command type ${prefix}help<command> **`)
      .setThumbnail('https://lh3.googleusercontent.com/proxy/Rz4u4j3BrSoQLvLzCmsw77lWhl8lJx5-Q2rmXV9vKG2zoqFan4SDSwXffdCCnLoaH4Nq7CrWTIs50aDjBha44taPyOwjTMI')
      .addFields(
        { name: 'ping', value: '`ping` commands sends latency of bot.', inline: true },
        { name: 'stats', value: '`stats` command sends some information about me i.e. the bot Fab.', inline: true },
        { name: 'afk', value: '`afk` command sets your AFK with optional reason, if someone mentions you while you are AFK, bot will tell that you are AFK.', inline: true },
        { name: 'uptime', value: '`uptime` command sends uptime of Fab in format [dd, hh, mm, ss]', inline: true },
      );

    const pages = [
      startup,
      mod,
      fun,
      level,
      games,
      music,
      imageE,
      settingsE,
      utilE
    ];

    let startEmbed = await message.channel.send({
      embeds: [pages[currentPage].setFooter({ text: `Page - ${currentPage + 1}/${pages.length}` })],
      components: [createRow(currentPage)],
    });

    const collector = startEmbed.createMessageComponentCollector({ time: 120000 });

    collector.on('collect', async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        return await interaction.reply({ content: 'This message is not for you!', flags: Discord.MessageFlags.Ephemeral });
      }

      if (interaction.customId === 'first' && currentPage > 0) {
        currentPage = 0;
      } else if (interaction.customId === 'prev' && currentPage > 0) {
        currentPage--;
      } else if (interaction.customId === 'next' && currentPage < 8) {
        currentPage++;
      } else if (interaction.customId === 'last' && currentPage < 8) {
        currentPage = 8;
      }

      const updatedRow = createRow(currentPage);

      await interaction.update({
        embeds: [pages[currentPage].setFooter({ text: `Page - ${currentPage + 1}/${pages.length}` })],
        components: [updatedRow],
      });
    });

    collector.on('end', () => {
      startEmbed.edit({ content: '⏰ Message Timed out', components: [] });
    });
  }
};