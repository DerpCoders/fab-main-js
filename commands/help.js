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
        .setTitle('**Commands**')
        .setDescription('\n\n**⛔ MODERATION-**\n`ban`, `kick`, `poll`, `clear`, `invite`, `serverinfo`, `userinfo`\n\n**🏃‍♀️ FUN-**\n`I want vid`, `uptime`, `news`, `meme`, `I want vid MK`, `kiss`, `punch`, `pat`, `poke`, `avatar`\n\n**😏 NSFW-**\n`pussy`,\n\n**❌ Ignore these-**\n`help pursuit`, `help ds`, `hi`, `ping`, `YT trends`\n\n[Invite](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=0&scope=bot)\n\n**Commands are still being added**')
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
