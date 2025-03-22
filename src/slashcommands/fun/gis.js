const { google } = require('googleapis');
const customSearch = google.customsearch('v1');
const Discord = require('discord.js');
require('dotenv').config()

module.exports = {
    name: "gis",
    /**
     * @param {Discord.ChatInputCommandInteraction} interaction
     * @returns 
     */
    async execute(interaction) {
        try {
            let query = interaction.options.getString('query')
            let msg = await interaction.followUp({ content: '*Searching...*' });
            const res = await customSearch.cse.list({
                auth: process.env.googleapi,
                cx: process.env.cx,
                searchType: 'image',
                q: query.toString(),
                num: 10
            });
            const randomNumber = Math.floor(Math.random() * 10);
            if (!res.data.items) return await msg.edit({ content: `**❌ 0 results found!** (For query -\`${query}\`})` });
            msg.edit({ content: res.data.items[randomNumber].link });
        } catch (eror) {
            return await interaction.followUp({
                content: `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
            });
        }
    }
}