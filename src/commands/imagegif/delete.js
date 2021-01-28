const Discord = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
    name: 'delete', async execute(message, args) {
        try {
            const delUser = message.mentions.users.last() || message.author;
            var avatar = delUser.displayAvatarURL({ dynamic: false, format: "png" })
            var Image = await new DIG.Delete().getImage(avatar);
            var attachment = new Discord.MessageAttachment(Image, "delete.png");
            const Embed = new Discord.MessageEmbed()
                .setImage("attachment://delete.png")
                .attachFiles([attachment])
                .setTitle(`${delUser.username} was deleted permanently! RIP`)
                .setColor("RED")
                .setTimestamp()
                .setFooter(delUser.username);
                if(delUser.id === '759762948016177195') return message.channel.send('Haha, you can\'t delete me');
            message.channel.send(Embed);

        } catch (err) {
            return message.channel.send(`❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``) && console.log(`Error while running command - ${this.name}\n${err}`);
        }
    }
}