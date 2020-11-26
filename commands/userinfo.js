const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'userinfo',
    execute(message, args){
       if( message.channel.type === 'text'){
            const userinf = message.mentions.members.first() || message.member
                 const play = message.guild.member(userinf).presence.activities;
                 if(play.toString()  === ''){
                     const infoaEmbed = new Discord.MessageEmbed()
                     .setColor("RANDOM")
                     .setAuthor(`${userinf.user.tag}`, userinf.user.displayAvatarURL({dynamic: true}))
                     .setThumbnail(userinf.user.displayAvatarURL({size: 2048, dynamic: true}))
                     .addField('**🆔 ID**', `${userinf.id}`, true)
                     .addField('**🖋 Nickname**', `${message.guild.member(userinf).displayName}`, true)
                     .addField('**🖊 Real name on Discord**', `${userinf.user.tag}`, true)
                     .addField('**🙄 Status**', `${message.guild.member(userinf).presence.status}`, true)
                     .addField('**🏃‍♀️ Playing**', `N/A`, true)
                     .addField('**🖋 Mention**', `<@${userinf.id}>`, true)
                     .addField('**📅 Created at**', `${userinf.user.createdAt}`, true)
                     .addField('**🟢 Roles**', `${userinf.roles.cache.size - 1}`, true)
                     .addField('**📅 Joined at**', `${message.guild.member(userinf).joinedAt}`, true)
                     .setTimestamp()
                     .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
                     message.channel.send(infoaEmbed);
                 
             }else{
                 const infoEmbed = new Discord.MessageEmbed()
                 .setColor("RANDOM")
                 .setAuthor(`${userinf.user.tag}`, userinf.user.displayAvatarURL({dynamic: true}))
                 .setThumbnail(userinf.user.displayAvatarURL({size: 2048, dynamic: true}))
                 .addField('**🆔 ID**', `${userinf.id}`, true)
                 .addField('**🖊 Nickname**', `${message.guild.member(userinf).displayName}`, true)
                 .addField('**🖋 Real name on Discord**', `${userinf.user.tag}`, true)
                 .addField('**🙄 Status**', `${message.guild.member(userinf).presence.status}`, true)
                 .addField('**🏃‍♀️ Playing**', `${play}`, true)
                 .addField('**🖋 Mention**', `<@${userinf.id}>`, true)
                 .addField('**📅 Created at**', `${userinf.user.createdAt}`, true) 
                 .addField('**🟢 Roles**', `${userinf.roles.cache.size - 1}`, true)
                 .addField('**📅 Joined at**', `${message.guild.member(userinf).joinedAt}`, true)
                 .setTimestamp()
                 .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}));
                 message.channel.send(infoEmbed);
                
             }
         
    }
}
}
