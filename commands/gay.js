const Discord = require('discord.js');
const Zoro = require('zoro-api');

module.exports = {
    name: 'gay',
    description: 'gay avatar',
 async execute(message, args){
            let useer = message.mentions.users.first() || message.author;
            
            let avatar = useer.displayAvatarURL({ size: 2048 }).replace(".webp", ".png")
        
            const msg = await message.channel.send("*Generating ....*")
       
            let img = await Zoro.gay(avatar)
            if(useer.id === '759762948016177195') return message.channel.send('xD **NO** I am a bot not || gay ||');
            let attachment = new Discord.MessageAttachment(img, "gay.png");
            const embed = new Discord.MessageEmbed()
            .setTitle(`Is ${message.guild.member(useer).displayName} gay? xD`)
            .setColor('RANDOM')
            .attachFiles([attachment])
            .setImage('attachment://gay.png')
            .setTimestamp()
            message.channel.send(embed) && msg.delete();
        }
    }
