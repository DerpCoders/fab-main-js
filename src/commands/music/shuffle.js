module.exports = { name: 'shuffle', async execute(message, args, client, serverQueue){
    if (!message.member.voice.channel) return message.channel.send({content: '❌ **You need to be in a voice channel!**'});
    if (!message.guild.members.me.voice.channel) return;
    if (message.guild.members.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send({content: '❌ **You need to be in the same voice channel!**'});
    if (!serverQueue) return message.channel.send({content: 'There\'s nothing in queue!'});
    if(serverQueue.songs.length <= 2) return message.channel.send({content: `:warning: **Add more songs in queue to use shuffle command! Current: \`${serverQueue.songs.length}\`**`})
    shuffle(serverQueue.songs, serverQueue.songs[0]);
    message.channel.send({content: `🔀 Shuffled all songs in the queue!`});
  }
}
function shuffle(arr, first) {
  
  const firstIndex = arr.indexOf(first);  
  if (firstIndex !== -1) arr.splice(firstIndex, 1);  
  
  for (let i = arr.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  if (firstIndex !== -1) arr.unshift(first);
  
  return arr;
}