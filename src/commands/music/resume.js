module.exports = {
    name: 'resume', execute(message, client, args, serverQueue) {
        if (!message.member.voice.channel) return message.channel.send({ content: '❌ **You need to be in a voice channel!**' });
        if (!message.guild.members.me.voice.channel) return;
        if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({ content: '❌ **You need to be in the same voice channel!**' });
        if (!serverQueue) return message.channel.send({ content: 'There\'s nothing in queue!' });
        if (serverQueue.playing) return message.channel.send({ content: 'Already playing' });
        serverQueue.playing = true
        const pausedDuration = Date.now() - serverQueue.pausedTime; // Calculate how long it was paused
        serverQueue.songs[0].startTime += pausedDuration; // Adjust song start time
        serverQueue.player.unpause();
        serverQueue.pausedTime = null;
        message.channel.send({ content: ':arrow_forward: Resumed' })
    }
}