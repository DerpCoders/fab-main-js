const mongoose = require('mongoose');
const cooldown = new Set();
const Guild = require('../../../database/models/guild')
const config = require('../../../config/config.json')
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
module.exports = { name: 'setprefix', async execute(message, args) {
    const pt = args.join(" ")
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You can't change my prefix! You are missing \`ADMINISTRATOR\` permissions!`);
if(cooldown.has(message.author.id)) return message.channel.send('❌ **You can change my prefix every 2 minutes! Please wait.**');
const settings = await Guild.findOne({
    guildID: message.guild.id,
}, (err, guild) => {
    if(err) console.log(err);
    if(!guild){
        const newGuild = new Guild({
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: config.prefix
        })
        newGuild.save();
        return message.channel.send('Please re-type this command as this server was not in our database!');
    }
});

if(!pt) return message.channel.send(`Please specify a **prefix** to set! Current prefix for this server is \`${settings.prefix}\``);
if(pt.length > 5) return message.channel.send('What?? Don\'t provide prefix that is longer than 5 characters! xd')

await settings.updateOne({
    moderator: message.author.tag,
    prefix: pt,
    date: dd+'-'+mm+'-'+yyyy
})
message.guild.me.setNickname(`[${pt}] Fab`);
message.channel.send(`✅ Prefix for **${message.guild.name}** set to \`${pt}\`!`);
    cooldown.add(message.author.id);
    setTimeout(() => {
cooldown.delete(message.author.id);
}, 120000);

    }
}
