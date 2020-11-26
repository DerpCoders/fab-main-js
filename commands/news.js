const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: 'news',
    description: 'news',
    execute(message, args){
            const embed = new Discord.MessageEmbed()
                got('https://www.reddit.com/r/news/random/.json?obey_over18=false').then(response => {
                    let content = JSON.parse(response.body);
                    let permalink = content[0].data.children[0].data.permalink;
                    let memeUrl = `https://reddit.com${permalink}`;
                    let memeImage = content[0].data.children[0].data.url;
                    let memeTitle = content[0].data.children[0].data.title;
                    let memeUpvotes = content[0].data.children[0].data.ups;
                    let memeNumComments = content[0].data.children[0].data.num_comments;
                    embed.setDescription(`${memeTitle}`);
                    embed.setTitle(`😱 BREAKING News`)
                    embed.setThumbnail('https://static9.depositphotos.com/1011646/1236/i/600/depositphotos_12369509-stock-photo-breaking-news-screen.jpg')
                    embed.setURL(`${memeUrl}`)
                    embed.setDescription('Click the title if you didn\'t see the picture!')
                    embed.setColor('RANDOM')
                    embed.setImage(memeImage);
                    embed.setTimestamp();
                    embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}` | `news by reddit`, 'https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png');
                    message.channel.send(embed)
              })
            }
    }
