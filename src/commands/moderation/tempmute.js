const Discord = require('discord.js');
const ms = require('ms');
const moment = require('moment');
const mongoose = require('mongoose');
const muteSchema = require('../../../database/models/mute-schema.js');

module.exports = {
    name: 'tempmute', async execute(message, args, client) {
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) return message.channel.send({ content: '❌ **You are missing `MANAGE_ROLES` permissions!**' });
        let muteMember = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
        if (!muteMember) return message.channel.send({ content: '⚠️ **Invalid arguments:**\nExample usage - `tempmute @user time`' });
        if (muteMember.user.id === message.author.id) return message.channel.send({ content: 'You can\'t mute yourself??' });
        if (muteMember.roles.highest.position > message.member.roles.highest.position) return message.channel.send({ content: "❌ **That member is higher than you in role hierarchy!**" });
        if (muteMember.user.id === client.user.id) return message.channel.send({ content: 'You can\'t mute me :p' })
        let muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        let time = args[1];
        if (!time) return message.channel.send({ content: '⚠️ **Invalid arguments:**\nExample usage - `tempmute @user time`' });

        const mutes = await muteSchema.find({
            userID: muteMember.user.id,
            guildID: message.guild.id,
        });

        const currently = mutes.filter(mute => {
            return mute.current === true
        });

        if (currently.length) {
            return message.channel.send({ content: `${muteMember.user.username} is already muted!` });
        }
        let duration = ms(time);
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + duration);

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                name: 'Muted',
                hoist: false,
                color: '818386',
                permissions: [Discord.PermissionsBitField.Flags.ViewChannel]
            });

            message.guild.channels.cache.forEach(async (channel) => {
                await channel.permissionOverwrites.edit(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false
                });
            });
            muteMember.roles.add(muteRole);
            let embed = new Discord.EmbedBuilder()
                .setTitle(`Mute - ${muteMember.user.username}`)
                .addFields(
                    { name: 'Mute-', value: `${muteMember.user.username}`, inline: false },
                    { name: 'Moderator-', value: `${message.author.username}`, inline: false },
                    { name: 'Duration-', value: `${muteMember.user.username} will be unmuted in ${time}`, inline: false }
                )
                .setColor('Red')
                .setTimestamp()
            message.channel.send({ embeds: [embed] });
        } else {

            muteMember.roles.add(muteRole);
            let embed = new Discord.EmbedBuilder()
                .setTitle(`Mute - ${muteMember.user.username}`)
                .addFields(
                    { name: 'Mute-', value: `${muteMember.user.username}`, inline: false },
                    { name: 'Moderator-', value: `${message.author.username}`, inline: false },
                    { name: 'Duration-', value: `${muteMember.user.username} will be unmuted in ${time}`, inline: false }
                )
                .setColor('Red')
                .setTimestamp()
            message.channel.send({ embeds: [embed] });
        }
        await new muteSchema({
            userID: muteMember.user.id,
            userName: muteMember.user.tag,
            moderatorID: message.author.id,
            modName: message.author.tag,
            guildID: message.guild.id,
            expires,
            current: true
        }).save();

    }
}