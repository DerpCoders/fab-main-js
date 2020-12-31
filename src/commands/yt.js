const Discord = require('discord.js');
const yts = require('yt-search');

module.exports = {
    name: 'yt',
  async execute(message, args){
      try{
        const q = args.slice(0).join(" ");
        if(!q) return message.channel.send('Usage: `yt <query>');
        const r = await yts(q)
        const yt = 'https://www.youtube.com/watch?v=';
        const videos = r.videos.slice( 0, 1 )
        videos.forEach( function ( v ) {
            const views = String( v.views ).padStart( 10, ' ' )
            message.channel.send(`${yt+v.videoId}`);
        } )
    }catch (eror){
        return message.channel.send(`❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact Fab was taken#0001`);
    }
} 
}