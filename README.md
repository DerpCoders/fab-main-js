
<h1 align="center">
  <br>
  <a href="https://github.com/DerpCoders/Fab"><img src="https://cdn.discordapp.com/avatars/759762948016177195/a_9141f03e513064ac585b59300075ad5e.png?size=128" alt="Fab - Discord Bot"></a>
  <br>
  Fab
  <br>
</h1>

<h4 align="center">Music, Moderation, Leveling, Fun and much more.</h4>
<p align="center">
  <a href="https://discord.com/invite/AzarZsbkvC">
    <img src="https://discordapp.com/api/guilds/729340392327217193/widget.png?style=shield" alt="Discord Server">
  </a>
  <a href="https://discord.js.org/">
     <img src="https://avatars.githubusercontent.com/u/26492485?s=200&v=4" alt="discord.js">
  </a>
</p>
# Fab
[![Discord](https://cdn.discordapp.com/icons/729340392327217193/30232e21b6efa0e86b0b107b56f0af71.webp?size=128)](https://discord.gg/AzarZsbkvC)

Fab is a multipurpose discord bot coded in JavaScript with
[discord.js](https://discord.js.org/). With over
50 commands. This bot is still under development and commands and features are still being added.

## Important message
**Fab is currently running on an outdated version of discord.js (v13),
You can join our [support server](https://discord.gg/AzarZsbkvC) for any issues, errors or bugs.**


# A general Discord.js Bot
A general Discord.js bot with moderation and fun commands.
Library - [Discord.js](https://discord.js.org)

## Configuration
Your bot's token and prefix will be loaded from config.json.

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
