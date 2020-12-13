const Discord = require('discord.js');
const yts = require('yt-search');

module.exports = {
    name: 'yt',
  async execute(message, args){
        const q = args.slice(0).join(" ");
        const r = await yts(q)
        const yt = 'https://www.youtube.com/watch?v=';
        const videos = r.videos.slice( 0, 1 )
        videos.forEach( function ( v ) {
            const views = String( v.views ).padStart( 10, ' ' )
            message.channel.send(`${yt+v.videoId}`);

        } )
    }
}