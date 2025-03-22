module.exports = { name: 'loop', execute(message, client, args, serverQueue){
    if (!message.member.voice.channel) return message.channel.send({content: '❌ **You need to be in a voice channel!**'});
    if (!message.guild.members.me.voice.channel) return;
    if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({content: '❌ **You need to be in the same voice channel!**'});
    if (!serverQueue) return message.channel.send({content: 'There\'s nothing in queue!'});

    serverQueue.loop = !serverQueue.loop;

    message.channel.send({content: `➿ Loop is now ${serverQueue.loop ? `**Enabled**` : `**Disabled**`}`})
  }
}