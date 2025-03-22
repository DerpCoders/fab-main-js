const Discord = require("discord.js");
const Zoro = require("zoro-api");

module.exports = {
  name: "triggered",
  async execute(message, args) {
    let useer = message.mentions.users.last() || message.author;

    let avatar = useer
      .displayAvatarURL({ dynamic: true })
      .replace(".webp", ".png");

    const msg = await message.channel.send({content: "*Generating ....*"});

    let img = await Zoro.triggered(avatar);
    if (useer.id === "759762948016177195") return message.channel.send({content: "No"});
    let attachment = new Discord.AttachmentBuilder(img, {name:"triggered.gif"});
    const embed = new Discord.EmbedBuilder()
      .setTitle(`${message.guild.members.cache.get(useer.id).displayName} triggered`)
      .setColor('Random')
      .setImage("attachment://triggered.gif")
      .setTimestamp();
    message.channel.send({embeds: [embed], files: [attachment]}) && msg.delete();
  },
};
