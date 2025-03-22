const mongoose = require('mongoose');
const Discord = require('discord.js');
const afkS = require('../../../database/models/afkSchema');

module.exports = {
    name: 'afk', 
    /**
     * @param {Discord.Message} message 
     * @param {string[]} args 
     * @param {Discord.Client} client 
     * @param {Array} afkSets
     * @returns 
     */
    async execute(message, args, client, afkSets) {
        let reas = args.slice(0).join(" ");
        if (!reas) reas = 'AFK';
        const data = await afkS.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        });
        if (data) return;
        else {
            message.delete();
            message.guild.members.cache.get(message.author.id).setNickname(`[AFK] ${message.guild.members.cache.get(message.author.id).displayName}`);
            message.channel.send({content: `*${message.member.displayName}*, you have been set to AFK with reason - ${reas}!`}).then((sentmsg)=>{
                setTimeout(()=>{
                    sentmsg.delete();
                },8000);
            });
            let newData = new afkS({
                userID: message.author.id,
                guildID: message.guild.id,
                reason: reas,
                time: new Date()
            });
            newData.save();
            afkSets.push(newData)
        }
    }
}