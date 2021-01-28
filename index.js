const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION", "CHANNEL"],
})
const { MessageEmbed } = require("discord.js");
const Canvas = require("canvas");
const LogsSchema = require('./database/models/LogsSchema');
const moment = require("moment");
require("moment-duration-format");
const queue = new Map();
const lyricsFinder = require('lyrics-finder');
const Levels = require("discord-xp");
const fs = require("fs");
const Guild = require('./database/models/guild');
const { mem, cpu, os } = require("node-os-utils");
const welcomeSchema = require('./database/models/welcome-schema');
const levelSchema = require('./database/models/levelSchema');
const mongoose = require("mongoose");
const minigames = require("discord-minigames");
const { token } = require("./config/config.json");
const config = require('./config/config.json');
const canvacord = require("canvacord");
const usersMap = new Map();
const DBL = require("dblapi.js");
const ytdl = require('ytdl-core');

mongoose.connect('mongodb URL here', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);
const { exitCode } = require("process");

client.setMaxListeners(15);
client.login(token)

client.modcmds = new Discord.Collection();
const modcmdFiles = fs
  .readdirSync("./src/commands/moderation")
  .filter((file) => file.endsWith('.js'));
for (const file of modcmdFiles) {
  const cmd = require(`./src/commands/moderation/${file}`);
  client.modcmds.set(cmd.name, cmd);
}

client.funcmds = new Discord.Collection();
const funcmdFiles = fs
  .readdirSync("./src/commands/fun")
  .filter((file) => file.endsWith('.js'));
for (const file of funcmdFiles) {
  const funcmd = require(`./src/commands/fun/${file}`);
  client.funcmds.set(funcmd.name, funcmd);
}

client.imagecmds = new Discord.Collection();
const imagecmdFiles = fs
  .readdirSync("./src/commands/imagegif")
  .filter((file) => file.endsWith('.js'));
for (const file of imagecmdFiles) {
  const imagecmd = require(`./src/commands/imagegif/${file}`);
  client.imagecmds.set(imagecmd.name, imagecmd);
}

client.utilcmds = new Discord.Collection();
const utilcmdFiles = fs
  .readdirSync("./src/commands/utility")
  .filter((file) => file.endsWith('.js'));
for (const file of utilcmdFiles) {
  const utilcmd = require(`./src/commands/utility/${file}`);
  client.utilcmds.set(utilcmd.name, utilcmd);
}


client.nsfwcmds = new Discord.Collection();
const nsfwcmdFiles = fs
  .readdirSync("./src/commands/NSFW")
  .filter((file) => file.endsWith('.js'));
for (const file of nsfwcmdFiles) {
  const nsfwcmd = require(`./src/commands/NSFW/${file}`);
  client.nsfwcmds.set(nsfwcmd.name, nsfwcmd);
}


client.on("ready", () => {
  let newD = new Date
  startDate += `${newD}`
  fs.readdirSync('./src/').map(fu => console.log(`Loaded ${fu.toString()} file`));
  fs.readdirSync('./src/commands/').map(fu => console.log(`Loaded ${fu.toString()} file`));
  fs.readdirSync('./src/commands/fun/').map(fu => console.log(`Loaded ${fu.toString()} file`));
  fs.readdirSync('./src/commands/imagegif/').map(fu => console.log(`Loaded ${fu.toString()} file`));
  fs.readdirSync('./src/commands/moderation/').map(fu => console.log(`Loaded ${fu.toString()} file`));
  fs.readdirSync('./src/commands/NSFW/').map(fu => console.log(`Loaded ${fu.toString()} file`));
  fs.readdirSync('./src/commands/utility/').map(fu => console.log(`Loaded ${fu.toString()} file`));
  fs.readdirSync('./database/models/').map(fu => console.log(`Loaded ${fu.toString()} database schemas`));
  fs.readdirSync('./config/').map(fu => console.log(`Loaded ${fu.toString()} config file`));
  fs.readdirSync('./').map(fu => console.log(`Loaded ${fu.toString()} in parent directory`));

  console.log(`${client.user.tag} is now online .... yay! In ${client.guilds.cache.size} servers !\n${client.users.cache.size} users loaded\n${client.channels.cache.size} channels loaded!`);

  client.user.setPresence({
    activity: {
      name: '`help for commands',
      type: 'PLAYING',
      url: 'https://twitch.tv/fab_is_insane'
    },
    status: 'online'
  })
});

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");
  let fontSize = 80;

  do {
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

client.on("guildMemberAdd", async (member) => {
  const settings = await welcomeSchema.findOne({
    guildID: member.guild.id,
  });
  if (member.user.bot) return;
  if (member.guild.id === "729340392327217193") {
    setTimeout(() => {
      member.send("**Verify yourself within 30 minutes in #server-rules!**");
    }, 5000);
    let ro = member.guild.roles.cache.find(
      (r) => r.name === "AS workers / Members"
    );
    if (!ro) return;
    member.roles.add(ro);
    let guildName = member.guild.name;
    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.name === "🛬landing-zone"
    );
    member.send(
      `${member} Welcome to **${guildName}** you are **${member.guild.memberCount}th** astronaut!\n\n Subscribe to this channel- https://www.youtube.com/channel/UCSH77jsgFTgh6qP-PtWBWtQ`
    );
    member.send(
      `${member} https://www.youtube.com/channel/UCI3Bcxk7aA949R6t97ViDvw`
    );
    if (!welcomeChannel) return;
    welcomeChannel.send(
      `${member}'s spaceship just landed here, now we have **${member.guild.memberCount}** astronauts!`
    );
    welcomeChannel.send("<a:Hey:766884642241511444>");
    const wchannel = member.guild.channels.cache.find((ch) =>
      ch.name.toLowerCase().includes("welcome")
    );
    if (!wchannel) return;
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("./src/wallpaper.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `Welcome to the server,\n${member.guild.memberCount}th astronaut!`,
      canvas.width / 2.5,
      canvas.height / 3.5
    );

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${member.displayName}!`,
      canvas.width / 2.5,
      canvas.height / 1.5
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ size: 2048, format: "jpg" })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    var attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );
    const embed = new Discord.MessageEmbed()
      .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
      .setFooter(`Total ${member.guild.memberCount} members!`)
      .setTimestamp()
      .setDescription(
        `Welcome ${member} to ${member.guild.name}! You are **${member.guild.memberCount}th** astronaut in this server! Go to <#729340627132743761> to verify yourself!`
      )
      .setThumbnail(member.guild.iconURL({ size: 2048, dynamic: true }))
      .attachFiles([attachment])
      .setColor("RANDOM")
      .setImage(`attachment://welcome-image.png`);
    wchannel.send(embed);

    setTimeout(() => {
      if (!member.roles.cache.some((role) => role.name === "Verified")) {
        member.send(
          `Kicked from ${member.guild.name} because you **didn\'t verify** yourself! Better luck next time.`
        );
        member.kick('Did not verify in 30 minutes.');
      }
    }, 1800000);
  }
  if (!settings) return;
  else if (member.guild.id === settings.guildID) {
    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.id === settings.channelID
    )
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("https://static.icy-veins.com/forum-files/news/46634-class-changes-preview-in-wow-shadowlands-700x250.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Welcome to the server,\n${member.guild.memberCount}th member!`, canvas.width / 2.7, canvas.height / 3.7);

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${member.displayName}!`,
      canvas.width / 2.7,
      canvas.height / 1.5
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ size: 2048, format: "jpg" })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    var attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );
    const ebed = new Discord.MessageEmbed()
      .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
      .setFooter(`Total members: ${member.guild.memberCount} members!`)
      .setTimestamp()
      .setDescription(
        `Welcome ${member} to ${member.guild.name}! You are **${member.guild.memberCount}th** member in this server!`
      )
      .setThumbnail(member.guild.iconURL({ size: 2048, dynamic: true }))
      .attachFiles([attachment])
      .setColor("RANDOM")
      .setImage(`attachment://welcome-image.png`);
    welcomeChannel.send(ebed);
  }
});

