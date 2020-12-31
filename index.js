const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });
const { MessageEmbed } = require('discord.js')
const Canvas = require('canvas');
const leveling = require('discord-leveling');
const moment = require("moment");
require("moment-duration-format");
const fs = require('fs');
const { mem, cpu, os } = require('node-os-utils');
const mongoose = require('mongoose');
const minigames = require('discord-minigames');
const { token, prefix } = require('./config/config.json');
const canvacord = require('canvacord');
const usersMap = new Map();
const { botconfig, mongoPass }= require('./config/config.json');


var badwordsArray = require('badwords/array');
 
var badwordsObject = require('badwords/object');
 
var badwordsRegExp = require('badwords/regexp');

const botOwner = client.users.cache.get('624067420625305600');

client.setMaxListeners(15);

client.login(token);

/*mongoose.connect()

const Data = require('./models/data');
var db = mongoose.connection; */
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
};

client.on('ready', () => {
    console.log(`${client.user.tag} is now online! In ${client.guilds.cache.size} servers!`);
    const actvs = [
        `${client.guilds.cache.size} servers | \`help`,
        `${client.users.cache.size} members and ${client.guilds.cache.size} servers!`
    ];
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], {
        type: 'WATCHING',
        url: 'https://twitch.tv/fab_is_insane'
    })
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], {
            type: 'WATCHING',
            url: 'https://twitch.tv/fab_is_insane'
        })
    }, 50000);
    client.user.setStatus('online');
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
try{
 if(member.user.bot) return;
if(member.guild.id === '729340392327217193'){
    setTimeout(() => {
        member.send('**Verify yourself within 30 minutes in #server-rules!**');
    }, 5000) 
    let ro = member.guild.roles.cache.find(r => r.name === 'AS workers / Members');
    if (!ro) return;
    member.roles.add(ro);
    let guildName = member.guild.name
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '🛬landing-zone')
    member.send(`${member} Welcome to **${guildName}** you are **${member.guild.memberCount}th** astronaut!\n\n Subscribe to this channel- https://www.youtube.com/channel/UCSH77jsgFTgh6qP-PtWBWtQ`);
    member.send(`${member} https://www.youtube.com/channel/UCI3Bcxk7aA949R6t97ViDvw`)
    if (!welcomeChannel) return;
    welcomeChannel.send(`${member}'s spaceship just landed here, now we have **${member.guild.memberCount}** astronauts!`)
    welcomeChannel.send('<a:Hey:766884642241511444>')
    const wchannel = member.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('welcome'));
    if (!wchannel) return;
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./src/wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Welcome to the server,\n${member.guild.memberCount}th astronaut!`, canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.5);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ size: 2048, format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
    const embed = new Discord.MessageEmbed()
        .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
        .setFooter(`Total ${member.guild.memberCount} members!`)
        .setTimestamp()
        .setDescription(`Welcome ${member} to ${member.guild.name}! You are **${member.guild.memberCount}th** astronaut in this server! Go to <#729340627132743761> to verify yourself!`)
        .setThumbnail(member.guild.iconURL({ size: 2048, dynamic: true }))
        .attachFiles([attachment])
        .setColor('RANDOM')
        .setImage(`attachment://welcome-image.png`)
    wchannel.send(embed);


    setTimeout(() => {
        if(!member.roles.cache.some(role => role.name === 'Verified')){
         member.send(`Kicked from ${member.guild.name} because you **didn\'t verify** yourself! Better luck next time.`);
         member.kick();
        }
    }, 1800000);


}  
 else if(member.guild.id === '601460089118785547'){
        let guildName = member.guild.name
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
        member.send(`${member} Welcome to **${guildName}** you are **${member.guild.memberCount}th** member!\n\n Subscribe to this channel- https://www.youtube.com/channel/UC87CVoVltTQQWl0tc88tnqA`);
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
    
        const background = await Canvas.loadImage('./src/wallpaper.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Welcome to the server,\n${member.guild.memberCount}th member!`, canvas.width / 2.7, canvas.height / 3.7);
    
        ctx.font = applyText(canvas, `${member.displayName}!`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${member.displayName}!`, canvas.width / 2.7, canvas.height / 1.5);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ size: 2048, format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);
    
        var attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
        const embed = new Discord.MessageEmbed()
            .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
            .setFooter(`Total members: ${member.guild.memberCount} members!`)
            .setTimestamp()
            .setDescription(`Welcome ${member} to ${member.guild.name}! You are **${member.guild.memberCount}th** member in this server!`)
            .setThumbnail(member.guild.iconURL({ size: 2048, dynamic: true }))
            .attachFiles([attachment])
            .setColor('RANDOM')
            .setImage(`attachment://welcome-image.png`)
        welcomeChannel.send(embed);
    }
    else if(member.guild.id === '702955923332792383'){
        let guildName = member.guild.name
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '753212442871463976');
        member.send(`${member} Welcome to **${guildName}** you are **${member.guild.memberCount}th** member!\n **Subscribe** to owner's channel - https://www.youtube.com/channel/UCSH77jsgFTgh6qP-PtWBWtQ\n Hope that you won't leave our server :)`);

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
    
        const background = await Canvas.loadImage('./src/welcome2.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Welcome to the server,\n${member.guild.memberCount}th member!`, canvas.width / 2.7, canvas.height / 3.7);
    
        ctx.font = applyText(canvas, `${member.displayName}!`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${member.displayName}!`, canvas.width / 2.7, canvas.height / 1.5);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ size: 2048, format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);
    
        var attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
        const embed = new Discord.MessageEmbed()
            .setTitle(`Welcome ${member.displayName} to ${member.guild.name}!`)
            .setFooter(`Total members: ${member.guild.memberCount} members!`)
            .setTimestamp()
            .setDescription(`Welcome ${member} to ${member.guild.name}! You are **${member.guild.memberCount}th** member in this server!`)
            .setThumbnail(member.guild.iconURL({ size: 2048, dynamic: true }))
            .attachFiles([attachment])
            .setColor('RANDOM')
            .setImage(`attachment://welcome-image.png`)
        welcomeChannel.send(embed);
    } else{
        member.send(`Have fun in **${member.guild.name}**! <a:HyperNeko:752861537189888010>`);
    }
} catch(err){
    botOwner.send(`${err}\n There was an error while welcoming ${member.guild.name}`);
}
});

