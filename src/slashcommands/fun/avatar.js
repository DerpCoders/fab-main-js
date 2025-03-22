const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  /** 
   * @param {Discord.ChatInputCommandInteraction} interaction 
   * @param {Discord.Client} client 
   * @returns 
   */
  async execute(interaction) {
    try {
      let user = interaction.options.getUser('user');
      if (!user) user = interaction.user;
      const avatarEmbed = new Discord.EmbedBuilder()
        .setColor("#29e47d")
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL({ size: 4096, extension: user.displayAvatarURL()?.startsWith("a_") ? "gif" : "png" })
        })
        .setDescription("**Avatar**")
        .setTimestamp()
        .setImage(user.displayAvatarURL({ size: 4096, extension: user.displayAvatarURL()?.startsWith("a_") ? "gif" : "png" }));
      await interaction.followUp({ embeds: [avatarEmbed] });

    } catch (err) {
      return await interaction.followUp({ content: `❌ **Could not find that user!**` }) && console.error(err);
    }
  }
}