const Discord = require('discord.js');
const cooldown = new Set();

module.exports = {
    name: 'slap',
    execute(message, args) {
        try {
            const slapmem = message.mentions.members.first();
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var url1;
            var title;
            let origin;
            var random = getRandomInt(0, 3);
            if (random == 0) {
                url1 = 'https://media1.tenor.com/images/af36628688f5f50f297c5e4bce61a35c/tenor.gif?itemid=17314633';
                origin = 'Source: Tenor ';
                title = 'LMAO'
            } else if (random == 1) {
                url1 = 'https://i.pinimg.com/originals/4e/9e/a1/4e9ea150354ad3159339b202cbc6cad9.gif';
                origin = 'Source: Pinterest';
                title = 'oof xD';
            } else if (random == 2) {
                url1 = 'https://i.imgur.com/VW0cOyL.gif';
                origin = 'Source: Imgur';
                title = 'LOL';
            } else if (random == 3) {
                url1 = 'https://steamuserimages-a.akamaihd.net/ugc/850473950842117246/8C83635F86CE09C683D511622D7ED2B85BAD3ADD/';
                origin = 'Source: Steam Community';
                title = 'LOL';
            }
            if (cooldown.has(message.author.id)) {
                message.channel.send(`**🚫 Please wait 5 seconds before using that command again**`).then(sentmsg =>
                    sentmsg.delete({ timeout: 5000 }))

            } else if (!slapmem || message.author.id == slapmem.id) {
                message.channel.send('❌ **Wrong arguments please mention someone.**');
            } 
            else if (slapmem.id === '759762948016177195') return message.channel.send('Hahaha, you can\'t do that with me ;)')
            else {
                const aEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`${message.author.username} slapped ${slapmem.displayName} ` + title, message.author.displayAvatarURL({ size: 2048, dynamic: true }))
                    .setImage(URL = url1)
                    .setFooter(origin)
                message.channel.send(aEmbed);
                cooldown.add(message.author.id);
                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, 5000);
            } 
            } catch (err) {
                return message.channel.send(`❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact Radioactive#6270`) && console.log(err);
        }
    }
}