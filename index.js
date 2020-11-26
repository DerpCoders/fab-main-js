const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});
const { MessageEmbed } = require('discord.js')
const roles = new Discord.Role();
const Canvas = require('canvas');
const leveling = require('discord-leveling');
const fs = require('fs');
const { token, prefix } = require('./config.json');
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const mongoose = require('mongoose');
const { execute } = require('./commands/pat');
const { Z_MEM_ERROR } = require('zlib');
const { isRegExp } = require('util');
const { error } = require('console');
client.setMaxListeners(15);

Levels.setURL('mongodb+srv://Fabby:Mk5463@cluster0.2ii0n.mongodb.net/data?retryWrites=true&w=majority');

(async () => {
await mongoose.connect('mongodb+srv://Fabby:Mk5463@cluster0.2ii0n.mongodb.net/data?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
})()
//mongoose.connect('mongodb+srv://Fabby:Mk5463@cluster0.2ii0n.mongodb.net/data?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

client.login(token);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};
client.on('ready', () => {
    console.log(`Aapka bot ${client.user.tag}! online hai ab.... yay! Vo bhi ${client.guilds.cache.size} servers me!`);
    const actvs = [
        `VALORANT`,
        `${client.guilds.cache.size} servers | \`help`,
        `\`help for commands`
      ];
      client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], {
          type: 'STREAMING',
          url: 'https://twitch.tv/fab_is_insane'
      })
      setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], {
            type: 'STREAMING',
            url: 'https://twitch.tv/fab_is_insane'
        })
      }, 50000);
    //client.user.setStatus('online');
     
    });

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 80;
    
        do {
            ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);
    
        return ctx.font;
    };

   client.on('guildMemberAdd', async member => {
      if(member.guild.id != '729340392327217193') return;
    let guildName = member.guild.name
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '🛬landing-zone')
    member.send(`${member} Welcome to **${guildName}** you are **${member.guild.memberCount}th** astronaut!\n\n Subscribe to this channel- https://www.youtube.com/channel/UCSH77jsgFTgh6qP-PtWBWtQ`);
    member.send(`${member} https://www.youtube.com/channel/UCI3Bcxk7aA949R6t97ViDvw`)   
    welcomeChannel.send(`${member}'s spaceship just landed here, now we have **${member.guild.memberCount}** astronauts!`)
    welcomeChannel.send(`<a:Hey:766884642241511444>`);
    if(!welcomeChannel) return;
    const wchannel = member.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('welcome', 'rules'))
    if(!wchannel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Welcome to the server,\n${member.guild.memberCount}th astronaut!`, canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 2.1);
    
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({size: 2048 ,format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
const embed = new Discord.MessageEmbed()
  .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
  .setFooter(`Total ${member.guild.memberCount} members!`)
  .setTimestamp()
  .setDescription(`Welcome ${member} to ${member.guild.name}! You are **${member.guild.memberCount}th** astronaut in this server! Go to <#729340627132743761> to verify yourself!`)
  .setThumbnail(member.guild.iconURL( {size: 2048, dynamic: true} ))
  .attachFiles([attachment])
  .setColor('RANDOM')
  .setImage(`attachment://welcome-image.png`)
   wchannel.send(embed);
});

client.on('guildMemberRemove', member => {
    const leaveChannel = member.guild.channels.cache.find(channel => channel.name.toLowerCase().includes('leave', 'bye'))
    if(!leaveChannel) return;
    leaveChannel.send(`**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** astronauts`);

});

