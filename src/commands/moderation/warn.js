const cooldown = new Set();
const { PermissionsBitField } = require('discord.js')
module.exports = {
    name: "warn", async execute(message, args) {
        try {
            if(cooldown.has(message.author.id)){
                return message.channel.send({content: '**🚫 You can warn a member every 5 minutes!**'});
            }
            const punishments = require('../../../database/models/ModSchema')
            let WarnUser;
            if(message.mentions.members.last()){
                WarnUser = message.mentions.members.last();
              }else if(args[0]){
                WarnUser = message.guild.members.cache.get(args[0]);
              }else {
                return message.channel.send({content: `Wasting my time bruh, can't you mention someone?`});
              }
             if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.channel.send({content: '❌ **You are missing `MANAGE_MESSAGES` permission!**'});
            if(WarnUser.id === message.author.id) return message.channel.send({content: 'Why do you want to warn yourself? huh'});
            if(WarnUser.user.bot) return message.channel.send({content: 'You can\'t warn bots! lol'});
            if(message.author.id !== message.guild.ownerID){
                if (WarnUser.roles.highest.position > message.member.roles.highest.position){
                   return message.channel.send({content: '❌ **That member is higher than you in role hierarchy!**'}) 
                }
            }
           
            let reason = args.slice(1).join(" ")
            if (!reason) reason = "No reason given."
            
            
            let data = await punishments.findOne({
                GuildID: message.guild.id,
                UserID: WarnUser.id
            });

            if (data) {
                data.Punishments.unshift({
                    PunishType: 'Warn',
                    Moderator: message.author.id,
                    Reason: reason,
                    Date: new Date
                });
                data.save();
            } else if (!data) {
                let newData = new punishments({
                    GuildID: message.guild.id,
                    UserID: WarnUser.id,
                    Punishments: [{
                        PunishType: 'Warn',
                        Moderator: message.author.id,
                        Reason: reason,
                        Date: new Date
                    }]
                })
                newData.save();
            }
            let nikal;
            if(data) nikal = data.Punishments.length;
            else nikal = '1';
            let num = getNumberWithOrdinal(nikal);
            message.channel.send({content: `✅ Warned **${WarnUser.displayName}** with Reason: **${reason}**\nThis is their **${num}** warning!`}) && cooldown.add(message.author.id);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 300000);
            WarnUser.send({content: `You were warned in **${message.guild.name}** for **${reason}** \nBy moderator - **${message.author.username}**`}).catch((err) => {
                return( 
                  message.channel.send({content: `**${WarnUser.displayName} have DMs turned off!**`}) &&
                  console.log(err)
                );
              });

        } catch (err) {
            return console.log(err);
        }
    }
}
function getNumberWithOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  