client.on("guildMemberRemove", (member) => {
  if (member.guild.id === "729340392327217193") {
    const leaveChannel = member.guild.channels.cache.find((channel) =>
      channel.name.toLowerCase().includes("leave", "bye")
    );
    if (!leaveChannel) return;
    leaveChannel.send(
      `**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** astronauts.`
    );
  } else if (member.guild.id === "601460089118785547") {
    const leftChannel = member.guild.channels.cache.find(
      (channel) => channel.id === "749257836546228304"
    );
    leftChannel.send(
      `**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** members.`
    );
  }
});

client.on("message", async (message) => {

  if (message.channel.type === 'dm' && message.content.toLowerCase() === '`help') {
    client.utilcmds.get('dmhelp').execute(message);
  }

  if (!message.guild) return console.log(`New Message in DMs: "${message.content}" by ${message.author.username}`);
  const settings = await Guild.findOne({
    guildID: message.guild.id,
  }, (err, guild) => {
    if (err) console.log(err);
    if (!guild) {
      const newGuild = new Guild({
        guildID: message.guild.id,
        guildName: message.guild.name,
        prefix: config.prefix
      })
      newGuild.save().catch(err => console.error(err));
      return;
    }
  });

  const prefix = settings.prefix;
  if (message.content.toLowerCase().startsWith(prefix + "ping")) {
    let msg = await message.channel.send('🏓 Pong!')
    var ping = Date.now() - message.createdTimestamp + "ms";
    msg.edit(`🏓 Pong! in **${ping}**`);
  }
  const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

  if (message.content.toLowerCase() === '`default prefix' || message.content.toLowerCase() === prefix + 'default prefix') {
    message.channel.send(`Default prefix is \` and,`)
    message.channel.send(`Prefix for this server is ${prefix}`);
  }
  const setting = await levelSchema.findOne({
    guildID: message.guild.id,
  })
  if (!setting) {
    const newData = new levelSchema({
      guildID: message.guild.id,
      guildName: message.guild.name,
      disabled: false
    });
    newData.save();
  }
  if (message.author.bot) return;

  const randomxp = Math.floor(Math.random() * 24) + 1;

  if (!setting.disabled) {
    const hasup = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomxp
    )
    if (hasup) {

      const setu = await levelSchema.findOne({
        guildID: message.guild.id,
      });
      if (!setu) {
        const newata = new levelSchema({
          guildID: message.guild.id,
          guildName: message.guild.name,
          disabled: false,
          levelupChannelID: null
        });
        newata.save();
      }
      let chan;
      if (!setu || !setu.levelupChannelID || setu.levelupChannelID === null) chan = message.channel.id;
      else chan = setu.levelupChannelID;
      const chant = message.guild.channels.cache.find(chain => chain.id === chan);
      const user = await Levels.fetch(message.author.id, message.guild.id);
      chant.send(
        `<a:HyperTada:797070608872767488> I don't know how but, <@${message.author.id}> is now on **Level ${user.level}**!`
      );
    }
  }

  if (message.author.bot) return;
  if (message.content.toLowerCase() === prefix + "help ban") {
    message.channel.send(
      "`ban` command is used for banning any guild member with a DM to the member banned (Reason is optional)"
    );
  }
  if (
    message.content.toLowerCase() === prefix + "help softban" ||
    message.content.toLowerCase() === prefix + "help soft ban"
  ) {
    message.channel.send(
      '`softban` command is used for banning any member but that member is not banned from the guild. He/she can\'t send any messages. All roles will be removed and bot will give a new role "Banned" with permissions: Read Meassage History'
    );
  }
  if (message.content.toLowerCase() === prefix + "help kick") {
    message.channel.send(
      "`kick` command is used for kicking any guild member with a DM to the member banned (Reason is optional)"
    );
  }
  if (message.content.toLowerCase() === prefix + "help poll") {
    message.channel.send(
      "`poll` command is used to create polls with reactions YES, NO or OTHER."
    );
  }
  if (message.content.toLowerCase() === prefix + "help anime") {
    message.channel.send(
      "`anime` command gives you random anime images (No NSFW Content)"
    );
  }
  if (message.content.toLowerCase() === prefix + "help gis") {
    message.channel.send(
      "`gis` stands for *Google Image Search* that uses Google's API to search for images.\nExample Usage: `gis dog will give you a dog image."
    );
  }
  if (message.content.toLowerCase() === prefix + "help clear") {
    message.channel.send(
      "`clear` command is used for deleting multiple messages at a time.\nExample Usage: `clear 10 will delete 10 messages. (**NOTE:** Due to limitation I can delete only 99 messages at once and messages that are older than 14 days will not be deleted)"
    );
  }

  if (
    message.content.toLowerCase() === prefix + "help fun or images" ||
    message.content.toLowerCase() === prefix + "help fun" ||
    message.content.toLowerCase() === prefix + "help image"
  ) {
    message.channel.send(
      "Fun or image commands like `pat`, `kill`, `blur`, `meme` etc. will send a random image/gif, Blur command will send blurred avatar."
    );
  }
  if (
    message.content.toLowerCase() === prefix + "help serverinfo" ||
    message.content.toLowerCase() === prefix + "help server info"
  ) {
    message.channel.send(
      "`serverinfo` command will send a neat embed with all information about a guild. (**NOTE: This command requires you to have `MANAGE_GUILD` permission.**)"
    );
  }
  if (
    message.content.toLowerCase() === prefix + "help userinfo" ||
    message.content.toLowerCase() === prefix + "help user info"
  ) {
    message.channel.send(
      "`userinfo` command is used for getting detailed info about a member/user in a neat embed."
    );
  }
  if (
    message.content.toLowerCase() === prefix + "help youtube" ||
    message.content.toLowerCase() === prefix + "help yt"
  ) {
    message.channel.send(
      "`youtube` or `yt` command will send a youtube link based on your arguments. (**NOTE: Arguments are not optional.**)\nExample Usage: `yt Cyberpunk 2077 will give you a random Cyberpunk video or gameplay."
    );
  }
  if (message.content.toLowerCase() === prefix + 'help warn') {
    message.channel.send('`warn` command is used for warning any member with reason, Fab will DM that member with reason and moderator name, and reason is optional!')
  }
  if (message.content.toLowerCase() === prefix + 'help npm') {
    message.channel.send('`npm` command is used for searching packages through NPM website.\nExample usage - `npm discord.js`');
  }
  if (message.content.toLowerCase() === prefix + 'help joke') {
    message.channel.send('`joke` command sends you a random joke.');
  }
  if (message.content.toLowerCase() === prefix + 'help advice') {
    message.channel.send('`advice` command sends you a random advice.');
  }
  if (message.content.toLowerCase() === prefix + 'help kpop') {
    message.channel.send('`kpop` sends a random kpop image.')
  }
  if (message.content.toLowerCase() === prefix + 'help kiss') {
    message.channel.send('`kiss` command sends a random kiss gif!');
  }
  if (message.content.toLowerCase() === prefix + 'help punch') {
    message.channel.send('`punch` command sends a random punch gif!')
  }
  if (message.content.toLowerCase() === prefix + 'help pat') {
    message.channel.send('`pat` command sends a random punch gif!')
  }
  if (message.content.toLowerCase() === prefix + 'help slap') {
    message.channel.send('`slap` command sends a random punch gif!')
  }
  if (message.content.toLowerCase() === prefix + 'help kill') {
    message.channel.send('`kill` command sends a random punch gif!')
  }
  if (message.content.toLowerCase() === prefix + 'help poke') {
    message.channel.send('`poke` command sends a random punch gif!')
  }
  if (message.content.toLowerCase() === prefix + 'help spank') {
    message.channel.send('`spank` command sends a random punch gif!')
  }
  if (message.content.toLowerCase() === prefix + 'help hug') {
    message.channel.send('`hug` command sends a random punch gif!')
  }
  if (message.content.toLowerCase() === prefix + 'help avatar') {
    message.channel.send('`avatar` or `av` command sends avatar of mentioned user or the message author.')
  }
  if (message.content.toLowerCase() === prefix + 'help rank') {
    message.channel.send('`rank` command sends your rank card with XP and Level!')
  }
  if (message.content.toLowerCase() === prefix + 'help leaderboard') {
    message.channel.send('`leaderboard` command sends leaderboard of top 5 members in the guild!')
  }
  if (message.content.toLowerCase() === prefix + 'help battle') {
    message.channel.send('`battle` command starts a battle between message author and mentioned user');
  }
  if (message.content.toLowerCase() === prefix + 'help ispy') {
    message.channel.send('`ispy` command starts a game of ispy between message author and mentioned user');
  }
  if (message.content.toLowerCase() === prefix + 'help play') {
    message.channel.send('`play` command is used for playing song in a voice channel!');
  }
  if (message.content.toLowerCase() === prefix + 'help stop') {
    message.channel.send('`stop` command stops playing music, disconnects Fab and deletes queue!');
  }
  if (message.content.toLowerCase() === prefix + 'help queue') {
    message.channel.send('`queue` command sends an embed with songs that are in queue.');
  }
  if (message.content.toLowerCase() === prefix + 'help remove') {
    message.channel.send('`remove` command is used for removing any song from queue, \nExample Usage - `remove 2` will remove song number 2.');

  }
  if (message.content.toLowerCase() === prefix + 'help volume') {
    message.channel.send('`volume` command sets the volume between 1 to 10');
  }
  if (message.content.toLowerCase() === prefix + 'help lyrics') {
    message.channel.send('`lyrics` command sends lyrics of requested song,\nExample usage - `lyrics eminem` and then you have to enter song name `rap god`');
  }
  if (message.content.toLowerCase() === prefix + 'help skip') {
    message.channel.send('`skip` command skips to the next song in queue, if there is no next song Fab will simply disconnect from voice channel.');
  }
  if (message.content.toLowerCase() === prefix + 'help now-playing') {
    message.channel.send('`now-playing` or `np` command sends now playing song in the voice channel, or it will send null if no song is playing.');
  }
  if (message.content.toLowerCase() === prefix + 'help pause') {
    message.channel.send('`pause` command pauses the song that is currently playing.');
  }
  if (message.content.toLowerCase() === prefix + 'help resume') {
    message.channel.send('`resume` resumes the song from where it was paused.');
  }
  if (message.content.toLowerCase() === prefix + 'help meme') {
    message.channel.send('`meme` command sends a random meme from reddit.');
  }
  if (message.content.toLowerCase() === prefix + 'help gay') {
    message.channel.send('`gay` command sends avatar of mention user or message author with LGBT flag on his/her avatar, lol');
  }
  if (message.content.toLowerCase() === prefix + 'help delete') {
    message.channel.send('`delete` command deletes any mention user or message author');
  }
  if (message.content.toLowerCase() === prefix + 'help jail') {
    message.channel.send('`jail` command sends avatar in jail of mentioned user or message author');
  }
  if (message.content.toLowerCase() === prefix + 'help trigger') {
    message.channel.send('`trigger` command sends triggered avatar gif of mention user or message author.');
  }
  if (message.content.toLowerCase() === prefix + 'help nsfw') {
    message.channel.send('NSFW commands sends random gif/image or requested category.');
  }
  if (message.content.toLowerCase() === prefix + 'help ping') {
    message.channel.send('`ping` commands sends latency of bot.');
  }
  if (message.content.toLowerCase() === prefix + 'help stats') {
    message.channel.send('`stats` command sends some information about me i.e. the bot Fab.');
  }
  if (message.content.toLowerCase() === prefix + 'help setprefix') {
    message.channel.send('`setprefix` command is used for changing my prefix in a particular server,\nExample usage- `setprefix !` will set my prefix to `!` for your guild.');
  }
  if (message.content.toLowerCase() === prefix + 'help settings') {
    message.channel.send('`settings` command will send an embed with details/settings of your server, for example Logs channel, welcome channel, level up channel, etc.');
  }
  if (message.content.toLowerCase() === prefix + 'help setlogs') {
    message.channel.send('`setlogs` command is used for setting logs channel.\nExample usage - `setlogs #logs` will send all server logs in that channel!')
  }
  if (message.content.toLowerCase() === prefix + 'help setlevelup') {
    message.channel.send('`setlevelup` command is used for setting Level up channel (Where level up message will be sent).\nExample usage - `setlevelup #levels` will send level up messages in that channel!');
  }
  if (message.content.toLowerCase() === prefix + 'help set-welcome' || message.content.toLowerCase() === prefix + 'help setwelcome') {
    message.channel.send('`set-welcome` command is used for setting up welcome messages in a particular channel,\nExample Usage - `set-welcome #welcome` will enable welcome messages for that channel mentioned.');
  }
  if (message.content.toLowerCase() === prefix + 'help disable-welcome') {
    message.channel.send('`disable-welcome` will disable welcome messages for your guild.');
  }
  if (message.content.toLowerCase() === prefix + 'help disablelevels') {
    message.channel.send('`disablelevels` will disable leveling system for your guild and all leveling commands will stop working **(NOTE: Your XP and level will not be deleted, you can enable this anytime by using enablelevels command!)**.');
  }
  if (message.content.toLowerCase() === prefix + 'help enablelevels') {
    message.channel.send('`enablelevels` will enable leveling system for your guild. **(NOTE: Your XP and level will not be changed)**.');
  }
  if (message.content.toLowerCase() === prefix + 'help uptime') {
    message.channel.send('`uptime` command sends uptime of Fab in format [dd, hh, mm, ss]');
  }
  if (message.content.toLowerCase() === prefix + 'help disablelogs') {
    message.channel.send('`disablelogs` will disable logs for your guild.');
  }
  if (message.content.toLowerCase() === prefix + 'help disablelevelup') {
    message.channel.send('`disablelevelup` will disable level up channel for your guild and will send level up messages in the default channel.');
  }

  try {
    if (message.author.bot) return;

    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      let msgCount = userData.msgCount;
      const { lastMessage, timer } = userData;
      const diff = message.createdTimestamp - lastMessage.createdTimestamp;
      if (diff > 2500) {
        clearTimeout(timer);
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, 5500);
        usersMap.set(message.author.id, userData);
      } else {
        ++msgCount;
        if (parseInt(msgCount) === 6) {
          message.reply("PLEASE STOP SPAMMING!!");
          const muteorban = message.guild.roles.cache.find((roo) =>
            roo.name.toLowerCase().includes("mute")
          );
          if (!muteorban) return;
          message.member.roles.add(muteorban);
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
      }
    } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, 5500);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn,
      });
    }
    if (message.content.toLowerCase() === prefix + "help" || message.content.toLowerCase() === '`help') {
      console.log(
        `Help command used in "${message.guild.name} by ${message.author.username}"`
      );
      client.utilcmds.get("help").execute(message);
    }
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "pussy") {
      client.nsfwcmds.get("pussy").execute(message, args);
    }
    if (command === "cumsluts" || command === "cum sluts") {
      client.nsfwcmds.get('cumsluts').execute(message, args, command);
    }
    if (command === "kpop") {
      client.imagecmds.get("kpop").execute(message, args, command);
    }
    if (command === "hug") {
      client.funcmds.get("hug").execute(message, args, command);
    }
    if (command === "permissions" || command === "permission" || command === "perms") {
      client.modcmds.get("permissions").execute(message, args, command);
    }
    if (command === "joke" || command === "jokes") {
      client.funcmds.get("joke").execute(message, args, command);
    }
    if (command === "triggered" || command === "trigger") {
      client.imagecmds.get("triggered").execute(message, args, command);
    }
    let mee = message.mentions.members.last();
    if (command === "ispy") {
      let is = new minigames.ISpy(message)
      is.startISpy(mee);
    }
    if (command === "slap") {
      client.funcmds.get("slap").execute(message, args, command);
    }
    if (
      command === "serverinfo" ||
      command === "server info" ||
      command === "server-info" ||
      command === "si"
    ) {
      client.modcmds.get("serverinfo").execute(message, args, command);
    }
    if (command === "poll") {
      client.utilcmds.get("poll").execute(message, args, command);
    }
    if (
      command === "userinfo" ||
      command === "user info" ||
      command === "user-info" ||
      command === "ui"
    ) {
      client.modcmds.get("userinfo").execute(message, args, command);
    }
    if (command === "bcount" || command === "ban-count") {
      client.modcmds.get("bcount").execute(message, args, command);
    }
    if (command === "anime") {
      client.imagecmds.get("anime").execute(message, args);
    }
    if (command === "kill") {
      client.funcmds.get("kill").execute(message, args, command);
    }
    if (command === "hentai") {
      client.nsfwcmds.get("hentai").execute(message, args, command);
    }
    if (command === 'warn') {
      client.modcmds.get('warn').execute(message, args, command);
    }
    if (command === 'setlogs') {
      client.utilcmds.get('setlogs').execute(message, args);
    }
    if (
      command === "softban" ||
      command === "sftban" ||
      command === "soft ban"
    ) {
      client.modcmds.get("softban").execute(message, args, command);
    }
    if (command === 'disablelevelup') {
      client.utilcmds.get('disablelevelup').execute(message, args, command);
    }
    if (command === 'feed') {
      client.funcmds.get('feed').execute(message, args, command);
    }
    if (command === "jail") {
      client.imagecmds.get("jail").execute(message, args, command);
    }
    if (command === "gay") {
      client.imagecmds.get("gay").execute(message, args, command);
    }
    if (command === "blur") {
      client.imagecmds.get("blur").execute(message, args, command);
    }
    if (command === "google") {
      client.funcmds.get("google").execute(message, args, command);
    }
    if (command === "npm") {
      client.funcmds.get("npm").execute(message, args, command);
    }
    if (command === "punch") {
      client.funcmds.get("punch").execute(message, args, command);
    }
    if (command === "poke") {
      client.funcmds.get("poke").execute(message, args, command);
    }
    if (command === "agree") {
      client.utilcmds.get("agree").execute(message, args, command);
    }
    if (command === "kiss") {
      client.funcmds.get("kiss").execute(message, args, command);
    }
    if (command === 'setlevelup' || command === 'setlevelsup' || command === 'setlevelupchannel') {
      client.utilcmds.get('setlevelup').execute(message, args, command);
    }
    if (command === "pat") {
      client.funcmds.get("pat").execute(message, args, command);
    }
    if (command === "advice") {
      client.funcmds.get("advice").execute(message, args, command);
    }
    if (command === "spank") {
      client.funcmds.get("spank").execute(message, args, command);
    }
    if (command === "news") {
      client.funcmds.get("news").execute(message, args, command);
    }
    if (command === 'prefix') {
      const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Prefixes`)
        .setDescription(`1) <@${client.user.id}> \n2) ${settings.prefix}`)
        .setTimestamp()
      message.channel.send(embed);
    }
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Hi, I\'m Fab! How may I help you?')
        .setDescription('You can get a list of all commands by using `help` command! In case if you don\'t know my prefix for this server you can use `default prefix` command and it will tell you my current prefix! If you want to set-welcome or change my prefix you can do that by using `set-welcome` and `setprefix` command! For server settings type `settings`. If you want to report any bugs or error you can join our [support server](https://discord.gg/r2sqEsV)')
        .setColor('RANDOM')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter("© 2019-2021 Hey Fab, I'mma kill you#0640")
      message.channel.send(embed);
    }
    if (command === "delete" || command === "del") {
      client.imagecmds.get("delete").execute(message, args, command);
    }
    if (command === "clear") {
      client.modcmds.get("clear").execute(message, args, command);
    }
    if (command === 'setprefix') {
      client.utilcmds.get('setprefix').execute(message, args, command);
    }
    if (command === "kick") {
      client.modcmds.get("kick").execute(message, args, command);
    }
    if (command === "ban") {
      client.modcmds.get("ban").execute(message, args, command);
    }
    if (command === "yt" || command === "youtube") {
      client.funcmds.get("yt").execute(message, args, command);
    }
    if (command === "gis") {
      client.funcmds.get("gis").execute(message, args, command);
    }
    let member = message.mentions.members.last();
    if (command === "battle" && member) {
      minigames.startBattle(member, message);
    }
    if (command === "meme") {
      client.imagecmds.get("meme").execute(message, args, command);
    }
    if (command === "server-icon" || command === "server icon") {
      client.imagecmds.get("server-icon").execute(message, args, command);
    }

    if (command === "servers") {
      if (message.author.id != "570895295957696513") return;
      client.users.fetch("570895295957696513").then((user) => {
        client.guilds.cache.forEach((guild) => {
          user.send(guild.name);
        });
      });
    }

    if (command === "get-humans") {
      const mems = message.guild.members.cache.map((mem) => mem.user.username);
      const fi = mems.join(`\n`);
      let msg = await message.channel.send("Fetching...");
      const embed = new Discord.MessageEmbed().setDescription(fi);

      message.channel.startTyping();
      setTimeout(async () => {
        message.channel.stopTyping();
        (await message.channel.send(embed)) && msg.delete();
      }, 3000);
    }

    if (command === "eval") {
      if (message.author.id != 'bot owner ID') return;
      const clean = (text) => {
        if (typeof text === "string")
          return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
      };
      try {
        const ars = args.slice(0).join(" ");
        let evaled = eval(ars);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
    const serverQueue = queue.get(message.guild.id);
    if (command === 'play' || command === 'p') {
      if (!message.member.voice.channel) return message.channel.send(`Can't you join a voice channel??`);
      const perms = message.member.voice.channel.permissionsFor(message.client.user);
      if (!perms.has('CONNECT')) return message.channel.send(`❌ **I don\'t have permission to join ${message.member.voice.channel.name}!**`);
      if (!perms.has('SPEAK')) return message.channel.send(`❌ **I don't have permission to speak in that channel!**`);
      let music = args.slice(0).join(" ");
      if (!music) {
        const messageFilter = m => m.author.id === message.author.id;
        message.reply('(This message will be canceled in 15 seconds)\nEnter a **song name** -');
        await message.channel.awaitMessages(messageFilter, { max: 1, time: 15000 }).then(async collected => {
          if (collected.first().content.toLowerCase() === 'cancel') return message.channel.send('❌ Canceled');
          music = collected.first().content;
          const yt = "https://www.youtube.com/watch?v=";
          const ytserch = require('yt-search');
          const yo = await ytserch.search(music)
          const video = yo.videos.slice(0, 1)
          const id = video.map(v => v.videoId)
          const finaluri = `${yt}${id}`;

          const inf = await ytdl.getInfo(finaluri);
          var measuredTime = new Date(null);
          measuredTime.setSeconds(inf.videoDetails.lengthSeconds);
          var MHSTime = measuredTime.toISOString().substr(11, 8);
          const song = {
            title: inf.videoDetails.title,
            url: inf.videoDetails.video_url,
            thumbnail: video.map(v => v.thumbnail),
            duration: MHSTime,
            reqBy: message.author
          }
          if (!serverQueue) {
            const queueConst = {
              textChannel: message.channel,
              voiceChannel: message.member.voice.channel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            }

            queue.set(message.guild.id, queueConst);
            queueConst.songs.push(song);
            var connection = await message.member.voice.channel.join();
            message.guild.me.voice.setSelfDeaf(true)
            queueConst.connection = connection;
            if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
            play(message.guild, queueConst.songs[0]);
          } else {
            if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
            serverQueue.songs.push(song);
            message.channel.send(`**${song.title}** has been added to the queue!\nPosition in queue: **${serverQueue.songs.length}**`);
          }
        })
      } else {
        const yt = "https://www.youtube.com/watch?v=";
        const ytserch = require('yt-search');
        const yo = await ytserch.search(music)
        const video = yo.videos.slice(0, 1)
        const id = video.map(v => v.videoId)
        const finaluri = `${yt}${id}`;

        const inf = await ytdl.getInfo(finaluri);
        var measuredTime = new Date(null);
        measuredTime.setSeconds(inf.videoDetails.lengthSeconds);
        var MHSTime = measuredTime.toISOString().substr(11, 8);
        const song = {
          title: inf.videoDetails.title,
          url: inf.videoDetails.video_url,
          thumbnail: video.map(v => v.thumbnail),
          duration: MHSTime,
          reqBy: message.author
        }
        if (!serverQueue) {
          const queueConst = {
            textChannel: message.channel,
            voiceChannel: message.member.voice.channel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
          }
          queue.set(message.guild.id, queueConst);
          queueConst.songs.push(song);
          var connection = await message.member.voice.channel.join();
          message.guild.me.voice.setSelfDeaf(true)
          queueConst.connection = connection;
          if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
          play(message.guild, queueConst.songs[0]);
        } else {
          if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
          serverQueue.songs.push(song);
          message.channel.send(`**${song.title}** has been added to the queue!\nPosition in queue: **${serverQueue.songs.length}**`);
        }
      }
    } else if (command === 'stop' || command === 'dc' || command === 'leave' || command === 'disconnect') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!message.guild.me.voice.channel) return;
      if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
      if (!serverQueue) return message.channel.send('There is nothing playing??');
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
      message.channel.send('✅ Disconnected from voice channel and deleted queue!');
    }
    else if (command === 'skip' || command === 's') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!message.guild.me.voice.channel) return;
      if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
      if (!serverQueue) return message.channel.send('There\'s nothing!');
      serverQueue.connection.dispatcher.end();
      message.channel.send('⏭ **Skipped!**');
    } else if (command === 'volume') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!serverQueue) return message.channel.send('There\'s nothing in queue!');
      if (!args.slice(0).join(" ")) return message.channel.send(`🔊 Volume is: ${serverQueue.volume}`);
      if (isNaN(args.slice(0).join(" "))) return message.channel.send('Bruh, volume is in numbers...')
      serverQueue.volume = args.slice(0).join(" ");
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args.slice(0).join(" ") / 5);
      message.channel.send(`🔊 Volume set to: **${args.slice(0).join(" ")}**`);
    } else if (command === 'now-playing' || command === 'np') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!message.guild.me.voice.channel) return;
      if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
      if (!serverQueue) return message.channel.send('There\'s nothing in queue!');
      let nextsong
      if (serverQueue.songs[1]) nextsong = serverQueue.songs[1].title;
      if (!nextsong) nextsong = 'No next song in queue';
      const embed = new Discord.MessageEmbed()
        .setTitle(`Now playing - `)
        .setDescription(`🎶 **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**\n\n⏲ **Duration -**\n${serverQueue.songs[0].duration}\n\n⏭ **Next up -**\n${nextsong}`)
        .setThumbnail(`${serverQueue.songs[0].thumbnail}`)
        .setColor('e72929')
        .setFooter(`Requested by - ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));
      message.channel.send(embed);
    }
    else if (command === 'queue' || command === 'q') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!message.guild.me.voice.channel) return;
      if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
      if (!serverQueue) return message.channel.send('Queue is empty :/');
      let qMsg = `Currently playing - **${serverQueue.songs[0].title}**\n**----------------------------------------------**\n\n`
      for (var i = 1; i < serverQueue.songs.length; i++) {
        qMsg += `**${i + 1}) ${serverQueue.songs[i].title}**\nRequested by - ${serverQueue.songs[i].reqBy.username}\n\n`;
      }
      const embed = new Discord.MessageEmbed()
        .setTitle('Queue -')
        .setColor('RANDOM')
        .setDescription(`${qMsg}`)
        .setTimestamp()
      message.channel.send(embed);

    } else if (command === 'pause') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!message.guild.me.voice.channel) return;
      if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
      if (!serverQueue) return message.channel.send('There\'s nothing in queue!');
      if (!serverQueue.playing) return message.channel.send('Already paused')
      serverQueue.playing = false
      serverQueue.connection.dispatcher.pause();
      message.channel.send('⏸ *Paused*')
    } else if (command === 'resume') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!message.guild.me.voice.channel) return;
      if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
      if (!serverQueue) return message.channel.send('There\'s nothing in queue!');
      if (serverQueue.playing) return message.channel.send('Already playing')
      serverQueue.playing = true
      serverQueue.connection.dispatcher.resume()
      message.channel.send('▶ *Resumed*')
    } else if (command === 'lyrics') {
      let artist = args.slice(0).join(" ");
      if (!artist) return message.channel.send('❌ **Please provide <artist name> !**');
      let pages = [];
      let currentpage = 0;
      let songName = '';
      const messageFilter = m => m.author.id === message.author.id;
      const reactionFilter = (reaction, user) => ['⬅', '➡'].includes(reaction.emoji.name) && (message.author.id === user.id)
      message.reply('(This message will be canceled in 15 seconds)\nNoice, now enter a **song name** -');
      await message.channel.awaitMessages(messageFilter, { max: 1, time: 15000 }).then(async collected => {
        if (collected.first().content.toLowerCase() === 'cancel') return message.channel.send('❌ Canceled');
        songName = collected.first().content;
        await finder(artist, songName, message, pages)
      })
      const lyricEmbed = await message.channel.send(`Lyrics page: ${currentpage + 1}/${pages.length}`, pages[currentpage])
      await lyricEmbed.react('⬅');
      await lyricEmbed.react('➡');

      const collector = lyricEmbed.createReactionCollector(reactionFilter);
      collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name === '➡') {
          if (currentpage < pages.length - 1) {
            currentpage += 1
            lyricEmbed.edit(`Lyrics page: ${currentpage + 1}/${pages.length}`, pages[currentpage]);
            message.reactions.resolve(reaction).users.remove(user);
          }
        } else if (reaction.emoji.name === '⬅') {
          if (currentpage !== 0) {
            currentpage -= 1;
            lyricEmbed.edit(`Lyrics page: ${currentpage + 1}/${pages.length}`, pages[currentpage]);
            message.reactions.resolve(reaction).users.remove(user);
          }
        }
      });
    } else if (command === 'remove') {
      if (!message.member.voice.channel) return message.channel.send('❌ **You need to be in a voice channel!**');
      if (!message.guild.me.voice.channel) return;
      if (message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send('❌ **You need to be in the same voice channel!**');
      if (!serverQueue) return message.channel.send('There\'s nothing in queue!');
      if (serverQueue.songs.length == 1) return message.channel.send('There is only one song in queue!');
      let songT = args[0];
      if (!songT) return message.channel.send('❌ Enter a valid song number!');
      if (isNaN(songT)) return message.channel.send('❌ Enter a valid song number!');
      if (songT <= 1 || songT > serverQueue.songs.length) return message.channel.send(`❌ Enter a valid song number!`);
      serverQueue.songs.splice(songT - 1, 1);
      message.channel.send(`🗑 Removed song number **${songT}** from queue!`);
    }
    if (command === 'disablelevels' || command === 'disablelevel') {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌ **You need `ADMINISTRATOR` in order to use this command!**');
      const sett = await levelSchema.findOne({
        guildID: message.guild.id
      })
      if (!sett) {
        const newData = new levelSchema({
          guildID: message.guild.id,
          guildName: message.guild.name,
          disabled: true,
          levelupChannelID: null
        })
        newData.save();
      } else
        await sett.updateOne({
          disabled: true,
        });
      message.channel.send(`✅ Leveling system disabled for **${message.guild.name}!**`);
    }
    if (command === 'enablelevels' || command === 'enablelevel') {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌ **You need `ADMINISTRATOR` in order to use this command!**')
      const sett = await levelSchema.findOne({
        guildID: message.guild.id
      })
      if (!sett) {
        const newData = new levelSchema({
          guildID: message.guild.id,
          guildName: message.guild.name,
          disabled: false,
          levelupChannelID: null
        })
        newData.save();
      } else
        await sett.updateOne({
          disabled: false
        });
      message.channel.send(`✅ Leveling system enabled for **${message.guild.name}!**`);
    }

    if (command === "leaderboard" || command === 'lb') {
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
      const msg = await message.channel.send("*Fetching....*");
      const rawLead = await Levels.fetchLeaderboard(message.guild.id, 5);
      if (rawLead.length < 1)
        return message.channel.send("Nobody's in leaderboard yet!");
      const leaderboard = await Levels.computeLeaderboard(
        client,
        rawLead,
        true
      );
      const lb = leaderboard.map(
        (e) =>
          `**${e.position}. ${e.username}#${e.discriminator}**\nLevel: ${e.level
          }\nXP: ${e.xp.toLocaleString()}`
      );
      const embed = new Discord.MessageEmbed()
        .setTitle(`Leaderboard - ${message.guild.name}`)
        .setDescription(`${lb.join("\n\n")}`)
        .setTimestamp()
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter('Top 5 members on my leaderboard')
      setTimeout(() => {
        message.channel.send(embed) && msg.delete();
      }, 945);
    }

    if (command === "rank") {
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
      const target = message.mentions.users.last() || message.author;
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
      const rawLead = await Levels.fetchLeaderboard(message.guild.id, 20);
      const leaderboard = await Levels.computeLeaderboard(
        client,
        rawLead,
        true
      );
      const userrank = leaderboard.find((uss) => uss.userID === target.id);
      const ran = userrank.position;
      const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ format: "png", dynamic: false }))
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRank(ran)
        .setBackground(
          "IMAGE",
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c06b3b51-ba2c-4c06-9888-9449505542a6/dcgnqwv-4d8b0f18-1c6a-4ec8-a7a9-a19a954b846b.png/v1/fill/w_700,h_250,q_80,strp/anime_fairy_girl_signature_by_akumu7261_dcgnqwv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0yNTAiLCJwYXRoIjoiXC9mXC9jMDZiM2I1MS1iYTJjLTRjMDYtOTg4OC05NDQ5NTA1NTQyYTZcL2RjZ25xd3YtNGQ4YjBmMTgtMWM2YS00ZWM4LWE3YTktYTE5YTk1NGI4NDZiLnBuZyIsIndpZHRoIjoiPD03MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.iTOmY9Li8gGeEw52OHxj95kz3S-YUPJL6tGrrp2rXtc"
        )
        .setRequiredXP(neededxp)
        .setStatus(target.presence.status)
        .setProgressBar("#8bf533", "COLOR")
        .setUsername(target.username)
        .setDiscriminator(target.discriminator);
      rank.build().then((data) => {
        const attachment = new Discord.MessageAttachment(data, "card.png");
        message.channel.send(attachment);
      });
    }

    if (command === 'set-welcome') {
      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('❌ **You are missing `MANAGE_GUILD` permissions!**');
      const chain = message.mentions.channels.first();
      if (!chain) return message.channel.send('❌ **Please provide a channel!**\nExample usage - `setwelcome #welcome`');
      await welcomeSchema.findOneAndUpdate({
        guildID: message.guild.id,
        guildName: message.guild.name
      }, {
        guildID: message.guild.id,
        guildName: message.guild.name,
        channelID: chain.id,
      }, {
        upsert: true
      });
      message.channel.send(`✅ **Welcome message set for** ${chain} !`) && console.log(`Welcome message set for ${message.guild.name} in channel ${chain}`);
    }
    if (command === 'disable-welcome') {
      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('❌ **You are missing `MANAGE_GUILD` permissions!**');
      await welcomeSchema.deleteOne({
        guildID: message.guild.id,
      })
      message.channel.send(`Welcome messages disabled for **${message.guild.name}**.`) && console.log(`Deleted ${message.guild.name} welcome message`);
    }
    if (command === 'disablelogs') {
      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('❌ **You are missing `MANAGE_GUILD` permissions!**')
      await LogsSchema.deleteOne({
        guildID: message.guild.id
      });
      message.channel.send(`✅ Logs disabled for **${message.guild.name}**`);
    }

    if (command === 'test-welcome' || command === 'welcome-test') {
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext("2d");

      const background = await Canvas.loadImage("https://static.icy-veins.com/forum-files/news/46634-class-changes-preview-in-wow-shadowlands-700x250.jpg");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#74037b";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.font = "28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`Welcome to the server,\n${message.guild.memberCount}th member!`, canvas.width / 2.7, canvas.height / 3.7);

      ctx.font = applyText(canvas, `${message.member.displayName}!`);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${message.member.displayName}!`,
        canvas.width / 2.7,
        canvas.height / 1.5
      );

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(
        message.author.displayAvatarURL({ size: 2048, format: "jpg" })
      );
      ctx.drawImage(avatar, 25, 25, 200, 200);

      var attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "welcome-image.png"
      );
      const ebed = new Discord.MessageEmbed()
        .setTitle(`Welcome ${message.member.displayName} to ${message.guild.name}!`)
        .setFooter(`Total members: ${message.guild.memberCount} members!`)
        .setTimestamp()
        .setDescription(
          `Welcome ${message.member} to ${message.guild.name}! You are **${message.guild.memberCount}th** member in this server!`
        )
        .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
        .attachFiles([attachment])
        .setColor("RANDOM")
        .setImage(`attachment://welcome-image.png`);
      message.channel.send(ebed);
      message.channel.send('✅ **Done!**');
    }
    if (command === "stats" || command === "statistics") {
      const dura = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const { stripIndent } = require("common-tags");
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      const clientStats = stripIndent`
                     Servers   :: ${client.guilds.cache.size}
                     Users     :: ${client.users.cache.size}
                     Channels  :: ${message.client.channels.cache.size}
                     WS Ping   :: ${Math.round(message.client.ws.ping)}ms
                     Uptime    :: ${dura}
    `;
      const { totalMemMb, usedMemMb } = await mem.info();
      const duration = moment
        .duration(os.uptime())
        .format(" D [days], H [hrs], m [mins], s [secs]");
      const serverStats = stripIndent`
                     OS        :: ${await os.oos()}
                     CPU       :: ${cpu.model()}
                     Cores     :: ${cpu.count()}
                     CPU Usage :: ${await cpu.usage()} %
                     RAM       :: ${totalMemMb} MB
                     RAM Usage :: ${usedMemMb} MB
                     Uptime    :: ${duration}
                     
    `;
      const duration2 = moment
        .duration(client.uptime)
        .format(" D [days], H [hrs], m [mins], s [secs]");
      const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.tag} statistics`)
        .addFields(
          { name: "**⬆ Uptime**", value: `${duration2}`, inline: true },
          {
            name: "💻 **Memory Usage**",
            value: `${Math.round(used * 100) / 100} MB`,
            inline: true,
          },
          {
            name: "**🧾 Library**",
            value: `[discord.js](https://discord.js.org/)`,
            inline: true,
          },
          {
            name: "**🔗 Source Code**",
            value: "[Github.com](https://github.com/DerpCoders/fab-main-js)",
            inline: true,
          },
          {
            name: "**📆 Created at**",
            value: `**${client.user.tag
              }** was created on **${client.user.createdAt.toLocaleString()}**`,
            inline: true,
          },
          {
            name: "**🎉 Top.gg**",
            value: `[View here](https://top.gg/bot/759762948016177195)`,
            inline: true,
          },
          {
            name: "**👨 Client**",
            value: `\`\`\`asciidoc\n${clientStats}\`\`\``,
            inline: false,
          },
          {
            name: "**⚙ Server**",
            value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
            inline: true,
          }
        )
        .setColor("26fc98")
        .setFooter("© 2019-2021 Hey Fab, I'mma kill you#0640");

      let msg = await message.channel.send("*Collecting information....*");

      message.channel.startTyping();
      setTimeout(() => {
        message.channel.stopTyping();
        message.channel.send(embed) && msg.delete()
      }, 3569);
    }

    if (command === "owner") {
      message.channel.send(
        `Owner of this server(guild) is - **${message.guild.owner.user.username}**`
      );
    }

    if (command === "softunban" || command === "sftunban") {
      const banuser = message.mentions.members.last();
      const ro = message.guild.roles.cache.find((rol) => rol.name === "Banned");
      const memm = message.guild.roles.cache.find((r) =>
        r.name.toLowerCase().includes("members")
      );
      if (!banuser) return;
      if (!memm) return;
      if (!ro) return message.channel.send("There is no Banned role!");
      if (!banuser.roles.cache.some((rol) => rol.name === "Banned"))
        return message.channel.send("That member is not banned");
      banuser.roles.remove(ro) &&
        message.channel.send(`Unbanned ${banuser.displayName}`) &&
        banuser.roles.add(memm) &&
        ro.delete();
    }
    if (command === 'settings') {
      let prefixA = await Guild.findOne({
        guildID: message.guild.id
      })
      let prefixS = prefixA.prefix;
      let welcomeChanneln = await welcomeSchema.findOne({
        guildID: message.guild.id
      })
      let welcomeChannel;
      if (welcomeChanneln === null) welcomeChannel = `None`;
      else welcomeChannel = `<#${welcomeChanneln.channelID}>`;
      let modScheman = await LogsSchema.findOne({
        guildID: message.guild.id
      })
      let modData;
      if (modScheman === null) modData = 'None'
      else modData = `<#${modScheman.channelID}>`;
      let db;
      const sett = await levelSchema.findOne({
        guildID: message.guild.id
      })
      if (!sett) db = 'Enabled';
      else if (sett.disabled) {
        db = 'Disabled'
      }
      else if (!sett.disabled) {
        db = 'Enabled';
      }
      let lChannel = await levelSchema.findOne({
        guildID: message.guild.id,
      })
      let cChannel;
      if (lChannel.levelupChannelID === null) cChannel = 'None';
      else cChannel = `<#${lChannel.levelupChannelID}>`;
      const embed = new Discord.MessageEmbed()
        .addFields(
          { name: 'Prefix-', value: `${prefixS}`, inline: true },
          { name: 'Welcome channel-', value: `${welcomeChannel}`, inline: true },
          { name: 'Logs channel-', value: `${modData}`, inline: true },
          { name: 'Leveling system-', value: `${db}`, inline: true },
          { name: 'Level up channel-', value: `${cChannel}`, inline: true }
        )
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTitle(`⚙️ Settings - ${message.guild.name}`)
      message.channel.send(embed);
    }
    if (command === "uptime") {
      const duration = moment
        .duration(client.uptime)
        .format(" D [days], H [hrs], m [mins], s [secs]");

      const utEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.user.tag}'s uptime!`)
        .setDescription(`I've been running for **${duration}** `)
        .setFooter(
          `Last started ${startDate}`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      message.channel.send(utEmbed);
    }
    if (command === "avatar" || command === "av") {
      const user = message.mentions.users.last() || message.author;
      const avatarEmbed = new Discord.MessageEmbed()
        .setColor("#29e47d")
        .setAuthor(
          user.tag,
          user.displayAvatarURL({ size: 2048, dynamic: true })
        )
        .setDescription("**Avatar**")
        .setTimestamp()
        .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }));
      message.channel.send(avatarEmbed);
    }

    if (command === "invite" || command === "inv") {
      let bed = new MessageEmbed()
        .setColor("#444444")
        .setTitle("Invite Link!")
        .setDescription(
          "[Invite](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=339078271&scope=bot%20applications.commands)"
        );
      message.channel.send(bed);
    }
    if (message.content.toLowerCase() === prefix + "help us" || message.content.toLowerCase() === '`help us') {
      const pagination = require('discord.js-pagination');
      const startup = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`React to ◀ and ▶ to change pages\n**Commands are still being added**\nUse \`${prefix}help<command>\` for more info about a command.`)
        .setTitle(`Commands, prefix is ${prefix}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
      const mod = new Discord.MessageEmbed()
        .setTitle('⛔ Moderation -')
        .setThumbnail('https://i.imgur.com/O3DHIA5.gif?noredirect')
        .addFields(
          { name: 'ban', value: `\`ban\` command is used for banning any guild member with a DM to the member banned (Reason is optional)`, inline: true },
          { name: 'softban', value: `\`softban\` command is used for banning any member but that member is not banned from the guild. He/she can\'t send any messages.`, inline: true },
          { name: 'kick', value: "`kick` command is used for kicking any guild member with a DM to the member banned (Reason is optional)", inline: true },
          { name: 'poll', value: "`poll` command is used to create polls with reactions YES, NO or OTHER.", inline: true },
          { name: 'clear', value: "`clear` command is used for deleting multiple messages at a time.", inline: true },
          { name: 'warn', value: '`warn` command is used for warning any member with reason, Fab will DM that member with reason and moderator name.', inline: true },
          { name: 'bcount', value: "`bcount` command sends number of banned members in the guild.", inline: true },
          { name: 'serverinfo', value: "`serverinfo` command will send a neat embed with all information about a guild.", inline: true },
          { name: 'userinfo', value: "`userinfo` command is used for getting detailed info about a member/user in a neat embed.", inline: true },
          { name: 'settings', value: '`settings` command will send an embed with details/settings of your server, for example Logs channel, welcome channel, etc.', inline: true }
        )
        .setDescription(`**For more info about a command type ${prefix}help<command> **`)
        .setColor('RED')
        .setFooter('Commands are still being added')
        .setTimestamp()
      const cl = require('nekos.life');
      const nekos = new cl
      const image = await nekos.sfw.slap();
      const fun = new Discord.MessageEmbed()
        .setTitle('🏃‍♀️ Fun-')
        .setThumbnail(image.url)
        .addFields(
          { name: 'npm', value: '`npm` command is used for searching packages through NPM website.', inline: true },
          { name: 'youtube', value: "`youtube` or `yt` command will send a youtube link based on your arguments.", inline: true },
          { name: 'gis', value: "`gis` stands for *Google Image Search* that uses Google's API to search for images.", inline: true },
          { name: 'news', value: '`news` command sends a random latest news from reddit.', inline: true },
          { name: 'joke', value: '`joke` command sends you a random joke.', inline: true },
          { name: 'advice', value: '`advice` command sends you a random advice.', inline: true },
          { name: 'kpop', value: '`kpop` sends a random kpop image.', inline: true },
          { name: 'kiss', value: '`kiss` command sends a random kiss gif!', inline: true },
          { name: 'punch', value: '`punch` command sends a random punch gif!', inline: true },
          { name: 'pat', value: '`pat` command sends a random pat gif!', inline: true },
          { name: 'slap', value: '`slap` command sends a random slap gif!', inline: true },
          { name: 'spank', value: '`spank` command sends a random spank gif (BUT NOT NSFW)!', inline: true },
          { name: 'poke', value: '`poke` command sends a random poke gif!', inline: true },
          { name: 'hug', value: '`hug` command sends a random hug gif!', inline: true },
          { name: 'avatar', value: '`avatar` command sends avatar of mentioned user or the message author', inline: true },
        )
        .setDescription(`**For more info about a command type ${prefix}help<command> **`)
        .setColor('BLUE')
        .setFooter('Commands are still being added')
        .setTimestamp()
      const level = new Discord.MessageEmbed()
        .setTitle('💎 Leveling system-')
        .setColor('GREEN')
        .addFields(
          { name: 'rank', value: '`rank` command sends your rank card with XP and Level!', inline: true },
          { name: 'leaderboard', value: '`leaderboard` command sends leaderboard of top 5 members in the guild!', inline: true },
          { name: 'lb', value: '`lb` command tells your or mentioned members\'s position on leaderboard for your server!', inline: true },
        )
        .setDescription(`**For more info about a command type ${prefix}help<command> **`)
        .setTimestamp()
      const games = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('🏓 Games-')
        .addFields(
          { name: 'battle', value: '`battle` command starts a battle between message author and mentioned user', inline: true },
          { name: 'ispy', value: '`ispy` command starts a game of ispy between message author and mentioned user', inline: true }
        )
        .setColor('RANDOM')
        .setDescription(`**For more info about a command type ${prefix}help<command> **`);
      const music = new Discord.MessageEmbed()
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
        )
        .setDescription(`**For more info about a command type ${prefix}help<command> **`)
        .setThumbnail('https://media2.giphy.com/media/tqfS3mgQU28ko/giphy.gif')
        .setColor('CYAN')
        .setTimestamp()
      const pages = [
        startup,
        mod,
        fun,
        level,
        games,
        music
      ]
      const emojilist = ['◀', '▶'];
      const time = '120000';
      pagination(message, pages, emojilist, time);
    }

    if (command === "reactions") {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send("❌ **You can't use that!**");
      let rEmbed = new Discord.MessageEmbed()
        .setTitle("React to get free roles!!")
        .setDescription(
          "```-React to get yourself a free role!```\n**-If you want to remove any role go ahead and unreact!**\n\n <:discord:758707913081487380> to get role: `Active on Discord`"
        )
        .setColor("GREEN");
      let msgEmbed = await message.channel.send(rEmbed);
      msgEmbed.react("758707913081487380");
    }
    if (command === "restart") {
      if (message.author.id != "624067420625305600") return;

      setTimeout(async () => {
        await process.exit();
      }, 2000);
      message.channel.send(
        `Process exited, Restarting...`
      );
    }
  } catch (err) {
    return (
      message.channel.send(
        `❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``
      ) && console.log(err)
    );
  }
});
function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id)
    return;
  }
  const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift()
      play(guild, serverQueue.songs[0])
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  const embed = new Discord.MessageEmbed()
    .setTitle(`Playing - `)
    .setDescription(`🎵 ${serverQueue.songs[0].title}\n\n⏲ **Duration -**\n${serverQueue.songs[0].duration}`)
    .setThumbnail(`${serverQueue.songs[0].thumbnail}`)
    .setColor('e72929')
    .setFooter(`Requested by - ${serverQueue.songs[0].reqBy.username}`, serverQueue.songs[0].reqBy.displayAvatarURL({ dynamic: true }));
  serverQueue.textChannel.send(embed);
}
async function finder(artist, songName, message, pages) {
  let fulllyrics = await lyricsFinder(artist, songName) || "Not found any song!"
  for (let i = 0; i < fulllyrics.length; i += 2048) {
    const lyric = fulllyrics.substring(i, Math.min(fulllyrics.length, i + 2048))
    const msg = new Discord.MessageEmbed()
      .setDescription(lyric)
      .setColor('ffee5a')
      .setTitle(`Lyrics - ${songName}`)
      .setFooter('Source: Genius lyrics', 'https://www.pinclipart.com/picdir/middle/59-598221_genius-lyrics-logo-transparent-clipart.png')
    pages.push(msg);
  }
}
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id === "758704935780089886") {
    if (reaction.emoji.name === "discord") {
      const roleid = "758703665460281397";
      await reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
    }
  }
  if (reaction.message.channel.id === "729347822230700074") {
    if (reaction.emoji.name === "white_check_mark") {
      await reaction.message.channel.send("Process exited with status 69");
      await process.exit();
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id === "758704935780089886") {
    if (reaction.emoji.name === "discord") {
      const roleid = "758703665460281397";
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(roleid);
    }
  }
  if (reaction.message.channel.id === "729347822230700074") {
    if (reaction.emoji.name === "white_check_mark") {
      await reaction.message.channel.send(
        "Process exited with status " + exitCode
      );
    }
  }
});

client.on("guildCreate", (guild) => {
  console.log(`Joined a new guild: "${guild.name}"`);
  const chh = guild.systemChannel;
  if (!chh) return;
  chh.send(
    "**Thanks for adding me!** <a:Hey:766884642241511444>\n**1)** *My prefix is* ` [CUSTOMIZABLE]\n**2)** *You can get a list of commands by running ||<prefix>help|| command.*\n**3)** *If you need any help or report issues join our support server - discord.gg/r2sqEsV*\n**4)** *Mention me @Fab for more information*"
  );
  chh.send("<:happy:731417035128569907> ");
  client.users.fetch("570895295957696513").then((user) => {
    user.send(`Joined a new guild: "${guild.name}"`);
  });
});