client.on("message", async message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
	
if(message.channel.type === 'text' && message.content.toLowerCase() === 'agree'){
const verifiedrole = message.guild.roles.cache.find((x) => x.name === 'Verified')
const bannedrole = message.guild.roles.cache.find((y) => y.name === 'Banned')

if(message.member.roles.cache.some(role => role.name === 'Banned')) {
  message.channel.send(':x:**You are banned, you can\'t verify yourself!**').then((sentmsg) => {
      sentmsg.delete( {timeout: 6000} );
  })
  message.delete();
} else if(!message.member.roles.cache.some(role => role.name === 'Verified')){
  message.member.roles.add(verifiedrole)
     message.reply('Thanks for verifying yourself. Enjoy!').then((sentmsg) => {
         sentmsg.delete( {timeout: 6000} );
     })
     message.delete();
 }if(message.member.roles.cache.some(role => role.name === 'Verified')) {
    message.channel.send('You are already Verified!').then((sentmsg) => {
            sentmsg.delete({timeout: 6000});
        })
        message.delete();
      }
    
}
if(command === 'servers'){
if(message.author.id != '570895295957696513') return;
client.users.fetch('570895295957696513').then(user => {
    client.guilds.cache.forEach(guild => {
        user.send(guild.name);
});
});
}
if(command === '.'){
var os = require('os');

var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

var  getpercentage = 
  ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

console.log("Memory used in GB", (usedMemory/ Math.pow(1024, 3)).toFixed(2))
console.log("Used memory" , getpercentage);
const used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}
// if(command === 'search'){
// var search = require('youtube-search');
 
// var opts = {
//   maxResults: 10,
//   key: 'AIzaSyBQ_oaBxONQ-xXuKu9QrRjZY9CK8O3J0ks'
// };
 
// search('jsconf', opts, function(err, results) {
//   if(err) return console.log(err);
 
//   message.channel.send(results);
// })
// }
if(command === 'get'){
   message.channel.send('**Get what??**\nType - ``humans` to get a list of all humans in this guild or');
   message.channel.send('Type - ``bots` to get list of bots :^)');
}
 if(command === 'humans'){
const test = client.guilds.cache.get(`${message.guild.id}`).members.cache.filter(member => !member.user.bot)
const gEmbed = new Discord.MessageEmbed()
var names = test.forEach(member => {
gEmbed.setDescription(member.user.username)
message.channel.send(gEmbed);
})
}

if(command === 'stats'){
    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.username} statistics`)
    .addFields(
        {name: '⬆Uptime', value }
    )
}


    if (!message.guild) {return console.log(`New Message in DMs: "${message.content}" by ${message.author.username}`)}
    if(!message.content.startsWith(prefix)) return;
   /* if(message.guild){
	 if(message.guild.id = '601460089118785547') return;
        const chann = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('server-logs'))
        if(!chann) return;
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`Command used \`${message.content}\` in <#${message.channel.id}> by <@${message.author.id}>`)
        .setTimestamp()                     
        .setFooter(`ID: ${message.author.id}`)
        chann.send(embed);
    }*/
    if(command === 'bots'){
        const test = client.guilds.cache.get(`${message.guild.id}`).members.cache.filter(member => member.user.bot)
        test.forEach(member => message.channel.send(member.user.username))
        }


    if (command === 'serverinfo' || command === 'si' || command === 'server-info') {
        client.commands.get('serverinfo').execute(message, args, command);
    }
    if (command === 'poll') {
        client.commands.get('poll').execute(message, args, command);
    }
    if (command === 'userinfo' || command === 'ui' || command === 'user-info') {
        client.commands.get('userinfo').execute(message, args, command);
    }
    if(command === 'bcount' || command === 'ban-count'){
        client.commands.get('bcount').execute(message, args, command);
    }
    if(command === 'softban'){
        client.commands.get('softban.js').execute(message, args, command);
    }
    if (command === 'punch'){
        client.commands.get('punch').execute(message, args, command);
    }
    if (command === 'poke'){
        client.commands.get('poke').execute(message, args, command);
    }
    if (command === 'agree') {
        client.commands.get('agree').execute(message, args, command);
    }
    if (command === 'kiss') {
        client.commands.get('kiss').execute(message, args, command);
    }
    if (command === 'pat') {
        client.commands.get('pat').execute(message, args, command);
    }
    if (command === 'news'){
        client.commands.get('news').execute(message, args, command);
    }
    if (command === 'clear') {
        client.commands.get('clear').execute(message, args, command);
    }
    if (command === 'kick') {
        client.commands.get('kick').execute(message, args, command);
    }
    if (command === 'ban') {
        client.commands.get('ban').execute(message, args, command);
    }
    if (message.content.toLowerCase()===prefix+'help') {
        client.commands.get('help').execute(message, args, command);
    }
    if (command === 'meme') {
        client.commands.get('meme').execute(message, args, command);
    } 
    if (command === 'pussy') {
        client.commands.get('pussy').execute(message, args, command);
    }
    if (command === 'server icon' || command === 'servericon' || command === 'server-icon' || command === 'server avatar' || command === 'server av'){
        client.commands.get('server-icon').execute(message, args, command);
    }

    if (message.channel.type === 'text' && message.content.toLowerCase() === 'hi' || message.channel.type === 'text' && message.content.toLowerCase() === "hello") {
        message.reply("Hello there!");
    }

    if (message.channel.type === 'text' && message.content === prefix + 'ping') {
        var ping = Date.now() - message.createdTimestamp + "ms";
        const pingEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('🏓Pong!')
            .addField(`${message.author.username}` + `'s ping is:`, ping)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: false}))
    message.channel.send(pingEmbed);
    }
