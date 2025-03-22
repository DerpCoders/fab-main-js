const Discord = require('discord.js')

module.exports = {
    name: "clear",
    /**
     * @param {Discord.ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return interaction.followUp({ content: "❌ **You don't have the permission to delete messages.**", flags: Discord.MessageFlags.Ephemeral })
            .then((sentmsg) => {
                setTimeout(() => {
                    sentmsg.delete();
                }, 5000)
            });
        var number = interaction.options.getInteger('amount');
        interaction.channel.messages.fetch({ limit: number+1 }).then(async (messages) => {
            await interaction.channel.bulkDelete(messages.filter(m => m.type !== 20))
        });
        const sentmsg = await interaction.followUp({ content: `**✅ ${number} message(s) deleted**` });
        setTimeout(() => {
            sentmsg.delete();
        }, 4000);
    }
}