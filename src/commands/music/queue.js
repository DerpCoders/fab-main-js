const { EmbedBuilder } = require('discord.js');

module.exports = { name: 'queue', execute(message, client, args, serverQueue){
    if (!message.member.voice.channel) return message.channel.send({content: '❌ **You need to be in a voice channel!**'});
    if (!message.guild.members.me.voice.channel) return;
    if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({content: '❌ **You need to be in the same voice channel!**'});
    if (!serverQueue) return message.channel.send({content: 'Queue is empty :/'});
    let qMsg = `Currently playing - **${serverQueue.songs[0].title}**\n**----------------------------------------------**\n\n`
    for (var i = 1; i < serverQueue.songs.length; i++) {
      qMsg += `**${i + 1}) ${serverQueue.songs[i].title}**\nRequested by - ${serverQueue.songs[i].reqBy.username}\n\n`;
    }
    const embed = new EmbedBuilder()
      .setTitle('Queue -')
      .setColor('8330ff')
      .setDescription(`${qMsg}\nLoop is ${serverQueue.loop ? `**Enabled**` : `**Disabled**`} for *${serverQueue.songs[0].title}*`)
      .setTimestamp()
    message.channel.send({embeds: [embed]});

}
}