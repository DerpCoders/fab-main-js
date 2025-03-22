const Discord = require('discord.js');
const mongoose = require('mongoose');
const countSchema = require('../../../database/models/countSchema');

module.exports = {
    name: 'createstats', async execute(message, args, client) {
        try {
            if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: '❌ **You are missing `ADMINISTRATOR` permissions!**' });
            if (!message.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: '❌ **I don\'t have `ADMINISTRATOR`** :(' });
            let ID = args.slice(0).join(" ");
            if (!ID) return message.channel.send({ content: '⚠️ **Invalid arguments: <category>**\nExample usage - `createstats <ID>`' })
            let category = message.guild.channels.cache.get(ID);
            if (!category) return message.channel.send({ content: '❌ **Could not find that category!**' })
            if (category.type !== Discord.ChannelType.GuildCategory) return message.channel.send({ content: '⚠ Please provide a valid category **ID**!' });

            let data = await countSchema.findOne({
                guildID: message.guild.id
            });

            if (data) return message.channel.send({ content: 'Server stats is already enabled!' });

            message.guild.channels.create(`Member count- ${message.guild.memberCount}`, { type: Discord.ChannelType.GuildVoice }).then(channel => {
                channel.setParent(category.id);
            });
            message.guild.channels.create(`User count- ${message.guild.members.cache.filter(m => !m.user.bot).size}`, { type: Discord.ChannelType.GuildVoice }).then(channel => {
                channel.setParent(category.id);
            });
            message.guild.channels.create(`Emoji count- ${message.guild.emojis.cache.size}`, { type: Discord.ChannelType.GuildVoice }).then(channel => {
                channel.setParent(category.id);
            });
            message.guild.channels.create(`Category count- ${message.guild.channels.cache.filter(ch => ch.type === Discord.ChannelType.GuildCategory).size}`, { type: Discord.ChannelType.GuildVoice }).then(channel => {
                channel.setParent(category.id);
            });
            message.guild.channels.create(`Channel count- ${message.guild.channels.cache.size}`, { type: Discord.ChannelType.GuildVoice }).then(channel => {
                channel.setParent(category.id);
            });
            message.guild.channels.create(`Bot count- ${message.guild.members.cache.filter(m => m.user.bot).size}`, { type: Discord.ChannelType.GuildVoice }).then(channel => {
                channel.setParent(category.id);
            });
            message.guild.channels.create(`Role count- ${message.guild.roles.cache.size}`, { type: Discord.ChannelType.GuildVoice }).then(channel => {
                channel.setParent(category.id);
            });
            let newData = new countSchema({
                guildID: message.guild.id,
                moderatorID: message.author.id,
                categoryID: ID
            });
            await newData.save();

            message.channel.send({ content: `✅ Server stats enabled in category - **${category.name}**` });
        } catch (err) {
            console.log(err);
            return message.channel.send(
                `❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
            );
        }
    }
}