module.exports = { name: 'volume', execute(message, client, args, serverQueue){
    if (!message.member.voice.channel) return message.channel.send({content: '❌ **You need to be in a voice channel!**'});
    if (!serverQueue) return message.channel.send({content: 'No song is playing right now!'});
    if (!args.slice(0).join(" ")) return message.channel.send({content: `🔊 Volume is: ${serverQueue.volume * 100}`});
    if (isNaN(args[0])) return message.channel.send({content: '⚠️ Invalid Arguments\nExpected: `volume <int>`'});
    let volume = parseInt(args[0]);
    if (volume < 1 || volume > 100) {
        return message.channel.send('⚠️ Please enter a number between **1 and 100**.');
    }
    serverQueue.volume = volume / 100;
    serverQueue.resource.volume.setVolume(serverQueue.volume);
    message.channel.send({content: `🔊 Volume set to: **${volume}**`});
}
}