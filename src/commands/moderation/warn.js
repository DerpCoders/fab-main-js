const cooldown = new Set();
module.exports = {
    name: "warn", async execute(message, args) {
        try {
            if(cooldown.has(message.author.id)){
                return message.channel.send('**🚫 You can warn a member every 5 minutes only!**');
            }
            const punishments = require('../../../database/models/ModSchema')
            let WarnUser = message.mentions.members.last();
             if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('❌ **You are missing `MANAGE_MESSAGES` permission!**');
             if(!args[0]) return message.channel.send(`Wasting my time bruh, can't you mention someone?`);
            if(WarnUser.id === message.author.id) return message.channel.send('Why do you want to warn yourself? huh');
            if(WarnUser.user.bot) return message.channel.send('You can\'t warn bots! lol');
            if(WarnUser.roles.highest.position > message.member.roles.highest.position) return message.channel.send('❌ **That member is higher than you in role hierarchy!**') 
           
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
                });
                data.save();
            } else if (!data) {
                let newData = new punishments({
                    GuildID: message.guild.id,
                    UserID: WarnUser.id,
                    Punishments: [{
                        PunishType: 'Warn',
                        Moderator: message.author.id,
                        Reason: reason
                    }]
                })
                newData.save();
            }
            message.channel.send(`✅ Warned **${WarnUser.displayName}** with Reason: **${reason}**`) && cooldown.add(message.author.id);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 300000);
            WarnUser.send(`You were warned in **${message.guild.name}** for **${reason}** \nBy moderator - **${message.author.username}**`).catch((err) => {
                return( 
                  message.channel.send(`**${WarnUser.displayName} have DMs turned off!**`) &&
                  console.log(err)
                );
              });

        } catch (err) {
            return console.log(`Error while running ${this.name} command\n${err}`)
        }
    }
}
