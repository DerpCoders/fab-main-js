const Discord = require('discord.js');
const { execute } = require('./pat');

module.exports = {
    name: 'help',
    description: 'help',
    execute(message, args){
if(!message.content.startsWith('`')) return;
        message.channel.send('Check your DMs :)')
        message.react('🇩');
        message.react('🇴');
        message.react('🇳');
        message.react('🇪');
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('**Commands - **')
        .setDescription('\n\n**⛔ MODERATION-**\n`ban`, `softban`, `kick`, `poll`, `clear`, `serverinfo`, `userinfo`\n\n**🏃‍♀️ FUN-**\n`I want vid`, `gis`, `news`, `meme`, `blur`, `gay`, `jail`, `trigger`, `I want vid MK`, `kiss`, `punch`, `pat`, `slap`, `spank`, `poke`, `avatar`\n\n**🛠 Utility-**\n`ping`, `stats`, `uptime`, `invite`\n\n**NOTE: If you want to disable any commands or messages for your server (because we don\'t have a database yet) - [Join our support](https://discord.gg/J73GfuFxNq) or DM to Radioactive#9921**\n\n[Invite Me!](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=8&scope=bot)\n\n**Commands are still being added**')
        .setTimestamp()
        .setFooter('This is a bot LOL')
        .setThumbnail('https://cdn.discordapp.com/attachments/624080970731094016/760842758423707678/oie_6twFRGwWX7oC.jpg')
        message.channel.startTyping();
        setTimeout(function() {
            message.channel.stopTyping();
            message.author.send(exampleEmbed);
            message.author.send('Join if you still need help - discord.gg/J73GfuFxNq');
        }, 900);
    }
    
    }
