const ms = require('ms');
const Discord = require('discord.js');
const mongoose = require("mongoose");
const remindSchema = require('../../../database/models/remindSchema');

module.exports = { name: 'reminder', async execute(message, args, client){
let data = await remindSchema.findOne({
    guildID: message.guild.id,
});
if(data) return message.channel.send({content: `A reminder is already set for this server by **${data.author}** with message **${data.message}**`});
if(!args[0]) return message.channel.send({content: '⚠ **Invalid arguments**\nExample usage - `reminder <time> <message>`'});
let reason = args.slice(1).join(" ") || 'No message provided';
let time = args[0];
let channel = message.channel
let msTime = ms(time);
const next = new Date();
next.setMilliseconds(next.getMilliseconds() + msTime);

let newData = new remindSchema({
    guildID: message.guild.id,
    author: message.author.tag,
    message: reason,
    nextRemind: next,
    channelID: channel.id
});
await newData.save() && message.channel.send({content: `Reminder set, you will be reminded after every ${time}`});
 }
}