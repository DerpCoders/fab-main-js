const mongoose = require('mongoose');
const Discord = require('discord.js');
const ecoSchema = require('../../../database/models/ecoSchema');

module.exports = {
    name: 'profile', async execute(message, args, client) {
        try {
            let eUser;
            if (message.mentions.members.last()) {
                eUser = message.mentions.members.last();
            } else if (args[0]) {
                eUser = message.guild.members.cache.get(args[0]);
            }
            else {
                eUser = message.member;
            }
            let Schemadata = await ecoSchema.findOne({
                userID: eUser.user.id,
            });
            if (!Schemadata) return message.channel.send({content: eUser.displayName + ' don\'t have a profile, use `setprofile` command to save your profile'});
            let vehiclesFormatted = ''
            if (!Schemadata.vehicles) vehiclesFormatted = 'None';
            else {
                for (var i = 0; i < Schemadata.vehicles.length; i++) {
                    vehiclesFormatted += `**${i + 1})** - ${Schemadata.vehicles[i].vName}\n`;
                }
            }
            if (eUser.user.id !== message.author.id) {
                let embed = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle(`Profile - ${Schemadata.nickname}`)
                    .addFields(
                        { name: 'Nickname-', value: `${Schemadata.nickname}`, inline: false },
                        { name: 'Age-', value: `${Schemadata.age}`, inline: false },
                        { name: 'fcoins-', value: `${Schemadata.fcoins}`, inline: false },
                        { name: 'Vehicles-', value: `${vehiclesFormatted}`, inline: false },
                        { name: 'Items-', value: `${Schemadata.items || 0}\n Use \`inventory\` command for items list`, inline: true },
                    )
                    .setThumbnail(eUser.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                message.channel.send({embeds: [embed]});
            } else {
                let embed = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle(`Profile - ${Schemadata.nickname}`)
                    .addFields(
                        { name: 'Nickname-', value: `${Schemadata.nickname}`, inline: false },
                        { name: 'Age-', value: `${Schemadata.age}`, inline: false },
                        { name: 'Gender-', value: `||${Schemadata.gender}||`, inline: false },
                        { name: 'fcoins-', value: `${Schemadata.fcoins}`, inline: false },
                        { name: 'Wife-', value: `||${Schemadata.wife || 'No one :('}||`, inline: false },
                        { name: 'Vehicles-', value: `${vehiclesFormatted}`, inline: false },
                        { name: 'Items-', value: `${Schemadata.items || 0}\n Use \`inventory\` command for items list`, inline: true },
                        { name: 'Job-', value: `${Schemadata.job || 'No job :c'}` }
                    )
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                message.channel.send({embeds: [embed]});
            }
        } catch (err) {
            console.log(err);
            return message.channel.send({content: '❌ **Mentioned user was not found!**'});
        }
    }
}