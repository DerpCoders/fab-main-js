const Discord = require('discord.js')
const gis = require('g-i-s');

module.exports = {
    name: 'gis',
    execute(message, args){
      try{
        const qu = args.slice(0).join(" ");
        if(!qu) return message.channel.send('What do you want to search? Type - `\`gis <search>` to search on google images.')
        gis(qu, logResults);

        function logResults(error, results) {  
          if (error) return; 
          else{  
            message.channel.send((results[10].url));
          }
       }
          } catch (eror){
            return message.channel.send(`❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact Radioactive#6270`);
        }
    }
}

