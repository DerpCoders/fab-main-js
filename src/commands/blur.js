const Discord = require('discord.js');
const Zoro = require('zoro-api');

module.exports = {
    name: 'blur',
    description: 'blurs avatar',
 async execute(message, args){
            let user = message.mentions.users.first() || message.author;
            
            let avatar = user.displayAvatarURL({ size: 2048 }).replace(".webp", ".png")
        
            const msg = await message.channel.send("*Generating ....*")
       
            let img = await Zoro.blur(avatar)
            
            let attachment = new Discord.MessageAttachment(img, "blur.png");
            const embed = new Discord.MessageEmbed()
            .setTitle(`Blurred ${message.guild.member(user).displayName}'s avatar!`)
            .setColor('RANDOM')
            .attachFiles([attachment])
            .setImage('attachment://blur.png')
            .setTimestamp()
            message.channel.send(embed) && msg.delete();
            if(user.id === '759762948016177195'){
                message.channel.send('Uhh oh, I can\'t see anything....');
            }
        }
    }
