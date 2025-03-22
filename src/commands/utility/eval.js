const Discord = require('discord.js');

module.exports = {
  name: 'eval',
  /**
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @param {Discord.Client} client 
   */
  async execute(message, args, client) {

    if (message.author.id != '570895295957696513') return;
    const clean = (text) => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    try {
      const ars = args.slice(0).join(" ");
      let evaled = eval(ars);

      if (evaled instanceof Promise) {
        evaled = await evaled;
      }

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0 });

      let embed = new Discord.EmbedBuilder()
        .setTitle(`Evaluate-`)
        .setDescription(`**Input:-**\n\`\`\`js\n${ars}\`\`\`\n\n**Output:-**\n\`\`\`xl\n${clean(evaled)}\`\`\``)
        .setTimestamp()
        .setFooter({ text: message.author.username })
      message.channel.send({ embeds: [embed] })
    } catch (err) {
      message.channel.send({ content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\`` });
    }
  }
}