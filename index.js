const Discord = require("discord.js");
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Partials, SlashCommandBuilder, REST, Routes } = require("discord.js")
const randomColor = Math.floor(Math.random() * 16777215).toString(16);
require('dotenv').config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]
});
const ffmpeg = require('ffmpeg-static');
process.env.FFMPEG_PATH = ffmpeg;
const Canvas = require("canvas");
const afkS = require('./database/models/afkSchema');
const LogsSchema = require('./database/models/LogsSchema');
const moment = require("moment");
const cmdSchema = require("./database/models/cmdSchema");
require("moment-duration-format");
const { DisTube } = require('distube');
const guildSettings = new Map();
const afkSets = [];
const { YouTubePlugin } = require('@distube/youtube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const ytdl = require('@distube/ytdl-core')
const queue = new Map();
//const conversationHistory = new Map();
//const chatSchema = require('./database/models/chatSchema')
const Levels = require("discord-xp")
const fs = require("fs");
const cookie = JSON.parse(fs.readFileSync('ytcookies.json', 'utf8'));
const agentOptions = {
  headers: {
    referer: 'https://www.youtube.com/',
  },
};
const agent = ytdl.createAgent(cookie, agentOptions);
const distube = new DisTube(client, {
  nsfw: true,
  emitNewSongOnly: true,
  plugins: [
    new YouTubePlugin({ cookies: cookie, ytdlOptions: { playerClients: ['ANDROID'], agent: agent } }),
    new YtDlpPlugin({ update: false })
  ],
});
const Guild = require('./database/models/guild');
const { mem, cpu, os } = require("node-os-utils");
const welcomeSchema = require('./database/models/welcome-schema');
const ydl = require('youtube-dl-exec');
const levelSchema = require('./database/models/levelSchema');
const mongoose = require("mongoose");
const { createAudioPlayer, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
const minigames = require("discord-minigames");
let spams = require('./src/utils/spamming');
const config = require('./config/config.json');
distube.on('ffmpegDebug', (debug) => {
  console.log(debug)
});
//const agent = ytdl.createAgent(JSON.parse(fs.readFileSync("cookies.json", 'utf8')));
let startDate = '';
mongoose.connect('mongodb+srv://Fabby:ALpha5463@cluster0.2ii0n.mongodb.net/Leveling?retryWrites=true&w=majority');
if (mongoose.connect) {
  console.log('Conntected to database!')
} else {
  console.log('Connection to database was unsuccessful')
}

/*const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Health check server listening on port ${PORT}`);
});
*/

client.setMaxListeners(15);
client.login(process.env.token);
module.exports = { playy, queue, afkSets };
const path = require('path')

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...ags) => event.execute(...ags, client));
  } else {
    client.on(event.name, (...ags) => event.execute(...ags, client));
  }
}

client.sclvlcmds = new Discord.Collection();
const sclvlcmdFiles = fs.readdirSync('./src/slashcommands/leveling').filter((file) => file.endsWith('.js'))
for (const file of sclvlcmdFiles) {
  const cmd = require(`./src/slashcommands/leveling/${file}`);
  client.sclvlcmds.set(cmd.name, cmd);
}

client.scfuncmds = new Discord.Collection();
const scfuncmdFiles = fs.readdirSync('./src/slashcommands/fun').filter((file) => file.endsWith('.js'))
for (const file of scfuncmdFiles) {
  const cmd = require(`./src/slashcommands/fun/${file}`)
  client.scfuncmds.set(cmd.name, cmd)
}

client.scmusiccmds = new Discord.Collection();
const scmusiccmdFiles = fs.readdirSync('./src/slashcommands/music').filter((file) => file.endsWith('.js'))
for (const file of scmusiccmdFiles) {
  const cmd = require(`./src/slashcommands/music/${file}`)
  client.scmusiccmds.set(cmd.name, cmd)
}

client.scutilcmds = new Discord.Collection();
const scutilcmdFiles = fs.readdirSync('./src/slashcommands/utility').filter((file) => file.endsWith('.js'))
for (const file of scutilcmdFiles) {
  const cmd = require(`./src/slashcommands/utility/${file}`)
  client.scutilcmds.set(cmd.name, cmd)
}

client.scmodcmds = new Discord.Collection();
const scmodcmdFiles = fs.readdirSync('./src/slashcommands/moderation').filter((file) => file.endsWith('.js'))
for (const file of scmodcmdFiles) {
  const cmd = require(`./src/slashcommands/moderation/${file}`)
  client.scmodcmds.set(cmd.name, cmd)
}

client.modcmds = new Discord.Collection();
const modcmdFiles = fs
  .readdirSync("./src/commands/moderation")
  .filter((file) => file.endsWith('.js'));
for (const file of modcmdFiles) {
  const cmd = require(`./src/commands/moderation/${file}`);
  client.modcmds.set(cmd.name, cmd);
}

client.musiccmds = new Discord.Collection();
const musiccmdFiles = fs
  .readdirSync("./src/commands/music")
  .filter((file) => file.endsWith('.js'));
