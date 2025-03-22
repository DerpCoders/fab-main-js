const Discord = require("discord.js");

module.exports = {
  name: "ban",
  /**
   * 
   * @param {Discord.ChatInputCommandInteraction} interaction 
   * @returns 
   */
  async execute(interaction) {
    try {
      if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers))
        return await interaction.followUp(
          "❌**You dont have permissions to ban members!**"
        );
      let toBann = interaction.options.getUser('user');
      let guildname = interaction.guild.name;
      if (!toBann) return message.channel.send({ content: `⚠ **Invalid member**` });
      if (toBann.id === interaction.member.user.id)
        return await interaction.followUp(
          "Why do you want to ban yourself? Leave the server, simple as that!"
        );
      let toBan = interaction.guild.members.cache.get(toBann.id);
      if (interaction.member.user.id !== interaction.guild.ownerId) {
        if (toBan.roles.highest.position > interaction.member.roles.highest.position) {
          return await interaction.followUp({ content: "❌ **That member is higher than you in role hierarchy!**" });
        }
      }
      let reas = interaction.options.getString('reason');
      if (!reas) reas = 'No reason given.'

      if (toBan.user.id === "759762948016177195")
        return await interaction.followUp({ content: "Hmmm, It seems like you don't like me :(" });
      if (!toBan.bannable)
        return await interaction.followUp(
          "❌ I can't ban ;(, that member is **Moderator/Admin** (Higher than me in role hierarchy)"
        );
        const reactionFilter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && (interaction.member.user.id === user.id)
        const confirmMsg = await interaction.followUp(`Do you really want to ban **${toBan.user.username}** for **${reas}**?\nReact to proceed`);
        await confirmMsg.react('✅');
        await confirmMsg.react('❌');

        const collector = confirmMsg.createReactionCollector({ reactionFilter, time: 15000, max: 1});
        collector.on('collect', async reaction => {
          if (reaction.emoji.name === '✅') {
            let tis = new Discord.EmbedBuilder()
              .setTitle(`✅ **Successfully banned** ${toBan.user.username}`)
              .addFields(
                {name: "Member banned-", value: toBan.user.username, inline: true },
                {name: 'Banned by-', value: interaction.member.user.username, inline: true},
                {name: 'Reason-', value: reas, inline: true},
                {name: 'Date-', value: interaction.createdAt.toString(), inline: true}
              )
              .setThumbnail(
                "https://media1.tenor.com/images/ae83976e867ebc2722054a632ff045ad/tenor.gif"
              )
              .setColor("#ff0307");

            await interaction.channel.send({ embeds: [tis] });
            toBan.send({content: `You were banned from **${guildname}** by **${interaction.member.user.username}**\nReason - **${reas}**`})
              .catch((err) =>
                console.error(err)
              );
            toBan.ban({ reason: reas });
          } else if (reaction.emoji.name === '❌') {
            return confirmMsg.edit({ content: '❌ **Canceled**' });
          }
          collector.stop();
        });
        collector.on('end', (_, reason) => {
          if (reason === 'time') {
            confirmMsg.edit({content: '⏰ Ban confirmation timed out.'});
          }
        });
      
    } catch (eror) {
      interaction.followUp({
        content: `❌ **There was an error while running this command!** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
      });
      console.error(eror);
      return;
    }
  }
}