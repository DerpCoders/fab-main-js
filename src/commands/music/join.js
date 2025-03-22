module.exports = { name: 'join', execute(message, client, args, serverQueue){
    if (!message.member.voice.channel) return message.channel.send({content: '❌ **You need to be in a voice channel!**'});
    if (!serverQueue) return message.channel.send({content: '**There is nothing in queue and no song is currently playing!\nUse `play` command to play a song.**'});
    serverQueue.voiceChannel = message.member.voice.channel;
    message.member.voice.channel.join();
    message.channel.send({content: `✅ **Joined ${message.member.voice.channel.name}!**`});
}
}