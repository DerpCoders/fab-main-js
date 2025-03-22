const { EmbedBuilder } = require('discord.js');
const randomColor = Math.floor(Math.random() * 16777215).toString(16); 
module.exports = {
    name: 'discrim', execute(message, args, client) {
try{
        let discrim = args[0];
        if(!discrim) discrim = message.author.discriminator;
        if(discrim.length !== 4) return message.channel.send({content: `Bruh, discriminator is of 4 digits`});
        let matches = [];

        let users = client.users.cache.array();

        for (let user of users) {
            if (user.discriminator === discrim) {
                matches.push(user.username + "#" + discrim);
            }
        }
        if (matches.length === 0) {
            message.channel.send({content: "No matches found."});
        } else {
            let final = "```" + matches.join("\n") + "```";
            const embed = new EmbedBuilder()
                .setTitle(`Discriminator - ${discrim}`)
                .setDescription(final)
                .setColor(`Red`)
                .setTimestamp()
            message.channel.send({embeds: [embed]});
        }
    }catch (err){
        return message.channel.send({content: `❌ **Could not find that user!**`}) && console.log(err);
    }
}
}