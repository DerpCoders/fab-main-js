module.exports = {
    name: 'stop', async execute(message, client, args, serverQueue, queue) {
        if (!message.member.voice.channel) return message.channel.send({ content: '❌ **You need to be in a voice channel!**' });
        if (!message.guild.members.me.voice.channel) return;
        if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({ content: '❌ **You need to be in the same voice channel!**' });
        if (!serverQueue) return message.channel.send({ content: 'There is nothing playing??' });
        serverQueue.connection.destroy();
        queue.delete(message.guild.id)
        message.channel.send({ content: '✅ Disconnected from voice channel and deleted queue!' });
    }
}