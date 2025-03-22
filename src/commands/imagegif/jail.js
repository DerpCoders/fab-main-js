const Discord = require("discord.js");
const Zoro = require("zoro-api");

module.exports = {
  name: "jail",
  description: "jail avatar",
  async execute(message, args) {
    let user = message.mentions.users.last() || message.author;

    let avatar = user.displayAvatarURL({ size: 2048 }).replace(".webp", ".png");

    const msg = await message.channel.send({content: "*Generating ....*"});

    let img = await Zoro.jail(avatar);
    if (user.id === "759762948016177195")
      return message.channel.send(
        "Haha LOL, you can't <:PeepoAwesome:774532634779975692> "
      );
    let attachment = new Discord.AttachmentBuilder(img, {name:"jail.png"});
    const embed = new Discord.EmbedBuilder()
      .setTitle(`${message.guild.members.cache.get(user.id).displayName} is in jail :^( sed`)
      .setImage("attachment://jail.png")
      .setColor('Random')
      .setTimestamp();
    message.channel.send({embeds: [embed], files:[attachment] }) && msg.delete();
  },
};
