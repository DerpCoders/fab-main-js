const Discord = require('discord.js');
const cmdCooldown = new Set()

module.exports = {
    name: 'poke',
    description: 'poke',
    execute(message, args){
        if(message.channel.type === 'text'){
        const pokeUser = message.mentions.members.first() 
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

            var url;
            let origin;
        var random = getRandomInt(0,7);
        if(random == 0){
            url = 'https://media1.tenor.com/images/3b9cffb5b30236f678fdccf442006a43/tenor.gif';
            origin = 'Source: Tenor';
        }else if(random == 1){
            url = 'https://i.imgur.com/7l5duGX.gif';
            origin = 'Source: Imgur';
        }else if(random == 2){
            url = 'https://thumbs.gfycat.com/IndolentFragrantIrishterrier-small.gif';
            origin = 'Source: Gfycat';
        }else if(random == 3){
            url = 'https://thumbs.gfycat.com/CrispLinearHellbender-size_restricted.gif';
            origin = 'Source: Gfycat';
        }else if(random == 4){
            url = 'https://media2.giphy.com/media/FdinyvXRa8zekBkcdK/giphy.gif';
            origin = 'Source: Giphy';
        }else if(random == 5){
            url = 'https://i.gifer.com/S00v.gif';
            origin = 'Source: Gifer';
        }else if(random == 6){
            url = 'https://i.makeagif.com/media/1-27-2018/AwAZEo.gif';
            origin = 'Source: Make a gif';
        }else if(random == 7){
            url = 'https://media1.tenor.com/images/8fe23ec8e2c5e44964e5c11983ff6f41/tenor.gif?itemid=5600215';
            origin = 'Source: Tenor';
        }
        if (cmdCooldown.has(message.author.id)){
            message.channel.send(`**🚫 Please wait 5 seconds before using that command again**`).then(sentmsg => 
              sentmsg.delete({timeout : 5000}))

        }else if(!pokeUser || message.author.id === pokeUser.id){
            message.channel.send('❌ **Wrong arguments please mention someone.**');
            cmdCooldown.add(message.author.id)
            setTimeout(() => {
                cmdCooldown.delete(message.author.id); 
            }, 5000);
        }else if(pokeUser.id === '759762948016177195') return message.channel.send('Want to poke me? Huh')
        else{
            const pokEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} poked ${pokeUser.displayName}!`, message.author.displayAvatarURL({size: 2048, dynamic: true}))
            .setColor('RANDOM')
            .setFooter(origin)
            .setImage(URL=url)
            message.channel.startTyping();
            setTimeout(function() {
                message.channel.stopTyping();
                message.channel.send(pokEmbed);
            }, 1000);
            cmdCooldown.add(message.author.id); 
            setTimeout(() => {
                cmdCooldown.delete(message.author.id); 
            }, 5000);
        }
        }
    }
}