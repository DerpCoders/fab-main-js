const Discord = require("discord.js");


module.exports = {
  name: "google",
  execute(message, args) {
    const ques = args.slice(0).join(" ");
    const google = "https://google.com/search?q=";
    if (!ques)
      return message.channel.send(
        "What do you want to search? Type - ``google <search>` to search anything."
      );
    const res = encodeURI(google + ques);
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Google search - ${ques}`)
      .setDescription(`**Search:** ${ques}\n**Results:** ${res}`)
      .setColor("#22f2f2")
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png"
      );
    message.channel.send({embeds: [embed]});
  },
};
