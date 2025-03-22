const ytsearch = require('yt-search')

module.exports = {
  name: "yt",
  async execute(message, args) {
    try {
      const q = args.slice(0).join(" ");
      if (!q) return message.channel.send({content: "What do you want to search?\n Type - `yt <search>` to search on YouTube."});
      const r = await ytsearch(q);
      message.channel.send({content: r.videos[0].url});
    } catch (eror) {
      return message.channel.send(
        `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
      );
    }
  },
};
