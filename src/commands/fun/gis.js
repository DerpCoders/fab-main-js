const { google } = require('googleapis');
const customSearch = google.customsearch('v1');
const Discord = require('discord.js')

module.exports = {
  name: "gis",
  /**
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @returns 
   */
  async execute(message, args) {
    try {
      let query = args.slice(0).join(" ");
      if (!query) return message.channel.send({content:':warning: Invalid Arguments\n**Expected:** `gis <query>`'});
      let msg = await message.channel.send('*Searching...*');
      const res = await customSearch.cse.list({
        auth: process.env.googleapi,
        cx: process.env.cx,
        searchType: 'image',
        q: query,
        num: 10
      });
      const randomNumber = Math.floor(Math.random() * 10);
      if (!res.data.items) return message.channel.send({ content: `**❌ 0 results found!** (For query -\`${query}\`})` });
      message.channel.send(res.data.items[randomNumber].link) && msg.delete();
    } catch (eror) {
      return message.channel.send({
        content: `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
      });
    }
  }
}