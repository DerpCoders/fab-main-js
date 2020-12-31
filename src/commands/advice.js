const Discord = require('discord.js');
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = { name: 'advice', async execute(message, args) {
    let data = await random.getAdvice()
    message.channel.send(data)
}
}
