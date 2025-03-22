const Discord = require("discord.js");
const Zoro = require("zoro-api");

module.exports = {
  name: "blur",
  description: "blurs avatar",
  async execute(message, args) {
    let user = message.mentions.users.last() || message.author;

    let avatar = user.displayAvatarURL({ size: 2048 }).replace(".webp", ".png");

    const msg = await message.channel.send({content: "*Generating ....*"});

    let img = await Zoro.blur(avatar);

    let attachment = new Discord.AttachmentBuilder(img, {name:"blur.png"});
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Blurred ${message.guild.members.cache.get(user.id).displayName}'s avatar!`)
      .setColor('Random')
      .setImage("attachment://blur.png")
      .setTimestamp();
    message.channel.send({embeds: [embed], files: [attachment] }) && msg.delete();
    if (user.id === "759762948016177195") {
      message.channel.send({content: "Uhh oh, I can't see anything...."});
    }
  },
};
