const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    /**
     * @param {Discord.ChatInputCommandInteraction} interaction
     * @param {Discord.Client} client
     */
    async execute(interaction, client) {
        await interaction.reply({content: 'Pinging...', withResponse: true });
        const sent = await interaction.fetchReply();
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = client.ws.ping;
        await interaction.editReply(`Latency: ${latency}ms\nWebSocket ping: ${apiLatency}ms`);
    }
}