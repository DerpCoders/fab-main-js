const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = { name: 'anime', async execute(message, args) {
    let data = await random.getNeko()
    message.channel.send(data)
}
}