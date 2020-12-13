const Discord = require('discord.js');
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = { name: 'kpop', async execute(message, args) {

    let data = await random.getKpop();
    // const eme = new Discord.MessageEmbed()
    // .setTitle('IDK what is Kpop :/')
    // .setImage(data.url)
    // .setTimestamp()
    message.channel.send(data);
 }
}