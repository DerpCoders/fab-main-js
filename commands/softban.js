const Discord = require('discord.js');
const ban = require('./ban');

module.exports = {
    name: 'softban',
    description: 'softban',
    execute(message, args){
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('❌**You don\'t have permissions!**');

const banuser = message.guild.member(message.mentions.users.first());

const banRole = message.guild.roles.cache.find(r => r.name === 'Banned')

if(!banuser) return message.channel.send("I can't find that member!");
//if(banuser.member.roles.has(banRole)) return message.channel.send('**That member is already banned!**');

//All roles will be removed
banuser.roles.set([])
  .then(member => console.log(`Member roles is now of ${member.roles.cache.size} size`))

if(!banRole) return message.guild.roles.create({
    data: {
        name: "Banned",
        color: "GREY",
        permissions: ['READ_MESSAGE_HISTORY']
    }
}).then(role => {
    message.mentions.members.first().roles.add(role)
})

banuser.roles.add(banRole);
message.channel.send('**✅ Member banned softly! LOL**');

}
}