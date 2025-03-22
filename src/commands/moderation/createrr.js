const { MessageCollector } = require("discord.js");

let messageFilter = (newMsg, originalMsg) => {
  if(newMsg.author.id !== originalMsg.author.id) return false;
  let { cache } = originalMsg.guild.emojis;
  let [ emojiName, roleName ] = originalMsg.content.split(/,\s+/);
  if(!emojiName && !roleName) return false;
  let emoji = cache.find(e => e.name.toLowerCase() === emojiName.toLowerCase());
  if(!emoji){
      originalMsg.channel.send({content: '⚠️ **Emoji does not exist!**'});
      return false;
  }
  let role = originalMsg.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());
  if(!role){
      originalMsg.channel.send({content: '⚠️ **Role does not exist!**'});
      return false;
  }
  return true;
}
module.exports = {
    name: 'createrr', async execute(message, args) {
  
        try {
            if (args.length !== 1) return message.channel.send({content: '❌ **Invalid arguments!**'});
            else {
                let fetchMsg = await message.channel.messages.fetch({message: args[0]}); 
                if(fetchMsg){
                    await message.reply(`Noice, now enter all emoji names and role names!\nExample usage - \`red_circle, StreamerRole\``);
                    let collector = new MessageCollector(message.channel, messageFilter.bind(null, message));
                    collector.on('collect', msg => {
                        console.log(`${msg} was collected!`);
                    });
                }
            }
        } catch (err) {
            console.log(err);
            message.channel.send({content: '⚠ **Message not found!**'});
        }
    }
}