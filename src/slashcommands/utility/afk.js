const mongoose = require('mongoose');
const Discord = require('discord.js');
const afkS = require('../../../database/models/afkSchema');

module.exports = {
    name: 'afk',
    /**
     * @param {Discord.ChatInputCommandInteraction} interaction 
     * @param {Array} afkSets
     * @returns 
     */
    async execute(interaction, afkSets) {
        let reas = interaction.options.getString('reason')
        if (!reas) reas = 'AFK';
        const data = await afkS.findOne({
            userID: interaction.user.id,
            guildID: interaction.guild.id
        });
        if (data) return;
        else {
            try {
                interaction.guild.members.cache.get(interaction.user.id).setNickname(`[AFK] ${interaction.guild.members.cache.get(interaction.user.id).displayName}`);
                await interaction.followUp({ content: `*${interaction.member.displayName}*, you have been set to AFK with reason - ${reas}!` }).then((sentmsg) => {
                    setTimeout(() => {
                        sentmsg.delete();
                    }, 8000);
                });
                let newData = new afkS({
                    userID: interaction.user.id,
                    guildID: interaction.guild.id,
                    reason: reas,
                    time: new Date()
                });
                newData.save();
                afkSets.push(newData);
            } catch (err) {
                console.error(err);
            }
        }
    }
}