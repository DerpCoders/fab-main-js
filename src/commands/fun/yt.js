const Discord = require("discord.js");
const yts = require("yt-search");

module.exports = {
  name: "yt",
  async execute(message, args) {
    try {
      const q = args.slice(0).join(" ");
      if (!q) return message.channel.send("What do you want to search?\n Type - `yt <search>` to search on YouTube.");
      const r = await yts(q);
      const yt = "https://www.youtube.com/watch?v=";
      const videos = r.videos.slice(0, 1);
      videos.forEach(function (v) {
        message.channel.send(`${yt + v.videoId}`);
      });
    } catch (eror) {
      return message.channel.send(
        `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`Hey Fab, I'mma kill you#0640\``
      );
    }
  },
};
