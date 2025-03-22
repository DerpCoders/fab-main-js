const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pp', async execute(message, args, client) {
        let randomSize = Math.floor(Math.random() * 12) + 1;
        let pp;
        let ppUser;
        if (message.mentions.users.last()) {
            ppUser = message.mentions.users.last();
        }
        else if (args[0]) {
            ppUser = message.guild.members.cache.get(args[0]).user
        }
        else {
            ppUser = message.author;
        }
        if(ppUser.bot) return message.channel.send({content: '<:PeepoWeird:773782009980911667> Bots don\'t have pp'});
        if (randomSize == 1) {
            pp = '8=D';
        }
        else if (randomSize == 2) {
            pp = '8==D';
        }
        else if (randomSize == 3) {
            pp = '8===D';
        }
        else if (randomSize == 4) {
            pp = '8====D';
        }
        else if (randomSize == 5) {
            pp = '8=====D';
        }
        else if (randomSize == 6) {
            pp = '8======D';
        }
        else if (randomSize == 7) {
            pp = '8=======D';
        }
        else if (randomSize == 8) {
            pp = '8========D';
        }
        else if (randomSize == 9) {
            pp = '8=========D';
        }
        else if (randomSize == 10) {
            pp = '8==========D';
        }
        else if (randomSize == 11) {
            pp = 'No PP :(';
        }
        else if (randomSize == 12) {
            pp = 'No PP :(';
        }
        let embed = new EmbedBuilder()
            .setTitle('PP size')
            .setDescription(`**${ppUser.username}'s** pp is - \n ${pp}`)
            .setColor('Random')
            .setTimestamp()
        message.channel.send({embeds: [embed]});
    }
}