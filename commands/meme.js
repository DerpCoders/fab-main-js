const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: 'meme',
    description: 'random meme',
    execute(message, args) {
        const embed = new Discord.MessageEmbed();
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`);
            embed.setURL(`${memeUrl}`)
            embed.setDescription('Click the title if you didn\'t see the picture!')
            embed.setColor('RANDOM')
            embed.setImage(memeImage);
            embed.setTimestamp()
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments} | memes by reddit`, 'https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png');
            message.channel.send(embed)
        }).catch(console.error);
    }
}