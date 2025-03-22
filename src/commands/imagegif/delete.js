const Discord = require('discord.js');

module.exports = {
    name: 'delete', async execute(message, args) {
        try {
            const delUser = message.mentions.users.last() || message.author;
            var avatar = delUser.displayAvatarURL({ dynamic: false, format: "png" })
            var Image = await new DIG.Delete().getImage(avatar);
            var attachment = new Discord.AttachmentBuilder(Image, {name:"delete.png"});
            const Embed = new Discord.EmbedBuilder()
                .setImage("attachment://delete.png")
                .setTitle(`${delUser.username} was deleted permanently! RIP`)
                .setColor("Red")
                .setTimestamp()
                .setFooter({text: delUser.username});
                if(delUser.id === '759762948016177195') return message.channel.send({content: 'Haha, you can\'t delete me'});
            message.channel.send({embeds: [Embed], files: [attachment]});

        } catch (err) {
            return message.channel.send({content: `❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``}) && console.log(`Error while running command - ${this.name}\n${err}`);
        }
    }
}