if(command === 'gcount' || command === 'guildcount'){
    message.channel.send(`I'm currently in **${client.guilds.cache.size}** servers! LOL`)
}
if(command === 'owner'){
    message.channel.send(`Owner of this server(guild) is - **${message.guild.owner.user.username}**`);
}

// if(command === 'rank'){
// const target = message.mentions.users.first() || message.author;

//     const user = Levels.fetch(target.id, message.guild.id);

//     Levels.setURL('mongodb+srv://Fabby:Mk5463@cluster0.2ii0n.mongodb.net/Data')

//     const nxtLvl = Levels.xpFor(parseInt(user.level) + 1);

//     if(!user) return message.reply("You don't have xp, try to send some messages!");

//     const rank = new canvacord.Rank()
//     .setAvatar(member.user.displayAvatarURL({ format: "png", size: 2048 }))
//     .setCurrentXP(user.xp)
//     .setRequiredXP(nxtLvl)  
//     .setProgressBar(["#00FFDE", "#26FF00", "FFFD00", "#FF2D00"], "GRADIENT")
//     .setUsername(member.user.username)
//     .setStatus(message.guild.members.cache.get(member.user.id).presence.status)
//     .setDiscriminator(member.user.discriminator, color = "#FFFFFF")
//     .setBackground("IMAGE", "https://assets.conduent.com/wp-content/uploads/2019/02/bluebg-2.jpg")
//     .setLevel(profile.level);

//   rank.build()
//     .then(data => {
//       const attachment = new Discord.MessageAttachment(data, "RankCard.png");
//       message.channel.send(attachment);
//     });
// }

    
//     if (message.content.toLowerCase() === 'agree') {
//         const roleName = message.member.guild.roles.cache.find(r => r.name === 'Verified')
//         if(message.member.roles.has(roleName)) return;
        
//         message.reply('Thanks for verifying yourself. Enjoy!').then(msg => msg.delete({ timeout: 6000 }));
//         return message.member.roles.add(roleName).then(message => {
//             message.lastMessage.delete();
//             let bannedrole = message.guild.roles.cache.find((x) => x.name === 'Banned')

//               if(message.member.roles.has(bannedrole)) {
//                 message.channel.send(':x:**You are banned, you can\'t verify yourself!**');
// }
//             if(message.member.roles.cache.has(roleName.id)) return message.channel.send('YOU cant');
//         if(!roleName){
//         message.channel.send("```Error: Role not found```");
//     }
    
//   });
// }

if(command === 'uptime'){
if(message.channel.type != 'text') return;
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
   totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
   totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

const utEmbed = new Discord.MessageEmbed()
.setTitle(`${client.user.tag}'s uptime!`)
.setDescription(`I've been running for **${uptime}** `)
.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))