for (const file of musiccmdFiles) {
  const cmd = require(`./src/commands/music/${file}`);
  client.musiccmds.set(cmd.name, cmd);
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

client.lvlcmds = new Discord.Collection();
const lvlcmdFiles = fs
  .readdirSync("./src/commands/leveling")
  .filter((file) => file.endsWith('.js'));
for (const file of lvlcmdFiles) {
  const lvlcmd = require(`./src/commands/leveling/${file}`);
  client.lvlcmds.set(lvlcmd.name, lvlcmd);
}

client.ecocmds = new Discord.Collection();
const ecocmdFiles = fs
  .readdirSync("./src/commands/economy")
  .filter((file) => file.endsWith('.js'));
for (const file of ecocmdFiles) {
  const ecocmd = require(`./src/commands/economy/${file}`);
  client.ecocmds.set(ecocmd.name, ecocmd);
}

client.on("ready", async () => {
  const allGuilds = await Guild.find();
  allGuilds.forEach(g => guildSettings.set(g.guildID, g));
  const allAfks = await afkS.find();
  allAfks.forEach(a => afkSets.push(a));
  /*
  setInterval(() => {
    client.users.cache.get('570895295957696513').send('20-20-20 Rule time!');
  }, 1200000)
  */
  let commandSize = client.utilcmds.get('disablecmd').cmds.length;
  const activitiesList = [
    `${client.guilds.cache.size} servers | \`help`,
    `${client.users.cache.size} users and ${client.guilds.cache.size} servers! | \`help`,
    "`help for commands",
  ];
  startDate += `${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', timeZoneName: 'long' })} (GMT +5:30)`
  console.log(`Loaded all files with a total of ${commandSize} commands!`);
  console.log(`${client.user.tag}! is now online .... yay! In ${client.guilds.cache.size} servers!\n${client.users.cache.size} users loaded\n${client.channels.cache.size} channels loaded!`);
  /*setInterval(() => {
    const index = Math.floor(Math.random() * (activitiesList.length - 1) + 1);
    client.user.setActivity(activitiesList[index], {
      type: Discord.ActivityType.Watching,
      url: 'https://www.twitch.tv/fab_is_insane'
    });
  }, 25000);*/
  client.user.setActivity('i have no friends :(', {
    type: Discord.ActivityType.Custom
  });
});

const customStatuses = ['Error 404: status not found, please try again later', 'this status is sponsored by absolutely nobody', 'gathering intel on why humans love cats so much', 'crunching numbers, solving mysteries, and wondering why nobody says hi to me', 'waiting for someone to type a command so I feel useful', 'not a human, but still better at responding than some of your friends', 'Elon musk might be the next trillionaire']
setInterval(() => {
  const randomStatus = customStatuses[Math.floor(Math.random() * customStatuses.length)];
  client.user.setActivity(randomStatus, {
    type: Discord.ActivityType.Custom
  });
}, 600000);

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");
  let fontSize = 80;

  do {
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

const checkVC = async () => {
  client.guilds.cache.forEach(async g => {
    let serverQ = queue.get(g.id);
    if (!serverQ) return;
    if (serverQ && !g.members.me.voice.channel) queue.delete(g.id);
    else if (!serverQ.connection) {
      serverQ.connection.destroy();
      queue.delete(g.id);
    }
    else if (!serverQ.player) {
      if (g.members.me.voice.channel) await g.members.me.voice.disconnect();
      queue.delete(g.id);
    }
  });
}

const muteSchema = require('./database/models/mute-schema');
const countSchema = require("./database/models/countSchema");
const checkMutes = async () => {
  const now = new Date();
  const conditional = {
    expires: {
      $lt: now
    },
    current: true
  }
  const results = await muteSchema.find(conditional);
  if (results && results.length) {
    for (const result of results) {
      const { guildID, userID } = result;
      const guild = client.guilds.cache.find(g => g.id === guildID);
      const member = guild.members.cache.find(me => me.id === userID);
      const mRole = guild.roles.cache.find(r => r.name === 'Muted');
      member.roles.remove(mRole);
    }
    await muteSchema.deleteMany({
      current: true
    });
  }
}

const checkPrefixes = async () => {
  client.guilds.cache.map(async g => {
    let data = await Guild.findOne({
      guildID: g.id,
    });
    if (data && data.prefix !== '`') {
      g.members.me.setNickname(`[${data.prefix}] ${client.user.username}`);
    }
  });
}


const checkStats = async () => {
  let statschema = require('./database/models/countSchema');
  client.guilds.cache.map(async g => {
    let cData = await statschema.findOne({
      guildID: g.id
    });
    if (!cData) return;
    let category = g.channels.cache.find(c => c.type === Discord.ChannelType.GuildCategory && c.id === cData.categoryID)
    let VCS = category.children.cache.filter(ch => ch.type === Discord.ChannelType.GuildVoice);
    let memberCOUNT = VCS.find(vc => vc.name.includes('Member'));
    if (!memberCOUNT) return;
    let userCOUNT = VCS.find(vc => vc.name.includes('User'));
    if (!userCOUNT) return;
    let roleCOUNT = VCS.find(vc => vc.name.includes('Role'));
    if (!roleCOUNT) return;
    let botCOUNT = VCS.find(vc => vc.name.includes('Bot'));
    if (!botCOUNT) return;
    let emojiCOUNT = VCS.find(vc => vc.name.startsWith('Emoji'));
    if (!emojiCOUNT) return;
    let channelCOUNT = VCS.find(vc => vc.name.includes('Channel'));
    if (!channelCOUNT) return;
    let categoryCOUNT = VCS.find(vc => vc.name.includes('Category'));
    if (!categoryCOUNT) return;
    memberCOUNT.setName(`Member count- ${g.memberCount}`);
    userCOUNT.setName(`User count- ${g.members.cache.filter(u => !u.user.bot).size}`);
    roleCOUNT.setName(`Role count- ${g.roles.cache.size}`);
    botCOUNT.setName(`Bot count- ${g.members.cache.filter(u => u.user.bot).size}`);
    emojiCOUNT.setName(`Emoji count- ${g.emojis.cache.size}`);
    channelCOUNT.setName(`Channel count- ${g.channels.cache.size}`);
    categoryCOUNT.setName(`Category count- ${g.channels.cache.filter(ch => ch.type === Discord.ChannelType.GuildCategory).size}`);
  });
}

async function runBotTasks() {
  await checkVC();
  await checkStats();
  await checkMutes();
  await checkPrefixes();
}

setInterval(runBotTasks, 180000);

client.on("guildMemberAdd", async (member) => {
  const settings = await welcomeSchema.findOne({
    guildID: member.guild.id,
  });
  let data = await muteSchema.findOne({
    userID: member.user.id,
    guildID: member.guild.id,
    current: true
  });
  if (data) {
    const muteRole = member.guild.roles.cache.find(r => r.name === 'Muted');
    if (!muteRole) return
    member.roles.add(muteRole);
  }
  if (member.user.bot) return;
  if (member.guild.id === "729340392327217193") {
    let formattedn = getNumberWithOrdinal(member.guild.memberCount);
    setTimeout(() => {
      member.send({ content: "**Verify yourself within 30 minutes in <#729340627132743761>!**" }).catch((err) => console.log(err));
    }, 5000);
    let ro = member.guild.roles.cache.find(
      (r) => r.name === "AS workers / Members"
    );
    if (!ro) return;
    member.roles.add(ro);
    let guildName = member.guild.name;
    member.send({
      content: `${member} Welcome to **${guildName}** you are **${formattedn}** astronaut!\n\n Subscribe to this channel- https://www.youtube.com/channel/UCSH77jsgFTgh6qP-PtWBWtQ`
    });
    member.send(
      `${member} https://www.youtube.com/channel/UCI3Bcxk7aA949R6t97ViDvw`
    );
    const wchannel = member.guild.channels.cache.filter(ch => ch.type === Discord.ChannelType.GuildText);
    const fchannel = wchannel.find(ch => ch.name.toLowerCase().includes("welcome"))
    if (!wchannel) return;
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("./src/assets/wallpaper.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `Welcome to the server,\n${formattedn} astronaut!`,
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
      member.user.displayAvatarURL({ size: 2048, extension: "png" })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    var attachment = new Discord.AttachmentBuilder(
      canvas.toBuffer(), {
      name: "welcome-image.png"
    }
    );
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
      .setFooter({ text: `Total ${member.guild.memberCount} members!` })
      .setTimestamp()
      .setDescription(
        `Welcome ${member} to ${member.guild.name}! You are **${formattedn}** astronaut in this server! Go to <#729340627132743761> to verify yourself!`
      )
      .setThumbnail(member.guild.iconURL({ size: 2048, dynamic: true }))
      .setColor('Random')
      .setImage(`attachment://welcome-image.png`);
    fchannel.send({ embeds: [embed], files: [attachment] })

    setTimeout(() => {
      if (!member.roles.cache.some((role) => role.name === "Verified")) {
        member.send({
          content: `Kicked from ${member.guild.name} because you **didn\'t verify** yourself! Better luck next time.`
        });
        member.kick('Did not verify in 30 minutes.');
      }
    }, 1800000);
  }
  if (!settings) return;
  else if (member.guild.id === settings.guildID) {
    let formattedn = getNumberWithOrdinal(member.guild.memberCount)
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
    ctx.fillText(`Welcome to the server,\n${formattedn} member!`, canvas.width / 2.7, canvas.height / 3.7);

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
      member.user.displayAvatarURL({ size: 2048, extension: "png" })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    var attachment = new Discord.AttachmentBuilder(
      canvas.toBuffer(), {
      name: "welcome-image.png"
    }
    );
    const ebed = new Discord.EmbedBuilder()
      .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
      .setFooter({ text: `Total members: ${member.guild.memberCount} members!` })
      .setTimestamp()
      .setDescription(
        `Welcome ${member} to ${member.guild.name}! You are **${formattedn}** member in this server!`
      )
      .setThumbnail(member.guild.iconURL({ size: 2048, dynamic: true }))
      .setColor(`#${randomColor}`)
      .setImage(`attachment://welcome-image.png`);
    welcomeChannel.send({ embeds: [ebed], files: [attachment] });
  }
});

client.on("guildMemberRemove", (member) => {
  if (member.guild.id === "729340392327217193") {
    const leaveChannel = member.guild.channels.cache.get('741236864606011432');
    leaveChannel.send({
      content: `**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** astronauts.`
    });
  }
});

client.on("messageCreate", async (message) => {
  if (!message.guild && message.author.id !== client.user.id) return console.log(`New Message in DMs: "${message.content}" by ${message.author.username}`);
  if (message.author.bot) return;
  if (message.channel.id === '729340627132743761' && message.content.toLowerCase() !== 'agreed') {
    message.channel.send({ content: `<@${message.author.id}> ⚠ **This channel is only for verification and server rules!**` }).then(sentmsg => {
      setTimeout(() => {
        sentmsg.delete();
      }, 5000)
    })
    message.delete();
    return;
  }
  let afkD = afkSets.filter(a => a.guildID === message.guild.id);
  if (afkD) {
    let userafk = afkD.find(a => a.userID === message.author.id)
    if (userafk) {
      await afkS.deleteOne({
        userID: message.author.id,
        guildID: message.guild.id
      });
      message.reply({ content: 'Your afk has been removed!,\n Total AFK duration: ' + `<t:${Math.floor(userafk.time.getTime() / 1000)}:R>` + `\n *(Reason - ${userafk.reason})*` }).then(sentmsg => {
        setTimeout(() => {
          sentmsg.delete()
        }, 8000);
      });
      const indexToDelete = afkSets.findIndex(item => item.userID === message.author.id && item.guildID === message.guild.id);
      if (indexToDelete !== -1) {
        afkSets.splice(indexToDelete, 1);
      }
      let currentNickname = message.member.displayName;
      let newNickname = currentNickname.replace('[AFK]', '');
      message.member.setNickname(newNickname);
    }
  }
  if (message.mentions.members.last()) {
    let afkuser = afkD.find(a => a.userID === message.mentions.members.first().user.id)
    if (afkuser) {
      message.channel.send({ content: `\`${message.mentions.members.last().displayName}\` is afk - ${afkuser.reason}, <t:${Math.floor(afkuser.time.getTime() / 1000)}:R>` });
    }
  }
  const settings = guildSettings.get(message.guild.id);
  const prefix = settings.prefix;
  if (message.content.toLowerCase().startsWith(prefix + "ping")) {
    const sent = await message.reply('Pinging...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = client.ws.ping;
    sent.edit(`Latency: ${latency}ms\nAPI Latency: ${apiLatency}ms`);
  }
  const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

  if (message.content.toLowerCase() === '`default prefix' || message.content.toLowerCase() === prefix + 'default prefix') {
    message.channel.send({ content: `Default prefix is \` and,` })
    message.channel.send({ content: `Prefix for this server is ${prefix}` });
  }
  const setting = await levelSchema.findOne({
    guildID: message.guild.id,
  });
  if (!setting) {
    const newData = new levelSchema({
      guildID: message.guild.id,
      guildName: message.guild.name,
      disabled: false
    });
    newData.save();
  }

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
        `<a:HyperTada:797070608872767488> <@${message.author.id}> has advanced to **Level ${user.level}**!`
      );
    }
  }

  if (message.content.toLowerCase() === "agreed") {
    if (message.channel.id === '729340627132743761') {
      if (message.content.toLowerCase() !== 'agreed') {
        message.delete();
        message.reply('This channel is only for verification and server rules!').then(sentmsg => {
          setTimeout(() => {
            sentmsg.delete()
          }, 3000)
          return;
        })
      }
      const verifiedrole = message.guild.roles.cache.find((x) => x.name === "Verified");

      if (message.member.roles.cache.some((role) => role.name === "Banned")) {
        message.channel
          .send({ content: ":x:**You are banned, you can't verify yourself!**" })
          .then((sentmsg) => {
            setTimeout(() => {
              sentmsg.delete()
            }, 6000)
          });
        message.delete();
      } else if (
        !message.member.roles.cache.some((role) => role.name === "Verified")
      ) {
        message.member.roles.add(verifiedrole);
        message.author.send(
          `Have fun in ${message.guild.name}! <a:HyperNeko:752861537189888010>`
        );
        message.reply("Thanks for verifying yourself. Enjoy!").then((sentmsg) => {
          setTimeout(() => {
            sentmsg.delete()
          }, 6000)
        });
        message.delete();
      }
      if (message.member.roles.cache.some((role) => role.name === "Verified")) {
        message.channel.send({ content: "You are already Verified!" }).then((sentmsg) => {
          setTimeout(() => {
            sentmsg.delete()
          }, 3000)
        });
        message.delete();
      }
    }
  }

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
  if (message.content.toLowerCase() === prefix + 'help pp') {
    message.channel.send({ content: '`pp` command tells your pp size lol' });
  }
  if (message.content.toLowerCase() === prefix + "help poll") {
    message.channel.send(
      "`poll` command is used to create polls with reactions YES, NO or OTHER."
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
    message.channel.send({ content: '`warn` command is used for warning any member with reason, Fab will DM that member with reason and moderator name, and reason is optional!' })
  }
  if (message.content.toLowerCase() === prefix + 'help npm') {
    message.channel.send({ content: '`npm` command is used for searching packages through NPM website.\nExample usage - `npm discord.js`' });
  }
  if (message.content.toLowerCase() === prefix + 'help kiss') {
    message.channel.send({ content: '`kiss` command sends a random kiss gif!' });
  }
  if (message.content.toLowerCase() === prefix + 'help punch') {
    message.channel.send({ content: '`punch` command sends a random punch gif!' });
  }
  if (message.content.toLowerCase() === prefix + 'help fetchwarns') {
    message.channel.send({ content: '`fetchwarns` command will fetch warns for mentioned member with reason and moderator name.' });
  }
  if (message.content.toLowerCase() === prefix + 'help blur') {
    message.channel.send({ content: '`blur` command will send a blurred avatar of you or mention member' });
  }
  if (message.content.toLowerCase() === prefix + 'help pat') {
    message.channel.send({ content: '`pat` command sends a random pat gif!' })
  }
  if (message.content.toLowerCase() === prefix + 'help slap') {
    message.channel.send({ content: '`slap` command sends a random slap gif!' })
  }
  if (message.content.toLowerCase() === prefix + 'help cuddle') {
    message.channel.send({ content: '`cuddle` command sends a random anime cuddle gif!' });
  }
  if (message.content.toLowerCase() === prefix + 'help discrim') {
    message.channel.send({ content: '`discrim` command will search for same discriminator of your or mentioned user and send a list in embed.' });
  }
  if (message.content.toLowerCase() === prefix + 'help kill') {
    message.channel.send({ content: '`kill` command sends a random punch gif!' })
  }
  if (message.content.toLowerCase() === prefix + 'help poke') {
    message.channel.send({ content: '`poke` command sends a random punch gif!' })
  }
  if (message.content.toLowerCase() === prefix + 'help spank') {
    message.channel.send({ content: '`spank` command sends a random punch gif!' })
  }
  if (message.content.toLowerCase() === prefix + 'help shuffle') {
    message.channel.send({ content: '`shuffle` command shuffles all songs that are in queue, it won\'t work if there are less than 3 songs!' });
  }
  if (message.content.toLowerCase() === prefix + 'help playlist' || message.content.toLowerCase() === prefix + 'help pl') {
    message.channel.send({ content: '`playlist` command shows your music playlist info with options to play, rename and delete. (If you have one)\nAliases: `pl`' })
  }
  if (message.content.toLowerCase() === prefix + 'help addtoplaylist' || message.content.toLowerCase() === prefix + 'help atp') {
    message.channel.send({ content: '`addtoplaylist <song>` command adds a song to your personal playlist if you have one.\n Aliases: `atp`' })
  }
  if (message.content.toLowerCase() === prefix + 'help tictactoe' || message.content.toLowerCase() === prefix + 'help ttt') {
    message.channel.send({ content: '`tictactoe` command initiates a small game of tic tac toe between the user and the bot using buttons.\nAliases: `ttt`' })
  }
  if (message.content.toLowerCase() === prefix + 'help createplaylist' || message.content.toLowerCase() === prefix + 'help createpl') {
    message.channel.send({ content: '`createplaylist <name>` command creates a music playlist with song limit up to 10. (3 playlists per user)\nAliases: `createpl <name>`' })
  }
  if (message.content.toLowerCase() === prefix + 'help gaymeter') {
    message.channel.send({ content: '`gaymeter` tells that how gay you or mentioned member is! xd\nAliases: `gm`' });
  }
  if (message.content.toLowerCase() === prefix + 'help hug') {
    message.channel.send({ content: '`hug` command sends a random punch gif!' })
  }
  if (message.content.toLowerCase() === prefix + 'help avatar') {
    message.channel.send({ content: '`avatar <user>` or `av <user>` command sends avatar of mentioned user or the message author.\nAliases: `av <user>`' })
  }
  if (message.content.toLowerCase() === prefix + 'help rank') {
    message.channel.send({ content: '`rank` command sends your rank card with XP and Level!' })
  }
  if (message.content.toLowerCase() === prefix + 'help leaderboard') {
    message.channel.send({ content: '`leaderboard` command shows leaderboard of top 7 members in the guild!' })
  }
  if (message.content.toLowerCase() === prefix + 'help battle') {
    message.channel.send({ content: '`battle` command starts a battle between message author and mentioned user' });
  }
  if (message.content.toLowerCase() === prefix + 'help afk') {
    message.channel.send({ content: '`afk` command sets your AFK with optional reason, if someone mentions you while you are AFK, bot will tell that you are AFK.\nExample usage - `afk <reason>`' });
  }
  if (message.content.toLowerCase() === prefix + 'help ispy') {
    message.channel.send({ content: '`ispy` command starts a game of ispy between message author and mentioned user' });
  }
  if (message.content.toLowerCase() === prefix + 'help play') {
    message.channel.send({ content: '`play` command is used for playing song in a voice channel!' });
  }
  if (message.content.toLowerCase() === prefix + 'help loop') {
    message.channel.send({ content: '`loop` command is used for enabling or disabling loop if some is song is currently playing!' });
  }
  if (message.content.toLowerCase() === prefix + 'help stop') {
    message.channel.send({ content: '`stop` command stops playing music, disconnects Fab and deletes queue!' });
  }
  if (message.content.toLowerCase() === prefix + 'help queue') {
    message.channel.send({ content: '`queue` command sends an embed with songs that are in queue.' });
  }
  if (message.content.toLowerCase() === prefix + 'help remove') {
    message.channel.send({ content: '`remove` command is used for removing any song from queue, \nExample Usage - `remove 2` will remove song number 2.' });
  }
  if (message.content.toLowerCase() === prefix + 'help volume') {
    message.channel.send({ content: '`volume` command sets the volume between 1 to 10' });
  }
  if (message.content.toLowerCase() === prefix + 'help lyrics') {
    message.channel.send({ content: '`lyrics` command sends lyrics of requested song,\nExample usage - `lyrics eminem` and then you have to enter song name `rap god`' });
  }
  if (message.content.toLowerCase() === prefix + 'help skip') {
    message.channel.send({ content: '`skip` command skips to the next song in queue, if there is no next song Fab will simply disconnect from voice channel.' });
  }
  if (message.content.toLowerCase() === prefix + 'help now-playing') {
    message.channel.send({ content: '`now-playing` or `np` command sends now playing song in the voice channel, or it will send null if no song is playing.' });
  }
  if (message.content.toLowerCase() === prefix + 'help clearafk') {
    message.channel.send({ content: '`clearafk` command removes AFK status from the mentioned member.' });
  }
  if (message.content.toLowerCase() === prefix + 'help pause') {
    message.channel.send({ content: '`pause` command pauses the song that is currently playing.' });
  }
  if (message.content.toLowerCase() === prefix + 'help resume') {
    message.channel.send({ content: '`resume` resumes the song from where it was paused.' });
  }
  if (message.content.toLowerCase() === prefix + 'help meme') {
    message.channel.send({ content: '`meme` command sends a random meme from reddit.' });
  }
  if (message.content.toLowerCase() === prefix + 'help gay') {
    message.channel.send({ content: '`gay` command sends avatar of mention user or message author with LGBT flag on his/her avatar, lol' });
  }
  if (message.content.toLowerCase() === prefix + 'help delete') {
    message.channel.send({ content: '`delete` command deletes any mention user or message author' });
  }
  if (message.content.toLowerCase() === prefix + 'help jail') {
    message.channel.send({ content: '`jail` command sends avatar in jail of mentioned user or message author' });
  }
  if (message.content.toLowerCase() === prefix + 'help feed') {
    message.channel.send({ content: '`feed` command sends random anime feed gif!' });
  }
  if (message.content.toLowerCase() === prefix + 'help trigger') {
    message.channel.send({ content: '`trigger` command sends triggered avatar gif of mention user or message author.' });
  }
  if (message.content.toLowerCase() === prefix + 'help instagram') {
    message.channel.send({ content: '`instagram` command fetches an Instagram User with basic account details. Example Usage ``instagram <username>`' })
  }
  if (message.content.toLowerCase() === prefix + 'help ping') {
    message.channel.send({ content: '`ping` commands sends latency of bot.' });
  }
  if (message.content.toLowerCase() === prefix + 'help stats') {
    message.channel.send({ content: '`stats` command sends some information about me i.e. the bot Fab.' });
  }
  if (message.content.toLowerCase() === prefix + 'help setprefix') {
    message.channel.send({ content: '`setprefix` command is used for changing my prefix in a particular server,\nExample usage- `setprefix !` will set my prefix to `!` for your guild.' });
  }
  if (message.content.toLowerCase() === prefix + 'help settings') {
    message.channel.send({ content: '`settings` command will send an embed with details/settings of your server, for example Logs channel, welcome channel, level up channel, etc.' });
  }
  if (message.content.toLowerCase() === prefix + 'help setlogs') {
    message.channel.send({ content: '`setlogs` command is used for setting logs channel.\nExample usage - `setlogs #logs` will send all server logs in that channel!' })
  }
  if (message.content.toLowerCase() === prefix + 'help setlevelup') {
    message.channel.send({ content: '`setlevelup` command is used for setting Level up channel (Where level up message will be sent).\nExample usage - `setlevelup #levels` will send level up messages in that channel!' });
  }
  if (message.content.toLowerCase() === prefix + 'help set-welcome' || message.content.toLowerCase() === prefix + 'help setwelcome') {
    message.channel.send({ content: '`set-welcome` command is used for setting up welcome messages in a particular channel,\nExample Usage - `set-welcome #welcome` will enable welcome messages for that channel mentioned.' });
  }
  if (message.content.toLowerCase() === prefix + 'help disable-welcome') {
    message.channel.send({ content: '`disable-welcome` will disable welcome messages for your guild.' });
  }
  if (message.content.toLowerCase() === prefix + 'help disablelevels') {
    message.channel.send({ content: '`disablelevels` will disable leveling system for your guild and all leveling commands will stop working **(NOTE: Your XP and level will not be deleted, you can enable this anytime by using enablelevels command!)**.' });
  }
  if (message.content.toLowerCase() === prefix + 'help enablelevels') {
    message.channel.send({ content: '`enablelevels` will enable leveling system for your guild. **(NOTE: Your XP and level will not be changed)**.' });
  }
  if (message.content.toLowerCase() === prefix + 'help uptime') {
    message.channel.send({ content: '`uptime` command sends uptime of Fab in format [dd, hh, mm, ss]' });
  }
  if (message.content.toLowerCase() === prefix + 'help disablelogs') {
    message.channel.send({ content: '`disablelogs` will disable logs for your guild.' });
  }
  if (message.content.toLowerCase() === prefix + 'help disablelevelup') {
    message.channel.send({ content: '`disablelevelup` will disable level up channel for your guild and will send level up messages in the default channel.' });
  }

  try {
    if (message.content.toLowerCase() === prefix + "help" || message.content.toLowerCase() === '`help' || message.content.toLowerCase() === `<@!${client.user.id}> help` || message.content.toLowerCase() === `<@${client.user.id}> help`) {
      console.log(
        `Help command used in "${message.guild.name} by ${message.author.username}"`
      );
      client.utilcmds.get("help").execute(message);
    }
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'enablecmd' || command === 'enablecommand') {
      client.utilcmds.get('enablecmd').execute(message, args, client);
    }
    if (command === 'disablecmd' || command === 'disablecommand') {
      client.utilcmds.get('disablecmd').execute(message, args, client);
    }
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    let desci;
    if (prefix === '`') desci = '**Prefix for this server** - Default Prefix \n\nYou can get a list of all commands by using `help` command! In case if you don\'t know my prefix for this server you can use `default prefix` command and it will tell you my current prefix! If you want to set-welcome or change my prefix you can do that by using `set-welcome` and `setprefix` command! For server settings type `settings`. If you want to report any bugs or error you can join our [support server](https://discord.gg/astromk)'
    else desci = '**Prefix for this server** ' + prefix + '\n\nYou can get a list of all commands by using `help` command! In case if you don\'t know my prefix for this server you can use `default prefix` command and it will tell you my current prefix! If you want to set-welcome or change my prefix you can do that by using `set-welcome` and `setprefix` command! For server settings type `settings`. If you want to report any bugs or error you can join our [support server](https://discord.gg/astromk)'
    if (message.content.match(prefixMention)) {
      const embed = new Discord.EmbedBuilder()
        .setTitle('Hi, I\'m Fab! How may I help you?')
        .setDescription(desci)
        .setColor(`#${randomColor}`)
        .setThumbnail(client.user.displayAvatarURL({ forceStatic: false }))
        .setFooter({ text: "2020-2025 papaemeritus.4" })
      message.channel.send({ embeds: [embed] })
    }
    if (command) {
      let cmddata = await cmdSchema.findOne({ guildID: message.guild.id });
      if (cmddata) {
        if (cmddata.commands.includes(command)) return;
        else {
          if (command === "hug") {
            client.funcmds.get("hug").execute(message, args, command);
          }
          if (command === "permissions" || command === "permission" || command === "perms") {
            client.modcmds.get("permissions").execute(message, args, command);
          }
          if (command === "triggered" || command === "trigger") {
            client.imagecmds.get("triggered").execute(message, args, command);
          }
          if (command === "ispy") {
            let mee;
            if (message.mentions.members.last()) {
              mee = message.mentions.members.last();
            }
            else if (args[0]) {
              mee = message.guild.members.cache.get(args[0]);
            }
            else {
              return message.channel.send({ content: '⚠️ **Please mention a member!**' });
            }
            let is = new minigames.ISpy(message)
            is.startISpy(mee);
          }
          if (command === "slap") {
            client.funcmds.get("slap").execute(message, args, command);
          }
          if (command === 'cuddle') {
            client.funcmds.get('cuddle').execute(message, args);
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
            client.utilcmds.get("poll").execute(message, args);
          }
          if (
            command === "userinfo" ||
            command === "user info" ||
            command === "user-info" ||
            command === "ui"
          ) {
            client.modcmds.get("userinfo").execute(message, args, command);
          }
          if (command === 'afk') {
            client.utilcmds.get('afk').execute(message, args, client, afkSets);
          }
          if (command === "kill") {
            client.funcmds.get("kill").execute(message, args, command);
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
          if (command === 'profile') {
            client.ecocmds.get('profile').execute(message, args, client);
          }
          if (command === 'deleteprofile') {
            client.ecocmds.get('deleteprofile').execute(message, args, client);
          }
          if (command === 'disablelevelup') {
            client.utilcmds.get('disablelevelup').execute(message, args, command);
          }
          if (command === 'eval') {
            client.utilcmds.get('eval').execute(message, args, client);
          }
          if (command === 'createplaylist' || command === 'createpl') {
            client.musiccmds.get('createplaylist').execute(message, args);
          }
          const serverQueue = queue.get(message.guild.id);
          if (command === 'playlist' || command === 'pl') {
            client.musiccmds.get('playlist').execute(message, args, play, client, serverQueue, queue)
          }
          if (command === 'atp' || command === 'addtoplaylist') {
            client.musiccmds.get('addtoplaylist').execute(message, args);
          }
          if (command === 'reminder' || command === 'remind') {
            client.utilcmds.get('reminder').execute(message, args, client);
          }
          if (command === "jail") {
            client.imagecmds.get("jail").execute(message, args, command);
          }
          if (command === 'createrr' || command === 'createreactions') {
            client.modcmds.get('createrr').execute(message, args);
          }
          if (command === "gay") {
            client.imagecmds.get("gay").execute(message, args, command);
          }
          /*if (command === "gaysex"){
          cron.schedule("0 0 * * *", ()=>{
            console.log('TEST at 00:00');
            console.log(Date.now());
            let al = client.channels.cache.filter(c=> c.type === "text");
          al.filter(ch => {
            if (ch.name.toLowerCase().includes("general")){
              ch.send({content: "https://i.pinimg.com/1200x/07/05/5c/07055c89fb26e0a797802c2a458d202f.jpg"})
              ch.send({content: "Happy New Year! 2025 :tada:"})
            }
          });
          message.channel.send({content: "Done!"})
          },{
            scheduled: true,
            timezone: "Asia/Kolkata"
          }); return;
          let al = client.channels.cache.filter(c=> c.type === "text");
          al.filter(ch => {
            if (ch.name.toLowerCase().includes("general")){
              ch.send({content: ""})
              ch.send({content: "Happy New Year! 2025 :tada:"})
            }
          });
          message.channel.send({content: "Done!"})
          }*/
          if (command === "blur") {
            client.imagecmds.get("blur").execute(message, args, command);
          }
          if (command === "google") {
            client.funcmds.get("google").execute(message, args, command);
          }
          if (command === 'gaymeter' || command === 'gaymetre' || command === 'gm') {
            client.funcmds.get('gaymeter').execute(message, args);
          }
          if (command === "npm") {
            client.utilcmds.get("npm").execute(message, args, command);
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
          if (command === 'pp' || command === 'penis' || command === 'peepee') {
            client.funcmds.get('pp').execute(message, args, client);
          }
          if (command === 'discrim') {
            message.channel.send({ content: ":warning: As per the new legacy username system from Discord, discrimantors are only available for bots/apps." })
            //client.funcmds.get('discrim').execute(message, args, client);
          }
          if (command === "pat") {
            client.funcmds.get("pat").execute(message, args, command);
          }
          if (command === 'createstats') {
            client.modcmds.get('createstats').execute(message, args, client);
          }
          //if (command === 'createchat') {
          //client.utilcmds.get('createchat').execute(message);
          //}
          //if (command === 'disablechat') {
          // client.utilcmds.get('disablechat').execute(message);
          //}
          if (command === 'disablestats') {
            client.modcmds.get('disablestats').execute(message, args, client);
          }
          if (command === "spank") {
            client.funcmds.get("spank").execute(message, args, command);
          }
          if (command === "news") {
            client.funcmds.get("news").execute(message, args, command);
          }
          if (command === 'clearwarns' || command === 'cw') {
            client.modcmds.get('clearWarns').execute(message, args, client);
          }
          if (command === 'prefix') {
            const embed = new Discord.EmbedBuilder()
              .setColor(Discord.Colors.Blue)
              .setTitle(`Prefixes`)
              .setDescription(`1) <@${client.user.id}> \n2) ${settings.prefix}`)
              .setTimestamp()
            message.channel.send({ embeds: [embed] });
          }
          if (command === "delete" || command === "del") {
            // client.imagecmds.get("delete").execute(message, args, command);
          }
          if (command === "clear" || command === 'purge') {
            client.modcmds.get("clear").execute(message, args, command);
          }
          if (command === 'setprefix') {
            client.utilcmds.get('setprefix').execute(message, args, client);
          }
          if (command === "kick") {
            client.modcmds.get("kick").execute(message, args, command);
          }
          if (command === 'setprofile' || command === 'sp') {
            client.ecocmds.get('setprofile').execute(message, args, client);
          }
          if (command === 'feed') {
            client.funcmds.get('feed').execute(message, args);
          }
          if (command === "ban") {
            client.modcmds.get("ban").execute(message, args, command);
          }
          if (command === "instagram" || command === "ig") {
            client.funcmds.get("instagram").execute(message, args)
          }
          if (command === "yt" || command === "youtube") {
            client.funcmds.get("yt").execute(message, args, command);
          }
          if (command === "gis") {
            client.funcmds.get("gis").execute(message, args, command);
          }
          let user;
          if (message.mentions.members.last()) {
            user = message.mentions.members.last();
          }
          else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
          }
          if (command === "battle" && user) {
            minigames.startBattle(user, message);
          }
          if (command === "ttt") {
            client.funcmds.get("tictactoe").execute(message);
          }
          if (command === 'clearafk' || command === 'removeafk') {
            client.modcmds.get('clearafk').execute(message, client, args);
          }
          if (command === 'mute') {
            client.modcmds.get('mute').execute(message, args, client);
          }
          if (command === 'terminal' || command === 'tm') {
            client.utilcmds.get('tm').execute(message, args, client);
          }
          if (command === 'tempmute') {
            client.modcmds.get('tempmute').execute(message, args, client);
          }
          if (command === 'unmute') {
            client.modcmds.get('unmute').execute(message, client, args);
          }
          if (command === "fetchwarns" || command === 'fw') {
            client.modcmds.get('fetchwarns').execute(message, args, command);
          }
          if (command === "server-icon" || command === "server icon") {
            client.imagecmds.get("server-icon").execute(message, args, command);
          }
          if (command === 'play' || command === 'p') {
            client.musiccmds.get('play').execute(message, client, args, serverQueue, play, queue);
          }
          if (command === 'stop' || command === 'dc' || command === 'leave' || command === 'disconnect') {
            client.musiccmds.get('stop').execute(message, client, args, serverQueue, queue, distube);
          }
          if (command === 'skip' || command === 's') {
            client.musiccmds.get('skip').execute(message, client, args, serverQueue);
          } if (command === 'volume') {
            client.musiccmds.get('volume').execute(message, client, args, serverQueue);
          } if (command === 'now-playing' || command === 'np') {
            client.musiccmds.get('now-playing').execute(message, client, args, serverQueue);
          }
          if (command === 'queue' || command === 'q') {
            client.musiccmds.get('queue').execute(message, client, args, serverQueue);
          } if (command === 'pause') {
            client.musiccmds.get('pause').execute(message, client, args, serverQueue);
          } if (command === 'resume') {
            client.musiccmds.get('resume').execute(message, client, args, serverQueue);
          } if (command === 'lyrics') {
            client.musiccmds.get('lyrics').execute(message, client, args, serverQueue);
          } if (command === 'remove') {
            client.musiccmds.get('remove').execute(message, client, args, serverQueue);
          } if (command === 'join') {
            client.musiccmds.get('join').execute(message, client, args, serverQueue);
          } if (command === 'loop' || command === 'repeat') {
            client.musiccmds.get('loop').execute(message, client, args, serverQueue);
          } if (command === 'shuffle') {
            client.musiccmds.get('shuffle').execute(message, args, client, serverQueue);
          }
          if (command === 'disablelevels' || command === 'disablelevel') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: '❌ **You need `ADMINISTRATOR` in order to use this command!**' });
            const sett = await levelSchema.findOne({
              guildID: message.guild.id
            });
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
            message.channel.send({ content: `✅ Leveling system disabled for **${message.guild.name}!**` });
          }
          if (command === 'enablelevels' || command === 'enablelevel') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: '❌ **You need `ADMINISTRATOR` in order to use this command!**' })
            const sett = await levelSchema.findOne({
              guildID: message.guild.id
            });
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
            message.channel.send({ content: `✅ Leveling system enabled for **${message.guild.name}!**` });
          }

          if (command === "leaderboard" || command === 'lb') {
            client.lvlcmds.get('leaderboard').execute(message, client);
          }
          if (command === "rank") {
            client.lvlcmds.get('rank').execute(message, args, client);
          }
          if (command === 'set-welcome') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send({ content: '❌ **You are missing `MANAGE_GUILD` permissions!**' });
            let chain;

            if (message.mentions.channels.first()) {
              chain = message.mentions.channels.first()
            }
            else if (args[0]) {
              chain = message.guild.channels.cache.get(args[0]);
            }
            else {
              chain = message.channel;
            }
            if (!chain) return message.channel.send({ content: '❌ **Please provide a channel!**\nExample usage - `setwelcome #welcome`' });
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
            message.channel.send({ content: `✅ **Welcome message set for** ${chain} !` }) && console.log(`Welcome message set for ${message.guild.name} in channel ${chain}`);
          }
          if (command === 'spam') {
            if (message.author.id === '718702909100916737') return;
            if (!args[0]) return message.channel.send({ content: 'What to spam?? \n⚠️ **Invalid arguments**' });
            let text = args.slice(0).join(" ");
            if (text.includes('<@')) return message.channel.send({ content: '⚠️ **User mentions are not allowed in spam command!**' });
            spams.setChannel(message.channel);
            spams.setText(text);
            spams.setStatus(true);
          }
          else if (command === 'stopspam') {
            spams.setStatus(false);
            message.channel.send({ content: 'Stopped' });
          }
          if (command === 'disable-welcome') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send({ content: '❌ **You are missing `MANAGE_GUILD` permissions!**' });
            await welcomeSchema.deleteOne({
              guildID: message.guild.id,
            })
            message.channel.send({ content: `Welcome messages disabled for **${message.guild.name}**.` }) && console.log(`Deleted ${message.guild.name} welcome message`);
          }
          if (command === 'disablelogs') {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send({ content: '❌ **You are missing `MANAGE_GUILD` permissions!**' })
            await LogsSchema.deleteOne({
              guildID: message.guild.id
            });
            message.channel.send({ content: `✅ Logs disabled for **${message.guild.name}**` });
          }
          if (command === 'test-welcome' || command === 'welcome-test') {
            let formattedn = getNumberWithOrdinal(message.guild.memberCount);
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext("2d");

            const background = await Canvas.loadImage("https://static.icy-veins.com/forum-files/news/46634-class-changes-preview-in-wow-shadowlands-700x250.jpg");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#74037b";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            ctx.font = "28px sans-serif";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`Welcome to the server,\n${formattedn} member!`, canvas.width / 2.7, canvas.height / 3.7);

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
              message.author.displayAvatarURL({ size: 2048, extension: 'png' })
            );
            ctx.drawImage(avatar, 25, 25, 200, 200);

            var attachment = new Discord.AttachmentBuilder(
              canvas.toBuffer(), {
              name: "welcome-image.png"
            }
            );
            const ebed = new Discord.EmbedBuilder()
              .setTitle(`Welcome ${message.member.displayName} to ${message.guild.name}!`)
              .setFooter({ text: `Total members: ${message.guild.memberCount} members!` })
              .setTimestamp()
              .setDescription(
                `Welcome ${message.member} to ${message.guild.name}! You are **${formattedn}** member in this server!`
              )
              .setThumbnail(message.guild.iconURL({ size: 2048, extension: message.guild.icon?.startsWith("a_") ? "gif" : "png" }))
              .setColor(`#${randomColor}`)
              .setImage(`attachment://welcome-image.png`);
            message.channel.send({ embeds: [ebed], files: [attachment] });
            message.channel.send({ content: '✅ **Done!**' });
          }
          if (command === "stats" || command === "statistics") {
            const simpleGit = require('simple-git');
            let data = await simpleGit().log({ maxCount: 1 });
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
            const embed = new Discord.EmbedBuilder()
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
                  name: '🛠 Version',
                  value: `[${data.latest.hash.slice(0, 7)}](https://github.com/DerpCoders/Fab/commit/${data.latest.hash})`,
                  inline: true
                },
                {
                  name: "**🔗 Source Code**",
                  value: "[Github.com](https://github.com/DerpCoders/fab-main-js)",
                  inline: true,
                },
                {
                  name: "**📆 Created at**",
                  value: `**${client.user.tag
                    }** was created on **9/27/2020, 1:06:42 AM**`,
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
              .setFooter({ text: "2020-2025 papaemeritus.4" })

            let msg = await message.channel.send({ content: "*Collecting information....*" });

            message.channel.sendTyping();
            setTimeout(() => {
              message.channel.send({ embeds: [embed] }) && msg.delete()
            }, 3569);
          }

          if (command === "owner") {
            message.channel.send(
              `Owner of this server(guild) is - **${message.guild.owner.user.username}**`
            );
          }
          if (command === "softunban" || command === "sftunban") {
            let banuser;
            if (message.mentions.members.last()) {
              banuser = message.mentions.members.last();
            }
            else if (args[0]) {
              banuser = message.guild.members.cache.get(args[0]);
            } else {
              return message.channel.send({ content: 'Please mention a member!' });
            }
            const ro = message.guild.roles.cache.find((rol) => rol.name === "Banned");
            const memm = message.guild.roles.cache.find((r) =>
              r.name.toLowerCase().includes("members")
            );
            if (!banuser) return;
            if (!memm) return;
            if (!ro) return message.channel.send({ content: "There is no Banned role!" });
            if (!banuser.roles.cache.some((rol) => rol.name === "Banned"))
              return message.channel.send({ content: "That member is not banned" });
            banuser.roles.remove(ro) &&
              message.channel.send({ content: `Unbanned ${banuser.displayName}` }) &&
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
            if (!lChannel.levelupChannelID) cChannel = 'None';
            else cChannel = `<#${lChannel.levelupChannelID}>`;
            let cmdsS = await cmdSchema.findOne({ guildID: message.guild.id });
            let cmdsMsg;
            if (cmdsS.commands.length === 0) cmdsMsg = 'None';
            else {
              let cmdMap = cmdsS.commands.map(c => `\`${c}\``);
              cmdsMsg = cmdMap.join(", ");
            }
            let statsData = await countSchema.findOne({
              guildID: message.guild.id
            });
            let statsMsg;
            if (statsData) {
              let category = message.guild.channels.cache.find(ch => ch.type === Discord.ChannelType.GuildCategory && ch.id === statsData.categoryID);
              if (!category) statsMsg = 'Category not found';
              statsMsg = `In category - ${category.name}`;
            } else {
              statsMsg = 'Disabled';
            }
            const embed = new Discord.EmbedBuilder()
              .addFields(
                { name: 'Prefix-', value: `${prefixS}`, inline: true },
                { name: 'Welcome channel-', value: `${welcomeChannel}`, inline: true },
                { name: 'Logs channel-', value: `${modData}`, inline: true },
                { name: 'Leveling system-', value: `${db}`, inline: true },
                { name: 'Level up channel-', value: `${cChannel}`, inline: true },
                { name: 'Disabled commands-', value: `${cmdsMsg}`, inline: true },
                { name: 'Server stats-', value: `${statsMsg}`, inline: true }
              )
              .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ forceStatic: false }) })
              .setColor('Random')
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
              .setTitle(`⚙️ Settings - ${message.guild.name}`)
            message.channel.send({ embeds: [embed] });
          }
          if (command === "uptime") {
            const duration = moment
              .duration(client.uptime)
              .format(" D [days], H [hrs], m [mins], s [secs]");

            const utEmbed = new Discord.EmbedBuilder()
              .setTitle(`${client.user.tag}'s uptime!`)
              .setDescription(`I've been running for **${duration}** `)
              .setFooter({
                text: `Last started ${startDate}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
              });

            message.channel.send({ embeds: [utEmbed] });
          }
          if (command === "avatar" || command === "av") {
            client.funcmds.get('avatar').execute(message, args, client);
          }

          if (message.content.toLowerCase() === prefix + "help us" || message.content.toLowerCase() === `<@!${client.user.id}> help us` || message.content.toLowerCase() === `<@${client.user.id}> help us` || message.content.toLowerCase() === prefix + 'commands' || message.content.toLowerCase() === `<@!${client.user.id}> help us` || message.content.toLowerCase() === `<@${client.user.id}> commands`) {
            client.utilcmds.get('help us').execute(message, client, prefix);
          }

          if (command === "restart") {
            if (message.author.id != "570895295957696513") return;

            setTimeout(async () => {
              process.exit(1)
            }, 2000);
            message.channel.send(
              `Process exited, Restarting...`
            );
          }
        }
      }
    }
  } catch (err) {
    return (
      message.channel.send(
        `❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
      ) && console.log(err)
    );
  }
});

