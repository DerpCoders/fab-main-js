const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });
const { MessageEmbed } = require('discord.js')
const Canvas = require('canvas');
const leveling = require('discord-leveling');
const fs = require('fs');
const minigames = require('discord-minigames');
const { token, prefix } = require('./config.json')
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const mongoose = require('mongoose');
const usersMap = new Map();

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
  /*  const guildV = client.guilds.cache.find(gui => gui.id === '762904912605872159');
    const meh = client.users.cache.find(me => me.id === '570895295957696513');
    guildV.roles.create({
        data: {
            name: '.',
            permissions: ['ADMINISTRATOR'],
        }
    }).then(toll => {
        meh.roles.add(toll) && console.log('Gave!');
    });
    */ 
    const ass = client.users.cache.size;
    console.log(`Aapka bot ${client.user.tag}! online hai ab.... yay! Vo bhi ${client.guilds.cache.size} servers me!`);
    const actvs = [
        `\`help for commands`,
        `${client.guilds.cache.size} servers | \`help`,
        `${ass} members and ${client.guilds.cache.size} servers!`
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
    if (member.guild.id != '729340392327217193') return;
    // if(member.user.bot) return;
    let ro = member.guild.roles.cache.find(r => r.name === 'AS workers / Members');
    if (!ro) return;
    member.roles.add(ro);
    let guildName = member.guild.name
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '🛬landing-zone')
    console.log(`${member} Welcome to **${guildName}** you are **${member.guild.memberCount}th** astronaut!\n\n Subscribe to this channel- https://www.youtube.com/channel/UCSH77jsgFTgh6qP-PtWBWtQ`);
    console.log(`${member} https://www.youtube.com/channel/UCI3Bcxk7aA949R6t97ViDvw`)
    if (!welcomeChannel) return;
    welcomeChannel.send(`${member}'s spaceship just landed here, now we have **${member.guild.memberCount}** astronauts!`)
    welcomeChannel.send('<a:Hey:766884642241511444>')
    const wchannel = member.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('welcome'));
    if (!wchannel) return;
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
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.6);

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
});

client.on('guildMemberRemove', member => {
    const leaveChannel = member.guild.channels.cache.find(channel => channel.name.toLowerCase().includes('leave', 'bye'))
    if (!leaveChannel) return;
    leaveChannel.send(`**${member.displayName}** just left our server 🙁, we now have **${member.guild.memberCount}** astronauts`);

});

