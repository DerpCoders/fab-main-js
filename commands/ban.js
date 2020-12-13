const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban',
    execute(message, args){
   if (message.channel.type === 'text'){
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("❌**You dont have permissions to ban members! LUL**");
  let toBan =message.mentions.members.first();
  let reas = args.slice(1).join(" ");
  let usertut = message.mentions.members.first();
  let guildname = message.guild.name
  if(!args[0]) return message.channel.send("Wasting my time bruh, can't you mention someone?");
  if(!toBan) return message.channel.send(`${args[0]} is not a member `);
  if(!reas) return message.channel.send('```Required argument <reason> is missing!\n                   ^^\n For example - `ban @Fab reason```\n Don\'t ban me :^)');

  if(toBan.user.id === '759762948016177195') return message.channel.send('Hmmm, It seems like you don\'t like me :(');
  if(!toBan.bannable) return message.channel.send('Respect the person you want to ban, that member is mod/admin. ❌You cant ban that member❌')
  

  if(toBan.bannable){
    let tis = new Discord.MessageEmbed()
    .setTitle('**Ban Report**')
    .addField('Member banned', toBan)
    .addField('Banned by', message.author)
    .addField('Reason', reas)
    .setThumbnail('https://media1.tenor.com/images/ae83976e867ebc2722054a632ff045ad/tenor.gif')
    .addField('Date', message.createdAt)
    .setColor('#ff0307');

    message.channel.send(`✅ **Successfully banned** ${usertut}`);
    message.channel.send(tis);
    usertut.send(`You were banned from **${guildname}** by **${message.author.username}**\nReason - **${reas}**`);
    toBan.ban();
  }
}
}
}
