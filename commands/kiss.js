const Discord = require('discord.js');

module.exports = {
    name: 'kiss',
    description: "kiss",
    execute(message, args){
        if (message.channel.type === 'text'){
        const kissUser = message.mentions.members.first()
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var url1;
            let origin;
    var random = getRandomInt(0,4);
    if(random == 0){
        url1 = 'https://i.chzbgr.com/full/8474882048/h22A2BFCE/get-a-room.gif';
    origin = 'Source: Unknown';
    }else if(random == 1){
        url1 = 'https://media.tenor.com/images/a77daff38773eeb999d702d74ecd83bd/tenor.gif';
    origin = 'Source: Tenor';
    }else if(random == 2){
        url1 = 'https://media1.tenor.com/images/0df97f6253419235268ca1a2efdb8e6a/tenor.gif';
    origin = 'Source: Tenor';
    }else if(random == 3){
        url1 = 'https://thumbs.gfycat.com/AdvancedWellinformedAmphibian-small.gif';
    origin = 'Source: Gfycat';
    }else if(random == 4){
        url1 = 'https://media3.giphy.com/media/eX96PWYeu5LGw/source.gif';
    origin = 'Source: Giphy';
    }
    
            if(!kissUser || message.author.id == kissUser.id){
            message.channel.send('❌ **Wrong arguments please mention someone.**');
            }else if(kissUser.id === '759762948016177195') return message.channel.send('Uhhh, please stop')
            else{
            const iEmbed = new Discord.MessageEmbed()
            .setColor('f16ccd')
            .setAuthor(`${message.author.username} kissed ${kissUser.displayName}!`, message.author.displayAvatarURL({dynamic: true}))
            .setImage(URL=url1)
            .setFooter(origin)
            message.channel.send(iEmbed);
      }
    }
  }
}
