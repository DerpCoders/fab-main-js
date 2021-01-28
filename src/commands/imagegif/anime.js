const random = require("something-random-on-discord");

module.exports = {
  name: "anime",
  async execute(message, args) {
    const rand = new random.Random();
    const data = await rand.getNeko();
    if(message.guild.id === '770618755301507072') return;
    message.channel.send(data);
  },
};