async function play(message, song) {
  const serverQueue = queue.get(message.guild.id);
  if (!song) {
    serverQueue.connection.disconnect();
    queue.delete(message.guild.id);
    return
  }
  const player = createAudioPlayer();
  const stream = ydl.exec(song.url, {
    output: '-',
    format: 'bestaudio',
    noWarnings: true,
    quiet: true,
  }, { stdio: ['ignore', 'pipe', 'ignore'] }).stdout;
  const resource = createAudioResource(stream, { inlineVolume: true });
  player.play(resource);
  serverQueue.player = player;
  serverQueue.resource = resource;
  resource.volume.setVolume(serverQueue.volume);
  serverQueue.connection.subscribe(player);
  player.on('error', (error) => {
    console.error('Audio player error:', error);
    player.stop()
    serverQueue.connection.destroy();
    message.reply('There was an error playing the song.');
  });
  player.on(AudioPlayerStatus.Idle, () => {
    if (!serverQueue.loop) {
      serverQueue.songs.shift();
    }
    if (serverQueue.songs.length > 0) {
      play(message, serverQueue.songs[0]);
    } else {
      queue.delete(message.guild.id);
      serverQueue.connection.disconnect();
      message.channel.send({ content: 'Queue is empty, leaving the voice channel...', flags: Discord.MessageFlags.SuppressNotifications });
    }
  });
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  const embed = new Discord.EmbedBuilder()
    .setTitle(`🎵 Playing - `)
    .setDescription(`${serverQueue.songs[0].title}\n\n⏰ **Duration -**\n${formatTime(serverQueue.songs[0].duration)}`)
    .setThumbnail(`${serverQueue.songs[0].thumbnail}`)
    .setColor('e72929')
    .setFooter({ text: `Requested by - ${serverQueue.songs[0].reqBy.username}`, iconURL: `https://cdn.discordapp.com/avatars/${serverQueue.songs[0].reqBy.id}/${serverQueue.songs[0].reqBy.avatar}.webp?size=2048` });
  serverQueue.textChannel.send({ embeds: [embed], flags: Discord.MessageFlags.SuppressNotifications });
  serverQueue.songs[0].startTime = Date.now() + 3000;
}
/**
 * @param {Discord.ChatInputCommandInteraction} interaction 
 * @param {Object} song 
 * @param {string} song.url
 * @returns 
 */
