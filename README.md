<img width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="Fab" src="https://images-ext-1.discordapp.net/external/vwJ8WT1u5oEJcx2LoO9w3-bruNq8LXIh51QUmTBe6Hk/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/759762948016177195/a_9141f03e513064ac585b59300075ad5e.gif">  

# Fab
[![Discord](https://cdn.discordapp.com/avatars/759762948016177195/a_9141f03e513064ac585b59300075ad5e.png?size=128)[https://discord.gg/AzarZsbkvC]

Fab is a multipurpose discord bot coded in JavaScript with
[discord.js](https://discord.js.org/) using the. With over
50 commands. This bot is still under development and commands and features are still being added.

## Important message
**This repository will not be updated from now onwards, sry tho ;)
You can join our server for any issues, errors or bugs.**


# A general Discord.js Bot
A general Discord.js bot with moderation and fun commands.
Library - [Discord.js](https://discord.js.org)

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
