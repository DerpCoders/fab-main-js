const Discord = require('discord.js');
const CMD = new Set();

module.exports = {
    name: 'spank',
    execute(message, args){
        const spUser = message.mentions.members.first()
                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min)) + min;
                }
                var url1;
                let origin;
                let title;
                let footer;
        var random = getRandomInt(0,4);
        if(random == 0){
            url1 = 'https://media1.tenor.com/images/5f05ce0dbd223f72dce8d46b4db78c30/tenor.gif?itemid=15636770';
        origin = 'Source: Tenor | Due to NSFW content there are no anime gifs for this command.';
        title = 'xD';
        footer = 'https://tenor.com/assets/img/tenor-app-icon.png'
        }else if(random == 1){
            url1 = 'https://media1.tenor.com/images/5b7639d44761d30acb49053c85a91cc8/tenor.gif?itemid=7914063';
        origin = 'Source: Tenor';
        title = 'LOL too fast';
        footer = 'https://tenor.com/assets/img/tenor-app-icon.png';
        }else if(random == 2){
            url1 = 'https://i.pinimg.com/originals/ea/fb/13/eafb13b900645ddf3b30cf9cc28e9f91.gif';
        origin = 'Source: Pinterest | Due to NSFW content there are no anime gifs for this command.';
        title = 'LOL';
        footer = 'https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png';
        }else if(random == 3){
            url1 = 'https://pa1.narvii.com/6079/b1e5e91c2aa7da179b8b5c4f821fe50f7516fea3_hq.gif';
        origin = 'Source: Animo apps'
        title = 'oof, hard spank';
        footer = null;
        }
     if (CMD.has(message.author.id)){
                message.channel.send(`**🚫 Please wait 5 seconds before using that command again**`).then(sentmsg => 
                  sentmsg.delete({timeout : 5000}))
            
     }else if(!spUser || message.author.id == spUser.id){
                message.channel.send('❌ **Wrong arguments please mention someone.**');
            CMD.add(message.author.id); 
            setTimeout(() => {
                CMD.delete(message.author.id); 
            }, 5000);
    }else if(spUser.id === '759762948016177195') return message.channel.send('Hahaha, you can\'t do that with me.')
    else{
            const aEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${message.author.username} spanked ${spUser.displayName} `+ title , message.author.displayAvatarURL({size: 2048, dynamic: true}))
            .setImage(URL=url1)
            .setFooter(origin, URL=footer)
            message.channel.send(aEmbed);
            CMD.add(message.author.id); 
            setTimeout(() => {
                CMD.delete(message.author.id); 
            }, 5000);
            }
        }
    }