client.on("guildDelete", (guild) => {
  console.log(`I was kicked/banned from: "${guild.name}" :(`);
  client.users.fetch("570895295957696513").then((user) => {
    user.send(`I was kicked/banned from: "${guild.name}" :(`);
  });
});

client.on('guildBanAdd', async (guild, user) => {
  const sett = await LogsSchema.findOne({
    guildID: guild.id,
  });
  if (!sett) return;
  if (guild.id === sett.guildID) {
    let chann = guild.channels.cache.find(chain => chain.id === sett.channelID);
    let embed = new Discord.MessageEmbed()
      .setTitle(`Member banned ${user.tag}`)
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setColor('RED')
      .setDescription(`**Member banned ${user.username}**\n\n**ID:** ${user.id}\n\n**Reason:** ${(await guild.fetchBan(user)).reason}`)
      .setFooter(`${new Date}`)
    chann.send(embed);
  } else return;
});

client.on('guildBanRemove', async (guild, user) => {
  const sett = await LogsSchema.findOne({
    guildID: guild.id
  });
  if (!sett) return;
  if (guild.id === sett.guildID) {
    let chann = guild.channels.cache.find(chain => chain.id === sett.channelID);
    let embed = new Discord.MessageEmbed()
      .setTitle(`Member unbanned ${user.tag}`)
      .setColor('GREEN')
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setDescription(`**Member unbanned ${user.username}**\n\n**ID:** ${user.id}`)
      .setFooter(`${new Date}`)
    chann.send(embed);
  } else return;
});

