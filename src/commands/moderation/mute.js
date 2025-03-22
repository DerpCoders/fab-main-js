const Discord = require('discord.js');

module.exports = {
    name: 'mute', async execute(message, args, client) {
        try {
            if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) return message.channel.send({content: '❌ **You are missing `MANAGE_ROLES` permissions!**'});
            let target = message.mentions.users.last() || message.guild.members.cache.get(args[0]).user;
            if(!target) return message.channel.send({content: '⚠️ **Invalid arguments:**\nExample usage - `mute @user <reason>'})
            if (target.id === client.user.id) return message.channel.send({content: 'You cant mute me :P'});
            if(target.id === message.author.id) return message.channel.send({content: 'You can\'t mute yourself! huh'});
            if(message.guild.members.cache.get(target.id).roles.highest.position > message.member.roles.highest.position) return message.channel.send("❌ **That member is higher than you in role hierarchy!**");
            let reason = args.slice(1).join(" ");
            if(!reason) reason = 'No reason given';
            const moderator = message.author;
            let mrole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
            if (!mrole) {
                mrole = await message.guild.roles.create({
                        name: 'Muted',
                        hoist: false,
                        color: '818386',
                        permissions: [Discord.PermissionsBitField.Flags.ViewChannel],
                });

                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.edit(mrole.id, {
                        SEND_MESSAGES: false,
                        CONNECT: false,
                        ADD_REACTIONS: false
                    });
                });
                message.guild.members.cache.get(target.id).roles.add(mrole);
                let embe = new Discord.EmbedBuilder()
                    .setTitle(`Muted - ${target.username}`)
                    .addFields(
                        { name: 'Mute-', value: `${target.username}`, inline: false },
                        { name: 'Moderator-', value: `${moderator.username}`, inline: false },
                        { name: 'Duration-', value: `♾ You will have to unmute them manually`, inline: false },
                        { name: 'Reason-', value: `${reason}`, inline: false }
                    )
                    .setColor('Red')
                    .setTimestamp()
                message.channel.send({embeds: [embe]});
            } else {
                if(message.guild.members.cache.get(target.id).roles.cache.has(mrole)) return message.channel.send('⚠ **That member is already muted!**');
                message.guild.members.cache.get(target.id).roles.add(mrole);
                let embed = new Discord.EmbedBuilder()
                    .setTitle(`Mute - ${target.username}`)
                    .addFields(
                        { name: 'Mute-', value: `${target.username}`, inline: false },
                        { name: 'Moderator-', value: `${moderator.username}`, inline: false },
                        { name: 'Duration-', value: `♾ You will have to unmute them manually`, inline: false },
                        { name: 'Reason-', value: `${reason}`, inline: false }
                    )
                    .setColor('Red')
                    .setTimestamp()
                message.channel.send({embeds: [embed]});
            }

        } catch (err) {
            return message.channel.send({content: `❌ **Could not find that user!**`}) && console.log(err);
        }
    }
}