const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
const { mem, cpu, os } = require("node-os-utils");

module.exports = {
    name: 'stats',
    /** 
     * @param {Discord.ChatInputCommandInteraction} interaction
     * @param {Discord.Client} client
     */
    async execute(interaction, client) {
        const simpleGit = require('simple-git');
        let data = await simpleGit().log({ maxCount: 1 });
        const dura = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const { stripIndent } = require("common-tags");
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const clientStats = stripIndent`
                             Servers   :: ${client.guilds.cache.size}
                             Users     :: ${client.users.cache.size}
                             Channels  :: ${interaction.client.channels.cache.size}
                             WS Ping   :: ${Math.round(interaction.client.ws.ping)}ms
                             Uptime    :: ${dura}
            `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const duration = moment
            .duration(os.uptime())
            .format(" D [days], H [hrs], m [mins], s [secs]");
        const serverStats = stripIndent`
                             OS        :: ${await os.oos()}
                             CPU       :: ${cpu.model()}
                             Cores     :: ${cpu.count()}
                             CPU Usage :: ${await cpu.usage()} %
                             RAM       :: ${totalMemMb} MB
                             RAM Usage :: ${usedMemMb} MB
                             Uptime    :: ${duration}
                             
            `;
        const duration2 = moment
            .duration(client.uptime)
            .format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.EmbedBuilder()
            .setTitle(`${client.user.tag} statistics`)
            .addFields(
                { name: "**⬆ Uptime**", value: `${duration2}`, inline: true },
                {
                    name: "💻 **Memory Usage**",
                    value: `${Math.round(used * 100) / 100} MB`,
                    inline: true,
                },
                {
                    name: "**🧾 Library**",
                    value: `[discord.js](https://discord.js.org/)`,
                    inline: true,
                },
                {
                    name: '🛠 Version',
                    value: `[${data.latest.hash.slice(0, 7)}](https://github.com/DerpCoders/Fab/commit/${data.latest.hash})`,
                    inline: true
                },
                {
                    name: "**🔗 Source Code**",
                    value: "[Github.com](https://github.com/DerpCoders/fab-main-js)",
                    inline: true,
                },
                {
                    name: "**📆 Created at**",
                    value: `**${client.user.tag
                        }** was created on **9/27/2020, 1:06:42 AM**`,
                    inline: true,
                },
                {
                    name: "**🎉 Top.gg**",
                    value: `[View here](https://top.gg/bot/759762948016177195)`,
                    inline: true,
                },
                {
                    name: "**👨 Client**",
                    value: `\`\`\`asciidoc\n${clientStats}\`\`\``,
                    inline: false,
                },
                {
                    name: "**⚙ Server**",
                    value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
                    inline: true,
                }
            )
            .setColor("26fc98")
            .setFooter({ text: "2020-2025 papaemeritus.4" })

        setTimeout(async () => {
            await interaction.followUp({ embeds: [embed] });
        }, 3569);
    }
}