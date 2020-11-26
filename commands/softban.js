const Discord = require('discord.js');

module.exports = {
    name: 'softban',
    description: 'softban',
    execute(message, args){
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('❌**You don\'t have permissions!**');

const banuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

const banRole = message.guild.roles.cache.find(r => r.name === 'Banned')

if(!banuser) return message.channel.send("I can't find that member!");
//if(banuser.member.roles.has(banRole)) return message.channel.send('**That member is already banned!**');

//All roles will be removed
banuser.roles.set([])
  .then(member => console.log(`Member roles is now of ${member.roles.cache.size} size`))
  .catch(console.error);


if(!banRole) return guild.roles.create({
    data: {
        name: "Banned",
        color: "BLUE",
        permissions: []
    }
}).then(role => {
    message.mentions.members.first().roles.add(role).catch(error => {message.channel.send("Couldn't add the role."); console.error(error)});
}).catch(error => {message.channel.send("An error occured, logs were sent to the developer."); console.error(error)});

banuser.roles.add(banRole);
message.channel.send('Banning........').then(sentmsg => {
    sentmsg.delete({timeout: 3000});
});
message.channel.startTyping();
setTimeout(() => {
    message.channel.stopTyping();
    message.channel.send('**✅ Member banned softly! LOL**');
}, 3000);
if(error) throw error;{
    message.channel.send('Something went wrong.. or I don\'t have permissions!')
}
}
}