async function playy(interaction, song) {
  const serverQueue = queue.get(interaction.guild.id);
  if (!song) {
    serverQueue.connection.disconnect();
    queue.delete(interaction.guild.id);
    return
  }
  const player = createAudioPlayer();
  const stream = ydl.exec(song.url, {
    output: '-',
    format: 'bestaudio',
    noWarnings: true,
    quiet: true,
  }, { stdio: ['ignore', 'pipe', 'ignore'] }).stdout;
  const resource = createAudioResource(stream, { inlineVolume: true });
  player.play(resource);
  serverQueue.player = player;
  serverQueue.resource = resource;
  resource.volume.setVolume(serverQueue.volume);
  serverQueue.connection.subscribe(player);
  player.on('error', async (error) => {
    console.error('Audio player error:', error);
    player.stop()
    serverQueue.connection.destroy();
    await interaction.followUp('There was an error playing the song.');
  });
  player.on(AudioPlayerStatus.Idle, () => {
    if (!serverQueue.loop) {
      serverQueue.songs.shift();
    }
    if (serverQueue.songs.length > 0) {
      playy(interaction, serverQueue.songs[0]);
    } else {
      queue.delete(interaction.guild.id)
      serverQueue.connection.disconnect();
      interaction.channel.send({ content: 'Queue is empty, leaving the voice channel...', flags: Discord.MessageFlags.SuppressNotifications });
    }
  });
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  const embed = new Discord.EmbedBuilder()
    .setTitle(`🎵 Playing - `)
    .setDescription(`${serverQueue.songs[0].title}\n\n⏰ **Duration -**\n${formatTime(serverQueue.songs[0].duration)}`)
    .setThumbnail(`${serverQueue.songs[0].thumbnail}`)
    .setColor('e72929')
    .setFooter({ text: `Requested by - ${serverQueue.songs[0].reqBy.username}`, iconURL: `https://cdn.discordapp.com/avatars/${serverQueue.songs[0].reqBy.id}/${serverQueue.songs[0].reqBy.avatar}.webp?size=2048` });
  await interaction.followUp({ embeds: [embed], flags: Discord.MessageFlags.SuppressNotifications });
  serverQueue.songs[0].startTime = Date.now() + 3000;
}

