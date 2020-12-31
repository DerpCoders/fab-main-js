const Discord = require('discord.js');

module.exports = {
    name: 'bcount',
    description: 'bcount', 
    execute(message, args){
        if (message.channel.type == 'text'){
        message.guild.fetchBans()
  .then(banned => {
    let list = banned.map(user => user.tag).join('\n');

    // Make sure if the list is too long to fit in one message, you cut it off appropriately.
    if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

    message.channel.send(`**${banned.size} users are banned**\n${list}`);   
  })
  .catch(error => {
    if(error) return message.channel.send('bruh there was a fat error' + error)
})
  
    }
}
}