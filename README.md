<img src="https://cdn.discordapp.com/avatars/759762948016177195/5965807787c17574f114d83c9f23defd.webp?size=2048" width="512" height="512" alt="Fab pfp">

# A general Discord.js Bot
A general Discord.js bot with some moderation and fun commands. Hey Fab, I'mma kill you#0640 

## Configuration
Your bot's token and prefix will be in config.json.


## Getting Started 

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
```

## Join our server || Invite Fab in your server!
[Join our support server](https://discord.gg/J73GfuFxNq)
[Invite Fab](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=8&scope=bot)
## Checkout other repositories!

[Discord Rich presence](https://github.com/mkgaming54/Discord-RPC)!
