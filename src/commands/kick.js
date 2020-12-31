const Discord = require('discord.js');
const kCooldown = new Set();

module.exports = {
    name: 'kick',
    description: 'kick',
    execute(message, args){
      try{
   if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("❌**You dont have permissions to kick members! LUL**");
          let toKick =message.mentions.members.first();
          let reaso = args.slice(1).join(" ");
          let usertutty = message.mentions.members.first();
          let guildname = message.guild.name
          if(!args[0]) return message.channel.send("Wasting my time bruh, can't you mention someone?");
          if(!toKick) return message.channel.send(`${args[0]} is not a member `);
          if(!reaso) return message.channel.send('```Required argument <reason> is missing!\n                   ^^\n For example - `kick @Fab reason```\n Don\'t kick me :^)');

          if(toKick.user.id === '759762948016177195') return message.channel.send('Hmmm, It seems like you don\'t like me :(');
          
          if(!toKick.kickable) return message.channel.send('❌ I can\'t kick ;(, that member is **Moderator/Admin** (Higher than me in role hierarchy)')

          if(toKick.kickable){
            let tise = new Discord.MessageEmbed()
            .setTitle(`✅ **Successfully kicked** ${usertutty}`)
            .addField('Member kicked', toKick)
            .addField('Kicked by', message.author)
            .addField('Reason', reaso)
            .setThumbnail('https://media.tenor.com/images/e4b140b4735bc82fdfc3021ea3200914/tenor.gif')
            .addField('Date', message.createdAt)
            .setColor('#ff0307');

            message.channel.send(tise);
            usertutty.send(`You were kicked from **${guildname}** by moderator **${message.author.username}**\nReason - **${reaso}**`).catch(() =>  message.channel.send(`DM to ${toKick.user.username} wasn't sent! Because they have DMs turned off!`));
           
            toKick.kick();
        }
      } catch (eror){
        return message.channel.send(`❌ **Maybe I don't have enough permissions to do that!** \`\`\`${eror}\`\`\` \n Please contact Fab was taken#0001`);
      }
        }
    }
