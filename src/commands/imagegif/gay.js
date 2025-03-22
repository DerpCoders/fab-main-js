const Discord = require("discord.js");
const Zoro = require("zoro-api");

module.exports = {
  name: "gay",
  description: "gay avatar",
  async execute(message, args) {
    let useer = message.mentions.users.last() || message.author;

    let avatar = useer
      .displayAvatarURL({ size: 2048 })
      .replace(".webp", ".png");

    const msg = await message.channel.send({content: "*Generating ....*"});

    let img = await Zoro.gay(avatar);
    if (useer.id === "759762948016177195")
      return message.channel.send({content: "xD **NO** I am a bot not || gay ||"});
    let attachment = new Discord.AttachmentBuilder(img, {name:"gay.png"});
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Is ${message.guild.members.cache.get(useer.id).displayName} gay? xD`)
      .setColor('Random')
      .setImage("attachment://gay.png")
      .setTimestamp();
    message.channel.send({embeds: [embed], files: [attachment] }) && msg.delete();
  },
};
