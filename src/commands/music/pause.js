module.exports = {
    name: 'pause', execute(message, client, args, serverQueue) {
        if (!message.member.voice.channel) return message.channel.send({ content: '❌ **You need to be in a voice channel!**' });
        if (!message.guild.members.me.voice.channel) return;
        if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({ content: '❌ **You need to be in the same voice channel!**' });
        if (!serverQueue) return message.channel.send({ content: 'There\'s nothing in queue!' });
        if (!serverQueue.playing) return message.channel.send({ content: 'Already paused' });
        serverQueue.playing = false;
        serverQueue.pausedTime = Date.now();   
        serverQueue.player.pause();
        message.channel.send({ content: ':pause_button: Paused' })
    }
}