message.channel.startTyping();
setTimeout(() => {
    message.channel.stopTyping();
    message.channel.send(utEmbed);
}, 2000);
}

    if(command === 'type'){
        message.channel.startTyping();
        setTimeout(() => {
            message.channel.stopTyping();
            message.channel.send('Done!');
        }, 5000);
    }
    if (message.channel.type === 'text' && command === 'I want vid')
        message.reply('Subscribe to this channel :) - https://www.youtube.com/channel/UCSH77jsgFTgh6qP-PtWBWtQ')

    if (message.channel.type === 'text' && command === 'I want vid MK')
        message.reply('https://www.youtube.com/channel/UCI3Bcxk7aA949R6t97ViDvw')

    if (message.channel.type === 'text' && command === 'help pursuit') {
        message.channel.send('God, pls save <@!451068537222594567> ass xD').then(sentmsg => {
            sentmsg.react('736590296359632943')
        })
    }

    if (message.channel.type === 'text' && command === 'YT trends' || command === 'yt trends') {
        message.reply('Here you go - https://www.youtube.com/feed/trending')
    }

    if (message.channel.type === 'text' && message.content.startsWith(prefix + 'avatar') || message.content.startsWith(prefix + 'av')) {
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor("#29e47d")
            .setAuthor(user.tag, user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setDescription("**Avatar**")
            .setTimestamp()
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
        message.channel.send(avatarEmbed);
    }

    if (message.content.startsWith(prefix + 'invite') || message.content.startsWith(prefix + 'inv')) {
        let bed = new MessageEmbed()
            .setColor("#444444")
            .setTitle('Invite Link!')
            .setDescription("[Invite](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=0&scope=bot)")
        message.channel.send(bed)
    }

    if (message.channel.type === 'text' && message.content === prefix + 'help us') {
        let helpembed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('**Commands**')
        .setDescription('\n\n**⛔ MODERATION-**\n`ban`, `kick`, `poll`, `clear`, `invite`, `serverinfo`, `userinfo`\n\n**🏃‍♀️ FUN-**\n`I want vid`, `uptime`, `news`, `meme`, `I want vid MK`, `kiss`, `punch`, `pat`, `poke`, `avatar`\n\n**😏 NSFW-**\n`pussy`,\n\n**❌ Ignore these-**\n`help pursuit`, `help ds`, `hi`, `ping`, `YT trends`\n\n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=0&scope=bot)\n\n**Commands are still being added**')
        .setTimestamp()
        .setFooter('This is a bot LOL')
        .setThumbnail('https://cdn.discordapp.com/attachments/624080970731094016/760842758423707678/oie_6twFRGwWX7oC.jpg')
        message.channel.startTyping();
        setTimeout(function() {
            message.channel.stopTyping();
            message.channel.send(helpembed);
        }, 1000);
        //message.channel.send(helpembed);
    }

if(command === 'reactions'){
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌ **You can\'t use that!**')
    let rEmbed = new Discord.MessageEmbed()
    .setTitle('React to get free roles!!')
    .setDescription('```-React to get yourself a free role!```\n**-If you want to remove any role go ahead and unreact!**\n\n <:discord:758707913081487380> to get role: `Active on Discord`')
    .setColor('GREEN')
    let msgEmbed = await message.channel.send(rEmbed)
    msgEmbed.react('758707913081487380');
}


  if(message.guild.id != '729340392327217193') return;
  if(message.author.bot) return;

  // LEVEL UP ✓
  var profile = await leveling.Fetch(message.author.id)
  const nxtLvl = 145 * (Math.pow(2, profile.level));
  const curxp = profile.xp
  const xpAdd = Math.floor(Math.random() * 19) + 50;
  leveling.AddXp(message.author.id, xpAdd)
  profile.xp = curxp + xpAdd;
  if (profile.xp > nxtLvl) {
    await leveling.AddLevel(message.author.id, 1)
    await leveling.SetXp(message.author.id, 0)
    const lvlChannel = message.guild.channels.cache.find(ch => ch.name === '💎level-up💎')
    const abed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      .setColor('#00FF00')
      .setDescription(`🎉 You just leveled up!!\n🎉 You are now on level ${profile.level + 1}.`);

      lvlChannel.send(abed);

      if(!lvlChannel) return message.channel.send(abed);
  }
  // LEVEL UP ✓