client.on('guildMemberRemove', member => {
    if(member.guild.id === '729340392327217193'){
    const leaveChannel = member.guild.channels.cache.find(channel => channel.name.toLowerCase().includes('leave', 'bye'))
    if (!leaveChannel) return;
    leaveChannel.send(`**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** astronauts.`);
    }
    else if(member.guild.id === '601460089118785547'){
    const leftChannel = member.guild.channels.cache.find(channel => channel.id === '749257836546228304');
    leftChannel.send(`**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** members.`);
    }
    else if(member.guild.id === '702955923332792383'){
        const lefChannel = member.guild.channels.cache.find(channel => channel.id === '753212442871463976');
        member.send(`**We are sorry if there was any issue in our server, We hope that you will join back again** :(\ndiscord.gg/Ns6efjhm5H`)
    lefChannel.send(`**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** members.`);
    }
});

client.on("message", async message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    try{
        
        if (message.author.bot) return;

        if (usersMap.has(message.author.id)) {
            if(!message.guild) return;
            if(message.guild.id === '601460089118785547') return;
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
            }
            else {
                ++msgCount;
                if (parseInt(msgCount) === 6) {
                    message.reply("PLEASE STOP SPAMMING!!");
                    if (message.guild.id != '729340392327217193') return;
                    const muteorban = message.guild.roles.cache.find(roo => roo.name.toLowerCase().includes('mute'));
                    if (!muteorban) return;
                    message.member.roles.add(muteorban);
                }
                else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }
        }
        else {
            let fn = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, 5500);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn
            });
        }
        
        if (!message.guild) { return console.log(`New Message in DMs: "${message.content}" by ${message.author.username}`) }
    
        for (var i = 0; i < badwordsArray.length; i++) {
            if (message.content.includes(badwordsArray[i])) {
                if(message.guild.id != '750943474777325669') return;
              message.channel.send(`**${message.author.username}** is using BAD WORDS!`) && message.delete();
            }
          }
        if (!message.content.startsWith(prefix)) return;
                
        if(command === 'kpop'){
            client.commands.get('kpop').execute(message, args, command);
        }
        if (command === 'hug') {
            client.commands.get('hug').execute(message, args, command);
        }
        if(command === 'permissions' || command === 'permission' || command === 'perms'){
            client.commands.get('permissions').execute(message, args, command);
        }
        if(command === 'joke' || command === 'jokes'){
            client.commands.get('joke').execute(message, args, command);
        }
        if(command === 'triggered' || command === 'trigger'){
            client.commands.get('triggered').execute(message, args, command);
        }
        if (command === 'slap') {
            client.commands.get('slap').execute(message, args, command);
        }
        if (command === 'serverinfo' || command === 'server info' || command === 'server-info' || command === 'si') {
            client.commands.get('serverinfo').execute(message, args, command);
        }
        if (command === 'poll') {
            client.commands.get('poll').execute(message, args, command);
        }
        if (command === 'userinfo' || command === 'user info' || command === 'user-info' || command === 'ui') {
            client.commands.get('userinfo').execute(message, args, command);
        }
        if (command === 'bcount' || command === 'ban-count') {
            client.commands.get('bcount').execute(message, args, command);
        }
        if (command === 'anime') {
            client.commands.get('anime').execute(message, args);
        }
        if (command === 'kill') {
            client.commands.get('kill').execute(message, args, command);
        }
        if (command === 'pussy') {
            client.commands.get('pussy').execute(message, args, command);
        }
        if(command === 'cumsluts' || command === 'cum sluts'){
            client.commands.get('cumsluts').execute(message, args, command);
        }
        if (command === 'hentai') {
            client.commands.get('hentai').execute(message, args, command);
        }
        if (command === 'softban' || command === 'sftban' || command === 'soft ban') {
            client.commands.get('softban').execute(message, args, command);
        }
        if (command === 'jail') {
            client.commands.get('jail').execute(message, args, command);
        }
        if (command === 'gay') {
            client.commands.get('gay').execute(message, args, command);
        }
        if (command === 'blur') {
            client.commands.get('blur').execute(message, args, command);
        }
        if (command === 'google') {
            client.commands.get('google').execute(message, args, command);
        }
        if (command === 'npm') {
            client.commands.get('npm').execute(message, args, command);
        }
        if (command === 'punch') {
            client.commands.get('punch').execute(message, args, command);
        }
        if (command === 'poke') {
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
        if (command === 'advice') {
            client.commands.get('advice').execute(message, args, command);
        }
        if (command === 'spank') {
            client.commands.get('spank').execute(message, args, command);
        }
        if (command === 'news') {
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
        if (command === 'yt' || command === 'youtube') {
            client.commands.get('yt').execute(message, args, command);
        }
        if (command === 'gis') {
            client.commands.get('gis').execute(message, args, command);
        }
        let member = message.mentions.members.first();
        if(command === 'battle' && member){
            minigames.startBattle(member, message)
        }
        if (message.content.toLowerCase() === prefix + 'help') {
            console.log(`Help command used in "${message.guild.name} by ${message.author.username}"`);
            client.commands.get('help').execute(message, args, command);
        }
        if (command === 'meme') {
            client.commands.get('meme').execute(message, args, command);
        }
        if (command === 'server-icon' || command === 'server icon') {
            client.commands.get('server-icon').execute(message, args, command);
        }
       
    
        if(command === 'get humans'){
            const mems = message.guild.members.cache.map(mem => mem.user.username);
            const fi = mems.join(`\n`);
            let msg = await message.channel.send('Fetching...')
            const embed = new Discord.MessageEmbed()
            .setDescription(fi);

            message.channel.startTyping()
            setTimeout(async () => {
                message.channel.stopTyping()
              await message.channel.send(embed) && msg.delete();
            }, 3000);
        }

        if (command === "eval") {
            if (message.author.id != '570895295957696513') return;
            const clean = text => {
                if (typeof (text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            }
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
        if (command === 'stats' || command === 'stastics') {
            const { stripIndent } = require('common-tags');
            const used = process.memoryUsage().heapUsed / 1024 / 1024
            const clientStats = stripIndent`
                     Servers   :: ${message.client.guilds.cache.size}
                     Users     :: ${message.client.users.cache.size}
                     Channels  :: ${message.client.channels.cache.size}
                     WS Ping   :: ${Math.round(message.client.ws.ping)}ms
    `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const duration = moment.duration(os.uptime()).format(" D [days], H [hrs], m [mins], s [secs]");
    const serverStats = stripIndent`
                     OS        :: ${await os.oos()}
                     CPU       :: ${cpu.model()}
                     Cores     :: ${cpu.count()}
                     CPU Usage :: ${await cpu.usage()} %
                     RAM       :: ${totalMemMb} MB
                     RAM Usage :: ${usedMemMb} MB
                     Uptime    :: ${duration}
                     
    `;
         const duration2 = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const embed = new Discord.MessageEmbed()
                .setTitle(`${client.user.tag} statistics`)
                .addFields(
                    { name: '**⬆ Uptime**', value: `${duration2}`, inline: true },
                    { name: '💻 **Memory Usage**', value: `${Math.round(used * 100) / 100} MB`, inline: true },
                    { name: '**🧾 Library**', value: `[discord.js](https://discord.js.org/)`, inline: true },
                    { name: '**🔗 Source Code**', value: '[Github.com](https://github.com/DerpCoders/fab-main-js)', inline: true },
                    { name: '**📆 Created at**', value: `**${client.user.tag}** was created on **${client.user.createdAt.toLocaleString()}**`, inline: true },
                    { name: '**🎉 Top.gg**', value: `[View here](https://top.gg/bot/759762948016177195)`, inline: true},
                    { name: '**👨 Client**', value:  `\`\`\`asciidoc\n${clientStats}\`\`\``, inline: false},
                    { name: '**⚙ Server**', value: `\`\`\`asciidoc\n${serverStats}\`\`\``, inline: true},
                )
                .setColor('26fc98')
                .setFooter('© 2019-2020 Hey Fab, I\'mma kill you#0640')

        message.channel.send('Creating embed and stats please wait.....').then(sentmsg => {
            setTimeout(()=>{
               sentmsg.delete();
               }, 5000); 
        });
        message.channel.startTyping()
        setTimeout(() => {
            message.channel.stopTyping();
            message.channel.send(embed);
        }, 5000)
    }
    
        if (message.channel.type === 'text' && message.content === prefix + 'ping') {
            var ping = Date.now() - message.createdTimestamp + "ms";
            const pingEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('🏓Pong!')
                .addFields(
                    { name: `${message.author.username}'s ping is:`, value: `Bot Latency: ${client.ws.ping}ms\nAPI Latency: ${ping}` }
                )
                .setTimestamp()
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: false }))
            message.channel.send(pingEmbed);
        }
        if (command === 'gcount' || command === 'guildcount') {
            message.channel.send(`I'm currently in **${client.guilds.cache.size}** servers! LOL`)
        }
        if (command === 'owner') {
            message.channel.send(`Owner of this server(guild) is - **${message.guild.owner.user.username}**`);
        }

        if (command === 'softunban' || command === 'sftunban') {
            const banuser = message.guild.member(message.mentions.users.first());
            const ro = message.guild.roles.cache.find(rol => rol.name === 'Banned');
            const memm = message.guild.roles.cache.find(r => r.name.toLowerCase().includes('members'));
            if (!banuser) return;
            if (!memm) return;
            if (!ro) return message.channel.send('There is no Banned role!');
            if (!banuser.roles.cache.some(rol => rol.name === 'Banned')) return message.channel.send('That member is not banned');
            banuser.roles.remove(ro) && message.channel.send(`Unbanned ${banuser.displayName}`) && banuser.roles.add(memm) && ro.delete();
        }
        
        if (command === 'uptime') {
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

            const utEmbed = new Discord.MessageEmbed()
                .setTitle(`${client.user.tag}'s uptime!`)
                .setDescription(`I've been running for **${duration}** `)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(utEmbed);
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
                .setDescription("[Invite](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=1544944766&scope=bot)")
            message.channel.send(bed)
        }

        if (message.content === prefix + 'help us') {
            let helpembed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('**Commands, Prefix is ` **')
                .setDescription('\n\n**⛔ MODERATION-**\n`ban`, `softban`, `kick`, `poll`, `clear`, `bcount`, `serverinfo`, `userinfo`\n\n**🏃 FUN-**\n`I want vid`, `npm`, `youtube`, `gis`, `news`, `joke`, `advice`, `kpop`, `I want vid MK`, `kiss`, `punch`, `pat`, `slap`, `kill`, `spank`, `poke`, `avatar`\n\n**🏓 Games- **\n`battle`, \n\n**📷 Images/Gifs- **\n`meme`, `blur`, `gay`, `jail`, `trigger`, `anime`\n\n**😏 NSFW- **\n`pussy`, `cumsluts`, `hentai`\n\n🛠 Utility-**\n`ping`, `stats`, `uptime`, `invite`\n\n**NOTE: If you want to disable any commands or messages for your server (because we don\'t have a database yet) - [Join our support](https://discord.gg/J73GfuFxNq) or DM to '+botOwner+'**\n\n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=1544944766&scope=bot) || [Join our Support server](https://discord.gg/r2sqEsV)\n\n**Use `help <command> for more info about a command**')
                .setTimestamp()
                .setFooter('Commands are still being added')
                .setThumbnail('https://cdn.discordapp.com/attachments/624080970731094016/760842758423707678/oie_6twFRGwWX7oC.jpg')
                message.channel.send(helpembed);
        }

        if (command === 'reactions') {
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌ **You can\'t use that!**')
            let rEmbed = new Discord.MessageEmbed()
                .setTitle('React to get free roles!!')
                .setDescription('```-React to get yourself a free role!```\n**-If you want to remove any role go ahead and unreact!**\n\n <:discord:758707913081487380> to get role: `Active on Discord`')
                .setColor('GREEN')
            let msgEmbed = await message.channel.send(rEmbed)
            msgEmbed.react('758707913081487380');
        }

        if (message.content.toLowerCase() === prefix + 'help ban') {
            message.channel.send('`ban` command is used for banning any guild member with a DM to the member banned (Reason is not optional)');
        }
        if (message.content.toLowerCase() === prefix + 'help softban' || message.content.toLowerCase() === prefix + 'help soft ban') {
            message.channel.send('`softban` command is used for banning any member but that member is not banned from the guild. He/she can\'t send any messages. All roles will be removed and bot will give a new role "Banned" with permissions: Read Meassage History')
        }
        if (message.content.toLowerCase() === prefix + 'help kick') {
            message.channel.send('`kick` command is used for kicking any guild member with a DM to the member banned (Reason is not optional)');
        }
        if (message.content.toLowerCase() === prefix + 'help poll') {
            message.channel.send('`poll` command is used to create polls with reactions YES, NO or OTHER.');
        }
        if (message.content.toLowerCase() === prefix + 'help anime'){
            message.channel.send('`anime` command gives you random anime images (No NSFW Content)');
        }
        if (message.content.toLowerCase() === prefix + 'help gis'){
            message.channel.send('`gis` stands for *Google Image Search* that uses Google\'s API to search for images.\nExample Usage: `gis dog will give you a dog image.')
        }
        if (message.content.toLowerCase() === prefix + 'help clear'){
            message.channel.send('`clear` command is used for deleting multiple messages at a time.\nExample Usage: `clear 10 will delete 10 messages. (**NOTE:** Due to limitation I can delete only 99 messages at once and messages that are older than 14 days will not be deleted)');
        }
        if (message.content.toLowerCase() === prefix + 'help fun or images' || message.content.toLowerCase() === prefix + 'help fun' || message.content.toLowerCase() === prefix + 'help image'){
            message.channel.send('Fun or image commands like `pat`, `kill`, `blur`, `meme` etc. will send a random image/gif, Blur command will send blurred avatar.')
        }
        if (message.content.toLowerCase() === prefix + 'help serverinfo' || message.content.toLowerCase() === prefix + 'help server info'){
            message.channel.send('`serverinfo` command will send a neat embed with all information about a guild. (**NOTE: This command requires you to have `MANAGE_GUILD` permission.**)')
        }
        if (message.content.toLowerCase() === prefix + 'help userinfo' || message.content.toLowerCase() === prefix + 'help user info'){
            message.channel.send('`userinfo` command is used for getting detailed info about a member/user in a neat embed.');
        }
        if (message.content.toLowerCase() === prefix + 'help youtube' || message.content.toLowerCase() === prefix + 'help yt'){
            message.channel.send('`youtube` or `yt` command will send a youtube link based on your arguments. (**NOTE: Arguments are not optional.**)\nExample Usage: `yt Cyberpunk 2077 will give you a random Cyberpunk video or gameplay.')
        }

    } catch (err) {
        return message.channel.send(`❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact ${botOwner}`) && console.log(err);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '758704935780089886') {
        if (reaction.emoji.name === 'discord') {
            const roleid = '758703665460281397';
            await reaction.message.guild.members.cache.get(user.id).roles.add(roleid)
        }
    }
})

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '758704935780089886') {
        if (reaction.emoji.name === 'discord') {
            const roleid = '758703665460281397';
            await reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)
        }
    }
})

client.on('guildCreate', guild => {
    console.log(`Joined a new guild: "${guild.name}"`);
    const chh = guild.systemChannel;
    const ch = guild.channels.cache.find(ch => ch.name.toLowerCase().includes("general"));
    if (!chh) return ch.send('**Thanks for adding me!** <a:Hey:766884642241511444>\n**1)** *My prefix is* `\n**2)** *You can get a list of commands by running ||<prefix>help|| command.*\n**3)** *If you need any help or report issues join our support server - discord.gg/r2sqEsV*');
    if (!ch) return;
    chh.send('**Thanks for adding me!** <a:Hey:766884642241511444>\n**1)** *My prefix is* `\n**2)** *You can get a list of commands by running ||<prefix>help|| command.*\n**3)** *If you need any help or report issues join our support server - discord.gg/r2sqEsV*');
    chh.send('<:happy:731417035128569907> ')
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
