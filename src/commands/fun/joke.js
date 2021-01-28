const Discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: "joke",
  async execute(message, args) {
    let data = await random.getJoke();
    message.channel.send(data);
  },
};