client.on('messageDelete', async (message) => {
  const sett = await LogsSchema.findOne({
    guildID: message.guild.id,
  });
  if (!sett) return;
  if (message.guild.id === sett.guildID) {
    let chann = message.guild.channels.cache.find(chain => chain.id === sett.channelID);
    let embed = new Discord.MessageEmbed()
      .setTitle(`Message deleted in ${message.channel.name}`)
      .setColor('RED')
      .setDescription(`Message deleted in <#${message.channel.id}> sent by **${message.author}**\n\n**Message-**\n${message.content}`)
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
    chann.send(embed);
  } else return;
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const Settings = await LogsSchema.findOne({
    guildID: oldMember.guild.id,
  });
  if (!Settings) return;
  let title;
  let channel = oldMember.guild.channels.cache.find(chain => chain.id === Settings.channelID);
  let change;
  if (oldMember.user.avatarURL() !== newMember.user.avatarURL()) change = `**${newMember.user.tag}** changed their avatar.\n[Old avatar](${oldMember.user.displayAvatarURL({ dynamic: true })}) => [New avatar](${newMember.user.displayAvatarURL({ dynamic: true })})`, title = `Avatar changed - ${newMember.user.tag}`
  if (oldMember.nickname !== newMember.nickname) change = `**Nickname changed:** \n**${oldMember.nickname}** => **${newMember.nickname}**`, title = `Nickname changed - ${newMember.user.tag}`;
  if (oldMember.roles.cache.size > newMember.roles.cache.size) change = `Role removed from ${newMember.user.username} `, title = `Role removed - ${newMember.user.tag}`;
  if (oldMember.user.discriminator !== newMember.user.discriminator) change = `**Discriminator changed: **\n\`${oldMember.user.discriminator}\`=> \`${newMember.user.discriminator}\``, title = `Discriminator changed - ${newMember.displayName}`;
  const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
    .setFooter('ID: ' + oldMember.user.id)
    .setColor('RANDOM')
    .setTimestamp()
    .setDescription(`${change}\n**Time: **${new Date()}`)
  channel.send(embed)
});