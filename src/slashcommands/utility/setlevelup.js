const mongoose = require('mongoose');
const levelSchema = require('../../../database/models/levelSchema');
const Discord = require('discord.js');

module.exports = {
    name: 'setlevelup',
    /**
     * @param {Discord.ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction) {
        const chann = interaction.options.getChannel('channel')
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) return await interaction.followUp({ content: '❌ **You are missing `MANAGE_GUILD` permission!**' });
        const settings = await levelSchema.findOne({
            guildID: interaction.guild.id,
        })
        if (!settings) {
            const newData = new levelSchema({
                guildID: interaction.guild.id,
                guildName: interaction.guild.name,
                disabled: false,
                levelupChannelID: chann.id
            })
            newData.save();
            return await interaction.followUp({ content: `✅ **Level up channel set to** ${chann}!` });
        } else {
            if (settings.disabled) return await interaction.followUp({content: ':warning: Leveling system is disabled in this server!', flags: Discord.MessageFlags.Ephemeral })
            await settings.updateOne({
                levelupChannelID: chann.id
            })
            await interaction.followUp({ content: `✅ **Level up channel set to** ${chann}!` });
        }
    }
}