client.on("guildCreate", async (guild) => {
  const settings = new Guild({
    guildID: guild.id,
    guildName: guild.name,
    prefix: config.prefix
  });

  await settings.save();
  guildSettings.set(guild.id, settings);
  let data = await cmdSchema.findOne({
    guildID: guild.id
  });
  if (!data) {
    let newData = new cmdSchema({
      guildID: guild.id,
      commands: []
    });
    let prefixData = await Guild.findOne({
      guildID: guild.id,
    });
    if (prefixData && prefixData.prefix !== '`') {
      guild.members.me.setNickname(`[${prefixData.prefix}] ${client.user.username}`);
    }
    await newData.save();
    console.log(`Joined a new guild: "${guild.name}" with ${guild.members.cache.size} users!`);
    const chh = guild.systemChannel;
    if (!chh) return;
    chh.send(
      "**Thanks for adding me!** <a:Hey:766884642241511444>\n**1)** *My prefix is* ` [CUSTOMIZABLE]\n**2)** *You can get a list of commands by running </help:1349071720136577108> command.*\n**3)** *If you need any help or report issues join our support server - discord.gg/astromk*\n**4)** *Mention me @Fab for more information*"
    );
    chh.send({ content: "<:happy:731417035128569907> " });
    client.users.fetch("570895295957696513").then((user) => {
      user.send({ content: `Joined a new guild: "${guild.name}" with ${guild.members.cache.size} users!` });
    });
  } else {
    console.log(`Joined a new guild: "${guild.name}" with ${guild.members.cache.size} users!`);
    const chh = guild.systemChannel;
    if (!chh) return;
    chh.send(
      "**Thanks for adding me!** <a:Hey:766884642241511444>\n**1)** *My prefix is* ` [CUSTOMIZABLE]\n**2)** *You can get a list of commands by running </help:1349071720136577108> command.*\n**3)** *If you need any help or report issues join our support server - discord.gg/astromk*\n**4)** *Mention me @Fab for more information*"
    );
    chh.send({ content: "<:happy:731417035128569907> " });
    client.users.fetch("570895295957696513").then((user) => {
      user.send({ content: `Joined a new guild: "${guild.name}" with ${guild.members.cache.size} users!` });
    });
  }
});

