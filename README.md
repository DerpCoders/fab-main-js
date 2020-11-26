# A general Discord.js Bot
A general Discord.js bot created by Hey Fab, I'mma kill you#0001.

# Configuration and setup
Your bot's token and prefix will be in config.json.
NOTE: BEFORE RUNNING BOT type `npm i` on your terminal after downloading code.

# Example discord.js code setup

```js
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if(message.content.toLowerCase() === 'ping'){
       message.reply('Pong!') // Test command
    }
})

client.login('your-token-goes-here');
