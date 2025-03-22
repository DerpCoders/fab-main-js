const Discord = require("discord.js");
const emojis = require('../../utils/emojis.json');
const moment = require('moment');

module.exports = {
  name: "userinfo",
  description: "userinfo",
  /**
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @returns 
   */
  async execute(message, args) {
    try {
      const flags = {
        Staff: `${emojis.discord_employee} \`Discord Employee\``,
        Partner: `${emojis.discord_partner} \`Partnered Server Owner\``,
        BugHunterLevel1: `${emojis.bughunter_level_1} \`Bug Hunter (Level 1)\``,
        BugHunterLevel2: `${emojis.bughunter_level_2} \`Bug Hunter (Level 2)\``,
        Hypesquad: `${emojis.hypesquad_events} \`HypeSquad Events\``,
        HypeSquadOnlineHouse1: `${emojis.house_bravery} \`House of Bravery\``,
        HypeSquadOnlineHouse2: `${emojis.house_brilliance} \`House of Brilliance\``,
        HypeSquadOnlineHouse3: `${emojis.house_balance} \`House of Balance\``,
        EARLY_SUPPORTER: `${emojis.early_supporter} \`Early Supporter\``,
        TEAM_USER: "Team User",
        SYSTEM: "System",
        VerifiedBot: `${emojis.verified_bot} \`Verified Bot\``,
        VerifiedDeveloper: `${emojis.verified_developer} \`Early Verified Bot Developer\``,
        ActiveDeveloper: `${emojis.active_developer} \`Active Developer\`` 
      };
      
      let userinf;
      if(message.mentions.members.last()){
        userinf = message.mentions.members.last();
      }else if(args[0]){
        userinf = message.guild.members.cache.get(args[0]);
      }else {
        userinf = message.member;
      }
      const userFlags = (await userinf.user.fetch()).flags.toArray();
      let globalname=userinf.user.globalName;
      let play;
      let status;
      if (!message.guild.members.cache.get(userinf.user.id).presence) {
        status = 'offline'
        play = 'None';
      } else {
        status = message.guild.members.cache.get(userinf.user.id).presence.status;
      }
      if (message.guild.members.cache.get(userinf.user.id).presence){
        if (message.guild.members.cache.get(userinf.user.id).presence.activities.length == 0){
          play = 'None';
        } else {
          play = message.guild.members.cache.get(userinf.user.id).presence.activities[0].name
        }
      }
        const infoaEmbed = new Discord.EmbedBuilder()
          .setColor(userinf.displayHexColor || "Random")
          .setAuthor({
            name: `User - ${globalname}`,
            iconURL: userinf.user.displayAvatarURL()
      })
          .setThumbnail(
            userinf.user.displayAvatarURL({ size: 2048, dynamic: true })
          )
          .addFields(
                      {name:'**🆔 ID**', value: `${userinf.user.id}`, inline: true},
                      {name:"**🖊 Nickname-**", value: `${userinf.displayName}`, inline: true},
                      {name: "**🖋 Username-**", value:`${userinf.user.username}`, inline: true},
                      {name: "**🌐 Global Name-**", value: `${globalname}`,inline: true},
                      {name: "**🙄 Status-**", value: `${status}`, inline: true},
                      {name: "**🏃‍♀️ Playing-**", value: `${play}`, inline: true },
                      {name: "**🖋 Mention-**", value: `<@${userinf.user.id}>`, inline: true},
                      {name: "**📅 Created at-**", value: `${userinf.user.createdAt.toLocaleDateString('en-US')}\n(${moment(userinf.user.createdAt).fromNow()})`, inline: true},
                      {name: "**🟢 Roles-**", value: `${userinf.roles.cache.size - 1}`, inline: true},
                      {name: "**📅 Joined at-**", value: `${userinf.joinedAt}`, inline: true}
                    )
          .setTimestamp()
          .setFooter({
            text: `Requested by ${message.author.username}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
      });
        
        if (userFlags.length > 0)
          infoaEmbed.addFields({
            name: "Badges",
            value: userFlags.map((flag) => flags[flag]).join("\n")
      });
        message.channel.send({embeds: [infoaEmbed]});
    } catch (eror) {
      return (
        message.channel.send(
          `❌ **There was an error while running this command** \`\`\`${eror}\`\`\` \n Please contact \`papaemeritus.4\``
        ) && console.log(eror)
      );
    }
  },
};
