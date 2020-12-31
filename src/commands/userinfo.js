const Discord = require('discord.js');
const emojis = require('../utils/emojis.json');

module.exports = {
    name: 'userinfo',
    description: 'userinfo',
    async execute(message, args){
       try{
        const flags = {
            DISCORD_EMPLOYEE: `${emojis.discord_employee} \`Discord Employee\``,
            DISCORD_PARTNER: `${emojis.discord_partner} \`Partnered Server Owner\``,
            BUGHUNTER_LEVEL_1: `${emojis.bughunter_level_1} \`Bug Hunter (Level 1)\``,
            BUGHUNTER_LEVEL_2: `${emojis.bughunter_level_2} \`Bug Hunter (Level 2)\``,
            HYPESQUAD_EVENTS: `${emojis.hypesquad_events} \`HypeSquad Events\``,
            HOUSE_BRAVERY: `${emojis.house_bravery} \`House of Bravery\``,
            HOUSE_BRILLIANCE: `${emojis.house_brilliance} \`House of Brilliance\``,
            HOUSE_BALANCE: `${emojis.house_balance} \`House of Balance\``,
            EARLY_SUPPORTER: `${emojis.early_supporter} \`Early Supporter\``,
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: `${emojis.verified_bot} \`Verified Bot\``,
            VERIFIED_DEVELOPER: `${emojis.verified_developer} \`Early Verified Bot Developer\``
          };
          let customStatus;
          const userinf = message.mentions.members.first() || message.member
          const userFlags = (await userinf.user.fetchFlags()).toArray();
          const permMember = message.mentions.members.first() || message.member;
          let perms = permMember.permissions.toArray()
          var fi = perms.join(`\n`);

                 const play = message.guild.member(userinf).presence.activities;
                 if(play.toString()  === ''){
                     const infoaEmbed = new Discord.MessageEmbed()
                     .setColor("RANDOM")
                     .setAuthor(`${userinf.user.tag}`, userinf.user.displayAvatarURL({dynamic: true}))
                     .setThumbnail(userinf.user.displayAvatarURL({size: 2048, dynamic: true}))
                     .addField('**🆔 ID-**', `${userinf.id}`, true)
                     .addField('**🖋 Nickname-**', `${message.guild.member(userinf).displayName}`, true)
                     .addField('**🖊 Username-**', `${userinf.user.tag}`, true)
                     .addField('**🙄 Status-**', `${message.guild.member(userinf).presence.status}`, true)
                     .addField('**🏃‍♀️ Playing-**', `N/A`, true)
                     .addField('**🖋 Mention-**', `<@${userinf.id}>`, true)
                     .addField('**📅 Created at-**', `${userinf.user.createdAt}`, true)
                     .addField('**🟢 Roles-**', `${userinf.roles.cache.size - 1}`, true)
                     .addField('**📅 Joined at-**', `${message.guild.member(userinf).joinedAt}`, true)
                     .addField('**⚙ Permissions-**', `\`\`\`${fi}\`\`\``, true)
                     .setTimestamp()
                     .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
                     if (customStatus) infoaEmbed.addField('Custom Status', customStatus);
                     if (userFlags.length > 0) infoaEmbed.addField('Badges', userFlags.map(flag => flags[flag]).join('\n'));
                     message.channel.send(infoaEmbed);
                 
             }else{
                 const infoEmbed = new Discord.MessageEmbed()
                 .setColor("RANDOM")
                 .setAuthor(`${userinf.user.tag}`, userinf.user.displayAvatarURL({dynamic: true}))
                 .setThumbnail(userinf.user.displayAvatarURL({size: 2048, dynamic: true}))
                 .addField('**🆔 ID**', `${userinf.id}`, true)
                 .addField('**🖊 Nickname-**', `${message.guild.member(userinf).displayName}`, true)
                 .addField('**🖋 Username-**', `${userinf.user.tag}`, true)
                 .addField('**🙄 Status-**', `${message.guild.member(userinf).presence.status}`, true)
                 .addField('**🏃‍♀️ Playing-**', `${play}`, true)
                 .addField('**🖋 Mention-**', `<@${userinf.id}>`, true)
                 .addField('**📅 Created at-**', `${userinf.user.createdAt}`, true) 
                 .addField('**🟢 Roles-**', `${userinf.roles.cache.size - 1}`, true)
                 .addField('**📅 Joined at-**', `${message.guild.member(userinf).joinedAt}`, true)
                 .addField('**⚙ Permissions-**', `\`\`\`${fi}\`\`\``, true)
                 .setTimestamp()
                 .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
                 if (customStatus) infoEmbed.addField('Custom Status', customStatus);
                 if (userFlags.length > 0) infoEmbed.addField('Badges', userFlags.map(flag => flags[flag]).join('\n'));
                 message.channel.send(infoEmbed);
                
             }
         
    } catch (eror){
        return message.channel.send(`❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact Fab was taken#0001`) && console.log(eror);
    }
}
}
