import { isNullOrUndefined } from "util";

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity("test", {
    type: "WATCHING",
  });
  console.log(client.user.tag);
  client.user.setStatus("dnd");
});

client.on("messageReactionAdd", async (messageReaction, user) => {
  if (messageReaction.emoji.name === "eyes") {
    user.send("Reacted with :eyes:");
  }
});
client.on("message", async (message) => {
  if (message.content.toLowerCase() === "!ping") {
    var ping = Date.now() - message.createdTimestamp + "ms";
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(`🏓 Your ping is - ${ping}`);
    message.channel.send(embed);
  }
});
client.login(null);