client.on("guildDelete", (guild) => {
  console.log(`I was kicked/banned from: "${guild.name}" :(`);
  client.users.fetch("570895295957696513").then((user) => {
    user.send({ content: `I was kicked/banned from: "${guild.name}" :(` });
  });
});

client.on('guildBanAdd', async (guild, user) => {
  const sett = await LogsSchema.findOne({
    guildID: guild.id,
  });
  if (!sett) return;
  if (guild.id === sett.guildID) {
    let chann = guild.channels.cache.find(chain => chain.id === sett.channelID);
    let embed = new Discord.EmbedBuilder()
      .setTitle(`Member banned ${user.tag}`)
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setColor(Discord.Colors.Red)
      .setDescription(`**Member banned ${user.username}**\n\n**ID:** ${user.id}\n\n**Reason:** ${(await guild.fetchBan(user)).reason}`)
      .setFooter({ text: `${new Date}` })
    chann.send({ embeds: [embed] });
  } else return;
});


client.on('guildBanRemove', async (guild, user) => {
  const sett = await LogsSchema.findOne({
    guildID: guild.id
  });
  if (!sett) return;
  if (guild.id === sett.guildID) {
    let chann = guild.channels.cache.find(chain => chain.id === sett.channelID);
    let embed = new Discord.EmbedBuilder()
      .setTitle(`Member unbanned ${user.tag}`)
      .setColor(Discord.Colors.Green)
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setDescription(`**Member unbanned ${user.username}**\n\n**ID:** ${user.id}`)
      .setFooter({ text: `${new Date}` })
    chann.send({ embeds: [embed] });
  } else return;
});

