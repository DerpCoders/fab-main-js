const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'gaymeter', description: 'tells how gay u are in %', execute(message, args) {
        let random = Math.floor(Math.random() * 100) + 1;
        const user = message.mentions.users.first() || message.author;
        if (user.id === "599164320936493071") random = 100;
        if (user.id === "570895295957696513") {
            const embed = new EmbedBuilder()
            .setTitle(`Gay meter-`)
            .setColor('Random')
            .setDescription(`That user is perfectly straight :white_check_mark:`)
            message.channel.send({embeds: [embed]});
        } else {
        if (user.bot) return message.channel.send('Bots arent gay <:PepeBase:736183554828009482>');
        const embed = new EmbedBuilder()
            .setTitle(`Gay meter-`)
            .setColor('Random')
            .setDescription(`${user.username} is ${random}% gay 🏳️‍🌈`)
        message.channel.send({embeds: [embed]});
        }
    }
}