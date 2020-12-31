const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'help',
    execute(message, args){
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('**Commands, Prefix is ` **')
        .setDescription('\n\n**⛔ MODERATION-**\n`ban`, `softban`, `kick`, `poll`, `clear`, `bcount`, `serverinfo`, `userinfo`\n\n**🏃‍♀️ FUN-**\n`I want vid`, `npm`, `youtube`, `gis`, `news`, `joke`, `advice`, `kpop`, `I want vid MK`, `kiss`, `punch`, `pat`, `slap`, `kill`, `spank`, `poke`, `hug`, `avatar`\n\n**🏓 Games- **\n`battle`, \n\n**📷 Images/Gifs- **\n`meme`, `blur`, `gay`, `jail`, `trigger`\n\n**😏 NSFW- **\n`pussy`, `cumsluts`, `hentai`\n\n**🛠 Utility-**\n`ping`, `stats`, `uptime`, `invite`\n\n**NOTE: If you want to disable any commands or messages for your server (because we don\'t have a database yet) - [Join our support](https://discord.gg/J73GfuFxNq) or DM to Fab was taken#0001**\n\n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=1544944766&scope=bot)\n\n**Use `help <command> for more info about a command**')
        .setTimestamp()
        .setFooter('Commands are still being added')
        .setThumbnail('https://cdn.discordapp.com/attachments/624080970731094016/760842758423707678/oie_6twFRGwWX7oC.jpg')
        message.react('🇩');
        message.react('🇲');
            message.author.send(exampleEmbed) && message.author.send('Join if you still need help - discord.gg/r2sqEsV')
            .catch((err) => message.channel.send('**You have DMs turned off!**') && console.log(err));
    }
    
    }