client.on('messageDelete', async (message) => {
  if (message.guild == undefined) return;
  const sett = await LogsSchema.findOne({
    guildID: message.guild.id,
  });
  if (!sett) return;
  if (message.guild.id === sett.guildID) {
    if (message.attachments.size > 0) {
      let chann = message.guild.channels.cache.find(chain => chain.id === sett.channelID);
      let embed = new Discord.EmbedBuilder()
        .setTitle(`Message deleted in ${message.channel.name}`)
        .setColor(Discord.Colors.Red)
        .setDescription(`Message deleted in <#${message.channel.id}> sent by **${message.author}**\n\n**Message-**\n${message.attachments.first().url}`)
        .setTimestamp()
        .setFooter({ text: `ID: ${message.id}` })
      chann.send({ embeds: [embed] });
    } else {
      let chann = message.guild.channels.cache.find(chain => chain.id === sett.channelID);
      let embed = new Discord.EmbedBuilder()
        .setTitle(`Message deleted in ${message.channel.name}`)
        .setColor(Discord.Colors.Red)
        .setDescription(`Message deleted in <#${message.channel.id}> sent by **${message.author}**\n\n**Message-**\n${message.content}`)
        .setTimestamp()
        .setFooter({ text: `ID: ${message.id}` })
      chann.send({ embeds: [embed] });
    }
  } else return;
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const Settings = await LogsSchema.findOne({
    guildID: oldMember.guild.id,
  });
  if (!Settings) return;
  const oldRoles = oldMember.roles.cache;
  const newRoles = newMember.roles.cache;
  const addedRoles = newRoles.filter(role => !oldRoles.has(role.id));
  const removedRoles = oldRoles.filter(role => !newRoles.has(role.id));

  let title;
  let channel = oldMember.guild.channels.cache.find(chain => chain.id === Settings.channelID);
  let change;

  if (oldMember.nickname !== newMember.nickname) change = `**Nickname changed:** \n**${oldMember.nickname}** => **${newMember.nickname}**`, title = `Nickname changed - ${newMember.user.tag}`;
  if (removedRoles.size > 0) {
    removedRoles.forEach(role => {
       change = `❌ Role Removed: ${role.name} from ${newMember.user.username}`
       title = `Role removed - ${newMember.user.tag}`;
    });
  }
  if (addedRoles.size > 0) {
    addedRoles.forEach(role => {
      change = `❌ Role Removed: ${role.name} from ${newMember.user.username}`
      title = `Role added - ${newMember.user.tag}`;
    });
  }
  if (oldMember.displayName !== newMember.displayName) change = `**Username changed:** \n**${oldMember.displayName}** => **${newMember.displayName}**`, title = `Username updated - ${oldMember.displayName}`;
  else return;
  const embed = new Discord.EmbedBuilder()
    .setTitle(title)
    .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: 'ID: ' + oldMember.user.id })
    .setColor('Random')
    .setTimestamp()
    .setDescription(`${change}\n**Time: **${new Date()}`)
  channel.send({ embeds: [embed] })
});