// LEVEL LEADERBOARD ✓
 if (command === 'levellead') {
     if (message.mentions.users.first()) {

      var output = await leveling.Leaderboard({
        search: message.mentions.users.first().id
      })
      var output2 = await leveling.Fetch(message.mentions.users.first().id)
      message.channel.send(new Discord.MessageEmbed()
      .setTitle(`${message.mentions.users.first().tag}`)
      .setColor('#00FF00')
      .setDescription(`Rank: ${output}\nLevel: ${output2.level}\nXP: ${output2.xp}`))


    } else {

      leveling.Leaderboard({
        limit: 10
      }).then(async users => {

        if (users[0]) var firstplace = await client.users.fetch(users[0].userid)
        if (users[1]) var secondplace=await client.users.fetch(users[1].userid)
        if (users[2]) var thirdplace = await client.users.fetch(users[2].userid)
        if (users[3]) var forthplace = await client.users.fetch(users[3].userid)
        if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)
        if (users[5]) var sixthplace = await client.users.fetch(users[5].userid)
        if (users[6]) var seventhplace=await client.users.fetch(users[6].userid)
        if (users[7]) var eightplace = await client.users.fetch(users[7].userid)
        if (users[8]) var ninthplace = await client.users.fetch(users[8].userid)
        if (users[9]) var tenthplace = await client.users.fetch(users[9].userid)
       message.channel.send(new Discord.MessageEmbed()
       .setTitle(`:bar_chart: LEVEL LEADERBOARD :bar_chart:`)
       .setColor('#00FF00')
       .setDescription(`**1. ${firstplace && firstplace || 'Nobody Yet'}**\nLevel: ${users[0] && users[0].level || 'None'}\nXP: ${users[0] && users[0].xp || 'None'}\n\n**2. ${secondplace && secondplace || 'Nobody Yet'}**\nLevel: ${users[1] && users[1].level || 'None'}\nXP: ${users[1] && users[1].xp || 'None'}\n\n**3. ${thirdplace && thirdplace || 'Nobody Yet'}**\nLevel: ${users[2] && users[2].level || 'None'}\nXP: ${users[2] && users[2].xp || 'None'}\n\n**4. ${forthplace && forthplace || 'Nobody Yet'}**\nLevel: ${users[3] && users[3].level || 'None'}\nXP: ${users[3] && users[3].xp || 'None'}\n\n**5. ${fifthplace && fifthplace || 'Nobody Yet'}**\nLevel: ${users[4] && users[4].level || 'None'}\nXP: ${users[4] && users[4].xp || 'None'}\n\n**6. ${sixthplace && sixthplace || 'Nobody Yet'}**\nLevel: ${users[5] && users[5].level || 'None'}\nXP: ${users[5] && users[5].xp || 'None'}\n\n**7. ${seventhplace && seventhplace || 'Nobody Yet'}**\nLevel: ${users[6] && users[6].level || 'None'}\nXP: ${users[6] && users[6].xp || 'None'}\n\n**8. ${eightplace && eightplace || 'Nobody Yet'}**\nLevel: ${users[7] && users[7].level || 'None'}\nXP: ${users[7] && users[7].xp || 'None'}\n\n**9. ${ninthplace && ninthplace || 'Nobody Yet'}**\nLevel: ${users[8] && users[8].level || 'None'}\nXP: ${users[8] && users[8].xp || 'None'}\n\n**10. ${tenthplace && tenthplace || 'Nobody Yet'}**\nLevel: ${users[9] && users[9].level || 'None'}\nXP: ${users[9] && users[9].xp || 'None'}`))
      })
      }
  }
  // LEVEL LEADERBOARD ✓


// PROFILE ✓
else if (message.content === `${prefix}rank`) {
if(message.mentions.users.first()){
var iduser = message.mentions.users.first().id
}
else if(!message.mentions.users.first()){
 var iduser = message.author.id
}
const member = message.mentions.members.first() || message.member;
var levelinfo = await leveling.Fetch(iduser)
var output = await leveling.Leaderboard({
      search: iduser
    })
if(levelinfo.level > 0){
    const rank = new canvacord.Rank()
      .setAvatar(member.user.displayAvatarURL({ format: "png", size: 1024 }))
      .setCurrentXP(levelinfo.xp)
      .setRequiredXP(nxtLvl)
      .setProgressBar(["#00FFDE", "#26FF00", "FFFD00", "#FF2D00"], "GRADIENT")
      .setRank(output)
      .setUsername(member.user.username)
      .setStatus(message.guild.members.cache.get(iduser).presence.status)
      .setDiscriminator(member.user.discriminator, color = "#FFFFFF")
      .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/760049923995074560/766916023755997244/sky_light_by_bisbiswas_de3r7zn-250t.jpg")
      .setLevel(levelinfo.level);

    rank.build()
      .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
      });
}
else{
 message.channel.send( new Discord.MessageEmbed()
  .setTitle(`${member.user.tag}`)
  .setColor('#00ff00')
  .setDescription(`You are Level 0 LOL!! Send some messages and try again.`)
 )
}
}
})

client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === '758704935780089886'){
        if (reaction.emoji.name === 'discord'){
            const roleid =  '758703665460281397';
            await reaction.message.guild.members.cache.get(user.id).roles.add(roleid)
            }
    }
})

client.on('messageReactionRemove', async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === '758704935780089886'){
        if (reaction.emoji.name === 'discord'){
            const roleid =  '758703665460281397';
            await reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)
        }
    }
})

client.on('guildCreate', guild => {
    console.log(`Joined a new guild: "${guild.name}"`);
    client.users.fetch('570895295957696513').then(user => {
            user.send(`Joined a new guild: "${guild.name}"`);
    });
});

client.on('guildDelete', guild => {
    console.log(`I was kicked/banned from: "${guild.name}" :(`);
    client.users.fetch('570895295957696513').then(user => {
        user.send(`I was kicked/banned from: "${guild.name}" :(`)
    });
});