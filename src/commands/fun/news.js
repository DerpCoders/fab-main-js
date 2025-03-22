const Discord = require("discord.js");
const axios = require('axios')

module.exports = {
  name: "news",
  description: "news",
  async execute(message, args) {
    const url = 'https://newsapi.org/v2/top-headlines';
    const apikey = process.env.newsapikey;
    try {
      const response = await axios.get(url, {
        params: {
          apiKey: apikey,
          pageSize: 3,
          country: 'us'
        },
      });
      const articles = response.data.articles;
      const embed = new Discord.EmbedBuilder()
        .setTitle('📰 Latest News')
        .setColor('#007bff')
        .setFooter({text:'Powered by NewsAPI', iconURL:'https://newsapi.org/images/n-logo-border.png'});

      articles.forEach((article, index) => {
        embed.addFields({
          name: `**${index + 1}. ${article.title}**`,
          value: `${article.description || 'No description available.'}\n[Read More](${article.url})`,
          inline: false
      });
      });
      message.channel.send({embeds: [embed]})
    } catch (err) {
      return (
        message.channel.send(
          `❌ **There was an error while running this command** \`\`\`${err}\`\`\` \n Please contact \`papaemeritus.4\``
        ) && console.log(err)
      );
    }
  }
}