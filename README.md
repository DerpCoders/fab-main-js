
<h1 align="center">
  <br>
  <a href="https://github.com/DerpCoders/fab-main-js"><img src="https://cdn.discordapp.com/avatars/759762948016177195/a_9141f03e513064ac585b59300075ad5e.png?size=128" alt="Fab - Discord Bot"></a>
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
     <img src="https://img.shields.io/badge/discord-js-blue.svg" alt="discord.js">
  </a>
</p>

# Overview

Fab is a multipurpose discord bot coded in JavaScript with
[discord.js](https://discord.js.org/). With over 50 commands.
A fully modular bot – meaning all features and commands can be enabled/disabled to your
liking, making it completely customizable. This is a *self-hosted bot* – meaning you will need
to host and maintain your own instance. You can turn Fab into an admin bot, music bot, fun bot,
new best friend or all of these together! 

**Note: This bot is still under development and commands and features are still being added.**

## Important message
**Fab is currently running on an outdated version of discord.js (v13),
You can join our [support server](https://discord.gg/AzarZsbkvC) for any issues, errors or bugs.**


## Configuration
Your bot's token and prefix will be loaded from config.json.

## Getting Started 

1. Step 1: Download this code on your PC.
2. Step 2: After downloading, open your terminal and type `npm install` to install all the required dependencies before running the bot.
3. Step 3: Go to `config.json` and add your bot's token and prefix.
4. Step 4: Run `node index.js` in terminal. All Done! :D Enjoy and you can edit your code as you want.

## Example discord.js code setup

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json')

client.on('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', message => {
    if(message.content === prefix + 'ping'){
       message.reply({content: 'Pong!'}) // Test command
    }
})

client.login(token);
```

## Join our server || Invite Fab in your server!
[Join our support server](https://discord.com/invite/AzarZsbkvC)
[Invite Fab](https://discord.com/api/oauth2/authorize?client_id=759762948016177195&permissions=8&scope=bot)
## Checkout other repositories!

[Discord Rich presence](https://github.com/mkgaming54/Discord-RPC)!