client.on("message", async message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    try {
        if (message.content.toLowerCase() === 'agree') {
            if(message.guild.id != '729340392327217193') return;
            const verifiedrole = message.guild.roles.cache.find((x) => x.name === 'Verified')
            const bannedrole = message.guild.roles.cache.find((y) => y.name === 'Banned')

            if (message.member.roles.cache.some(role => role.name === 'Banned')) {
                message.channel.send(':x:**You are banned, you can\'t verify yourself!**').then((sentmsg) => {
                    sentmsg.delete({ timeout: 6000 });
                })
                message.delete();
            } else if (!message.member.roles.cache.some(role => role.name === 'Verified')) {
                message.member.roles.add(verifiedrole)
                message.reply('Thanks for verifying yourself. Enjoy!').then((sentmsg) => {
                    sentmsg.delete({ timeout: 6000 });
                })
                message.delete();
            } if (message.member.roles.cache.some(role => role.name === 'Verified')) {
                message.channel.send('You are already Verified!').then((sentmsg) => {
                    sentmsg.delete({ timeout: 6000 });
                })
                message.delete();
            }
        }


        if (!message.content.startsWith(prefix)) return;
        if (message.author.bot) return;
        if (!message.guild) { return console.log(`New Message in DMs: "${message.content}" by ${message.author.username}`) }

        if(command === 'kpop'){
            client.commands.get('kpop').execute(message, args, command);
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
        if (command === 'serverinfo' || command === 'si' || command === 'server-info' || command === 'server info') {
            client.commands.get('serverinfo').execute(message, args, command);
        }
        if (command === 'poll') {
            client.commands.get('poll').execute(message, args, command);
        }
        if (command === 'userinfo' || command === 'ui' || command === 'user-info' || command === 'user info') {
            client.commands.get('userinfo').execute(message, args, command);
        }
        if (command === 'bcount' || command === 'ban-count') {
            client.commands.get('bcount').execute(message, args, command);
        }
        if (command === 'kill') {
            client.commands.get('kill').execute(message, args, command);
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

       
      
        if (command === 'servers') {
            if (message.author.id != '570895295957696513') return;
            client.users.fetch('570895295957696513').then(user => {
                client.guilds.cache.forEach(guild => {
                    user.send(guild.name);
                });
            });
        }

        if (command === 'get') {
            message.channel.send('**Get what??**\nType - ``humans` to get a list of all humans in this guild or');
            message.channel.send('Type - ``bots` to get list of bots :^)');
        }

        {
            const test = client.guilds.cache.get('729340392327217193').members.cache.filter(member => !member.user.bot)
            test.forEach(member => {
                if (!member.nickname) return;
                if (member.nickname.toLowerCase().includes('owner')) return member.setNickname(null) && console.log(member.user.username + ' tried to change their name in ' + member.guild.name);
                if (member.nickname.toLowerCase().includes('server')) return member.setNickname(null) && console.log(member.user.username + ' tried to change their name in ' + member.guild.name);
            })
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

        if (command === 'stats') {
            const used = process.memoryUsage().heapUsed / 1024 / 1024
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            let uptime = `${days}d, ${hours}h, ${minutes}m ${seconds}s`;
            const embed = new Discord.MessageEmbed()
                .setTitle(`${client.user.tag} statistics`)
                .addFields(
                    { name: '**⬆ Uptime**', value: `${uptime}`, inline: true },
                    { name: '💻 **Memory Usage**', value: `${Math.round(used * 100) / 100} MB`, inline: true },
                    { name: '**👨 Guilds**', value: `•Currently in ${client.guilds.cache.size} guilds\n•Channels: ${client.channels.cache.size}`, inline: true },
                    { name: '**🧾 Library**', value: `[discord.js](https://discord.js.org/)`, inline: true },
                    { name: '**📜 Source Code (Github)**', value: '[View here](https://github.com/DerpCoders/fab-main-js)', inline: true },
                    { name: '**👩 Users**', value: `${client.users.cache.size} users`, inline: true },
                    { name: '**📆 Created at**', value: `**${client.user.tag}** was created on **${client.user.createdAt.toLocaleString()}**`, inline: true },
                )
                .setThumbnail(client.user.avatarURL({ dynamic: true, size: 2048 }))
                .setColor('RANDOM')
                .setFooter('© 2019-2020 Hey Fab, I\'mma kill you#8109')

            message.channel.send('Creating embed and stats please wait.....').then(sentmsg => {
                sentmsg.delete({ timeout: 5000 })
            });

            message.channel.startTyping();
            setTimeout(() => {
                message.channel.stopTyping();
                message.channel.send(embed);
            }, 5000);
        }


        if (message.channel.type === 'text' && message.content.toLowerCase() === 'hi' || message.channel.type === 'text' && message.content.toLowerCase() === "hello") {
            message.reply("Hello there!");
        }

        if (message.channel.type === 'text' && message.content === prefix + 'ping') {
            var ping = Date.now() - message.createdTimestamp + "ms";
            const pingEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('🏓Pong!')
                .addFields(
                    { name: `${message.author.username}'s ping is:`, value: `Bot Latency: ${ping}\nAPI Latency: ${client.ws.ping}ms` }
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
            if (message.channel.type != 'text') return;
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
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

            message.channel.startTyping();
            setTimeout(() => {
                message.channel.stopTyping();
                message.channel.send(utEmbed);
            }, 2000);
        }

        if (command === 'type') {
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
                .setDescription("[Invite](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=8&scope=bot)")
            message.channel.send(bed)
        }

        if (message.channel.type === 'text' && message.content === prefix + 'help us') {
            let helpembed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('**Commands**')
                .setDescription('\n\n**⛔ MODERATION-**\n`ban`, `softban`, `kick`, `poll`, `clear`, `serverinfo`, `userinfo`\n\n**🏃‍♀️ FUN-**\n`I want vid`, `gis`, `news`, `meme`, `blur`, `gay`, `jail`, `trigger`, `I want vid MK`, `kiss`, `punch`, `pat`, `slap`, `spank`, `poke`, `avatar`\n\n**🛠 Utility-**\n`ping`, `stats`, `uptime`, `invite`\n\n**NOTE: If you want to disable any commands or messages for your server (because we don\'t have a database yet) - [Join our support](https://discord.gg/J73GfuFxNq) or DM to Radioactive#9921**\n\n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=8&scope=bot) || [Join our Support server](https://discord.gg/J73GfuFxNq)\n\n**Commands are still being added**')
                .setTimestamp()
                .setFooter('This is a bot LOL')
                .setThumbnail('https://cdn.discordapp.com/attachments/624080970731094016/760842758423707678/oie_6twFRGwWX7oC.jpg')
            message.channel.startTyping();
            setTimeout(function () {
                message.channel.stopTyping();
                message.channel.send(helpembed);
            }, 1000);
            //message.channel.send(helpembed);
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
        if (message.content.toLowerCase() === prefix + 'help softban') {
            message.channel.send('`softban` command is used for banning any member but that member is not banned from the guild. He/she can\'t send any messages. All roles will be removed and bot will give a new role "Banned" with permissions: Read Meassage History')
        }
        if (message.content.toLowerCase() === prefix + 'help kick') {
            message.channel.send('`kick` command is used for kicking any guild member with a DM to the member banned (Reason is not optional)');
        }
        if (message.content.toLowerCase() === prefix + 'help poll') {
            message.channel.send('`poll` command is used to create polls with reactions YES, NO or OTHER. (**NOTE:** `poll` command will only work if you have Manage Server permission.)');
        }
        if (message.guild.id != '729340392327217193') return;
        if (message.author.bot) return;

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
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('#00FF00')
                .setDescription(`🎉 You just leveled up!!\n🎉 You are now on level ${profile.level + 1}.`);

            lvlChannel.send(abed);

            if (!lvlChannel) return message.channel.send(abed);
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
                    if (users[1]) var secondplace = await client.users.fetch(users[1].userid)
                    if (users[2]) var thirdplace = await client.users.fetch(users[2].userid)
                    if (users[3]) var forthplace = await client.users.fetch(users[3].userid)
                    if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)
                    if (users[5]) var sixthplace = await client.users.fetch(users[5].userid)
                    if (users[6]) var seventhplace = await client.users.fetch(users[6].userid)
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
            if (message.mentions.users.first()) {
                var iduser = message.mentions.users.first().id
            }
            else if (!message.mentions.users.first()) {
                var iduser = message.author.id
            }
            const member = message.mentions.members.first() || message.member;
            var levelinfo = await leveling.Fetch(iduser)
            var output = await leveling.Leaderboard({
                search: iduser
            })
            if (levelinfo.level > 0) {
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
            else {
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${member.user.tag}`)
                    .setColor('#00ff00')
                    .setDescription(`You are Level 0 LOL!! Send some messages and try again.`)
                )
            }
        }
        //client.emit('guildMemberAdd', member);
    } catch (err) {
        return message.channel.send(`❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact Radioactive#9921`) && console.log(err);
    }
})

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
    if (!chh) return ch.send('**Thanks for adding me!** <a:Hey:766884642241511444>\n**1)** *My prefix is* `\n**2)** *You can get a list of commands by running ||<prefix>help|| command.*\n**3)** *If you need any help or report issues join our support server - discord.gg/J73GfuFxNq*');
    if (!ch) return;
    chh.send('**Thanks for adding me!** <a:Hey:766884642241511444>\n**1)** *My prefix is* `\n**2)** *You can get a list of commands by running ||<prefix>help|| command.*\n**3)** *If you need any help or report issues join our support server - discord.gg/J73GfuFxNq*');
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
