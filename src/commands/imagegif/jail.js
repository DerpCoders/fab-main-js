const Discord = require("discord.js");
const Zoro = require("zoro-api");

module.exports = {
  name: "jail",
  description: "jail avatar",
  async execute(message, args) {
    let user = message.mentions.users.last() || message.author;

    let avatar = user.displayAvatarURL({ size: 2048 }).replace(".webp", ".png");

    const msg = await message.channel.send("*Generating ....*");

    let img = await Zoro.jail(avatar);
    if (user.id === "759762948016177195")
      return message.channel.send(
        "Haha LOL, you can't <:PeepoAwesome:774532634779975692> "
      );
    let attachment = new Discord.MessageAttachment(img, "jail.png");
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.member(user).displayName} is in jail :^( sed`)
      .setImage("attachment://jail.png")
      .setColor("RANDOM")
      .attachFiles([attachment])
      .setTimestamp();
    message.channel.send(embed) && msg.delete();
  },
};
