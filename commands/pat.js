const Discord = require('discord.js');
const commandCooldown = new Set();

module.exports = {
    name: 'pat',
    description: "pat",
    execute(message, args){
        if (message.channel.type === 'text'){
        const patUser = message.mentions.members.first()
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var url1;
            let origin;
    var random = getRandomInt(0,9);
    if(random == 0){
        url1 = 'https://i.ytimg.com/vi/AfizgkRbWQk/maxresdefault.jpg'
    origin = 'Source: YouTube'
    }else if(random == 1){
        url1 = 'https://i.pinimg.com/originals/2e/27/d5/2e27d5d124bc2a62ddeb5dc9e7a73dd8.gif'
    origin = 'Source: Unknown'
    }else if(random == 2){
        url1 = 'https://media2.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif'
    origin = 'Source: Giphy'
    }else if(random == 3){
        url1 = 'https://media2.giphy.com/media/M3a51DMeWvYUo/200.gif'
    origin = 'Source: Giphy'
    }else if(random == 4){
        url1 = 'https://i.gifer.com/KJ42.gif'
    origin = 'Source: Gifer'
    }else if(random == 5){
        url1 = 'https://pa1.narvii.com/6400/8685249d3f096bae8cdd976c1b33513c5dc415b2_hq.gif'
    origin = 'Source: unknown'
    }else if(random == 6){
        url1 = 'https://i.pinimg.com/originals/68/c1/b6/68c1b61a30b4eccb033c4a47895c7be0.gif'
    origin = 'Source: Pinterest'
    }else if(random == 7){
        url1 = 'https://64.media.tumblr.com/6289c42ea805f475698f02207da0a377/tumblr_p14hcsxPsb1tm1dgio1_400.gifv'
    origin = 'Source: Tumblr'
    }else if(random == 8){
        url1 = 'https://i.imgur.com/BA8Z7ZU.gif'
    origin = 'Source: Reddit'
    }else if(random == 9){
        url1 = 'https://media1.tenor.com/images/c0bcaeaa785a6bdf1fae82ecac65d0cc/tenor.gif'
    origin = 'Source: Tenor'
    }

    if (commandCooldown.has(message.author.id)){
        message.channel.send(`**🚫 Please wait 5 seconds before using that command again**`).then(sentmsg => 
          sentmsg.delete({timeout : 5000}))

    }else if(!patUser || message.author.id == patUser.id){
    const pEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} pats!`, message.author.displayAvatarURL({size: 2048, dynamic: true}))
    .setColor('RANDOM')
    .setImage(URL=url1)
    .setFooter(origin)
    message.channel.send(pEmbed);
    commandCooldown.add(message.author.id); 
    setTimeout(() => {
        commandCooldown.delete(message.author.id); 
    }, 5000);
}else if(patUser.id === '759762948016177195') return message.channel.send('Hahaha, you can\'t ');
    else{
    const aEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`${message.author.username} pats ${patUser.displayName} :D`, message.author.displayAvatarURL({size: 2048, dynamic: true}))
    .setImage(URL=url1)
    .setFooter(origin)
    message.channel.send(aEmbed);
    commandCooldown.add(message.author.id); 
    setTimeout(() => {
        commandCooldown.delete(message.author.id); 
    }, 5000);
}
    }
    }
  
}

