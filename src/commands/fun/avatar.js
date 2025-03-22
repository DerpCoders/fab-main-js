const Discord = require('discord.js');
module.exports = { name: 'avatar', execute(message, args, client){
try{
    let user;
      
 if(message.mentions.users.last()) {
        user = message.mentions.users.last();
      }
       else if(args[0]){
         user = client.users.cache.get(args[0]);
      }
     
      else {
        user = message.author;
      }
      const avatarEmbed = new Discord.EmbedBuilder()
        .setColor("#29e47d")
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL({ size: 256, dynamic: true })
})
        .setDescription("**Avatar**")
        .setTimestamp()
        .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }));
      message.channel.send({embeds: [avatarEmbed]});

        } catch (err) {
            return message.channel.send({content: `❌ **Could not find that user!**`}) && console.log(err);
        }
    }
    }