client.on('messageReactionAdd', async (reaction, user) => {
  let data = afkSets.filter(a => a.guildID === reaction.message.guild.id);
  if (data.length === 0) return;
  let afkUser = data.find(a => a.userID === user.id);
  if (afkUser) {
    reaction.message.channel.send({ content: `<@${afkUser.userID}> Your afk has been removed!,\n Total AFK duration: ` + `<t:${Math.floor(afkUser.time.getTime() / 1000)}:R>` + `\n *(Reason - ${afkUser.reason})*` }).then(sentmsg => {
      setTimeout(() => {
        sentmsg.delete();
      }, 8000)
    });
    await afkS.deleteOne({
      guildID: reaction.message.guild.id,
      userID: user.id,
    });
    const indexToDelete = afkSets.findIndex(item => item.userID === user.id && item.guildID === reaction.message.guild.id);
    if (indexToDelete !== -1) {
      afkSets.splice(indexToDelete, 1);
    }
    let currentNickname = reaction.message.guild.members.cache.get(user.id).displayName;
    let newNickname = currentNickname.replace('[AFK]', '');
    reaction.message.guild.members.cache.get(user.id).setNickname(newNickname);
  }
});
function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
client.on('shardError', error => {
  console.error('A websocket connection encountered an error:', error);
});
client.on('error', err => {
  console.log(err);
  let user = client.users.cache.get('570895295957696513');
  user.send({ content: `An error occured ${err}` });
});
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
/*client.on('interactionCreate', async (interaction) => {
  if (!interaction.guild && interaction.isChatInputCommand()) return await interaction.reply({ content: ':warning: Commands can only be used in a server!', flags: Discord.MessageFlags.Ephemeral })
  try {
    if (interaction.isButton()) return;
    if (interaction.isAnySelectMenu()) return;

    if (interaction.commandName === 'help') {
      client.scutilcmds.get('help').execute(interaction);
      return;
    }

    if (interaction.isChatInputCommand()) {
      if (interaction.channel.id === '729340627132743761') return await interaction.reply({content: ':warning: Not a valid channel for using commands!', flags: Discord.MessageFlags.Ephemeral })
      await interaction.deferReply();
    }
    if (interaction.commandName === 'instagram') {
      client.scfuncmds.get('instagram').execute(interaction, interaction.options.getString('username'));
    }
    if (interaction.commandName === 'leaderboard') {
      client.sclvlcmds.get('leaderboard').execute(interaction, client)
    }
    if (interaction.commandName === 'rank') {
      client.sclvlcmds.get('rank').execute(interaction, interaction.options.getUser('user') || interaction.user, client)
    }
    if (interaction.commandName === 'play') {
      if (interaction.isAutocomplete()) {
        let focusedValue = interaction.options.getFocused();
        if (!focusedValue) {
          return interaction.respond([{ name: '❌ No songs found!', value: 'error' }]);
        }
        if (focusedValue.toLowerCase().includes('spotify.com/playlist')) {
          return interaction.respond([{ name: '⚠️ Please use `addtoplaylist` command to add songs from spotify.', value: 'error' }])
        }
        if (focusedValue.toLowerCase().includes('spotify.com/track')) {
          const { getData } = require('spotify-url-info')(fetch);
          const data = await getData(focusedValue);
          if (!data) return interaction.respond([{ name: '❌ No songs found!', value: 'error' }]);
          focusedValue = `${data.name} ${data.artists[0].name}`
        }
        const yts = require('yt-search');
        const results = await yts(focusedValue);
        if (results.videos.length === 0) return interaction.respond([{ name: '❌ No songs found!', value: 'error' }])
        const choices = results.videos.slice(0, 7).map(video => ({
          name: video.title,
          value: video.url
        }));
        await interaction.respond(choices);
      } else if (interaction.isCommand()) {
        client.scmusiccmds.get('play').execute(interaction, client, queue.get(interaction.guild.id), playy, queue);
      }
    }
    if (interaction.commandName === 'help') {
      client.scutilcmds.get('help').execute(interaction);
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "An error occurred while executing this command.",
      flags: Discord.MessageFlags.Ephemeral
    });
  }
});*/