const Discord = require("discord.js");
const Zoro = require("zoro-api");

module.exports = {
  name: "triggered",
  async execute(message, args) {
    let useer = message.mentions.users.last() || message.author;

    let avatar = useer
      .displayAvatarURL({ dynamic: true })
      .replace(".webp", ".png");

    const msg = await message.channel.send("*Generating ....*");

    let img = await Zoro.triggered(avatar);
    if (useer.id === "759762948016177195") return message.channel.send("No");
    let attachment = new Discord.MessageAttachment(img, "triggered.gif");
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.member(useer).displayName} triggered`)
      .setColor("RANDOM")
      .attachFiles([attachment])
      .setImage("attachment://triggered.gif")
      .setTimestamp();
    message.channel.send(embed) && msg.delete();
  },
};
