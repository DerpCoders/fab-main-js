module.exports = { name: 'remove', execute(message, client, args, serverQueue){
    if (!message.member.voice.channel) return message.channel.send({content: '❌ **You need to be in a voice channel!**'});
    if (!message.guild.members.me.voice.channel) return;
    if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({content: '❌ **You need to be in the same voice channel!**'});
    if (!serverQueue) return message.channel.send({content: 'There\'s nothing in queue!'});
    if (serverQueue.songs.length == 1) return message.channel.send({content: 'There is only one song in queue!'});
    let songT = args[0];
    if (!songT) return message.channel.send({content: '❌ Enter a valid song number!'});
    if (isNaN(songT)) return message.channel.send({content: '❌ Enter a valid song number!'});
    if (songT <= 1 || songT > serverQueue.songs.length) return message.channel.send({content: `❌ Enter a valid song number!`});
    serverQueue.songs.splice(songT - 1, 1);
    message.channel.send({content: `🗑 Removed song number **${songT}** from queue!`});
}
}