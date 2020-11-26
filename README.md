# A general Discord.js Bot
A general Discord.js bot created by Hey Fab, I'mma kill you#0001.

# Configuration
Your bot's token and prefix will be in config.json.

## Setup

1. Step 1: Download this code on your PC.
2. Step 2: After downloading open your terminal and type `npm i` before running bot `node .` or `node index.js`.
3. Step 3: Go to `config.json` and add your bot's token and prefix.
4. Step 4: Type `node .` in terminal. Done! :D Enjoy and you can edit your code as you want.

## Example discord.js code setup

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
