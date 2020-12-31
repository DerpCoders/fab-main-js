 // LEVEL UP ✓
 var profile = await leveling.Fetch(message.author.id)
 const nxtLvl = 145 * (Math.pow(2, profile.level));
 const curxp = profile.xp
 const xpAdd = Math.floor(Math.random() * 19) + 50;
 leveling.AddXp(message.author.id, xpAdd)
 profile.xp = curxp + xpAdd;
 if (profile.xp > nxtLvl) {
     await leveling.AddLevel(message.author.id, 1)
     await leveling.SetXp(message.author.id, 0)
     const lvlChannel = message.guild.channels.cache.find(ch => ch.name === '💎level-up💎')
     const abed = new Discord.MessageEmbed()
         .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
         .setColor('#00FF00')
         .setDescription(`🎉 You just leveled up!!\n🎉 You are now on level ${profile.level + 1}.`);

     lvlChannel.send(abed);

     if (!lvlChannel) return message.channel.send(abed);
 }
 // LEVEL UP ✓

 // LEVEL LEADERBOARD ✓
 if (command === 'levellead') {
     if (message.mentions.users.first()) {

         var output = await leveling.Leaderboard({
             search: message.mentions.users.first().id
         })
         var output2 = await leveling.Fetch(message.mentions.users.first().id)
         message.channel.send(new Discord.MessageEmbed()
             .setTitle(`${message.mentions.users.first().tag}`)
             .setColor('#00FF00')
             .setDescription(`Rank: ${output}\nLevel: ${output2.level}\nXP: ${output2.xp}`))


     } else {

         leveling.Leaderboard({
             limit: 10
         }).then(async users => {

             if (users[0]) var firstplace = await client.users.fetch(users[0].userid)
             if (users[1]) var secondplace = await client.users.fetch(users[1].userid)
             if (users[2]) var thirdplace = await client.users.fetch(users[2].userid)
             if (users[3]) var forthplace = await client.users.fetch(users[3].userid)
             if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)
             if (users[5]) var sixthplace = await client.users.fetch(users[5].userid)
             if (users[6]) var seventhplace = await client.users.fetch(users[6].userid)
             if (users[7]) var eightplace = await client.users.fetch(users[7].userid)
             if (users[8]) var ninthplace = await client.users.fetch(users[8].userid)
             if (users[9]) var tenthplace = await client.users.fetch(users[9].userid)
             message.channel.send(new Discord.MessageEmbed()
                 .setTitle(`:bar_chart: LEVEL LEADERBOARD :bar_chart:`)
                 .setColor('#00FF00')
                 .setDescription(`**1. ${firstplace && firstplace || 'Nobody Yet'}**\nLevel: ${users[0] && users[0].level || 'None'}\nXP: ${users[0] && users[0].xp || 'None'}\n\n**2. ${secondplace && secondplace || 'Nobody Yet'}**\nLevel: ${users[1] && users[1].level || 'None'}\nXP: ${users[1] && users[1].xp || 'None'}\n\n**3. ${thirdplace && thirdplace || 'Nobody Yet'}**\nLevel: ${users[2] && users[2].level || 'None'}\nXP: ${users[2] && users[2].xp || 'None'}\n\n**4. ${forthplace && forthplace || 'Nobody Yet'}**\nLevel: ${users[3] && users[3].level || 'None'}\nXP: ${users[3] && users[3].xp || 'None'}\n\n**5. ${fifthplace && fifthplace || 'Nobody Yet'}**\nLevel: ${users[4] && users[4].level || 'None'}\nXP: ${users[4] && users[4].xp || 'None'}\n\n**6. ${sixthplace && sixthplace || 'Nobody Yet'}**\nLevel: ${users[5] && users[5].level || 'None'}\nXP: ${users[5] && users[5].xp || 'None'}\n\n**7. ${seventhplace && seventhplace || 'Nobody Yet'}**\nLevel: ${users[6] && users[6].level || 'None'}\nXP: ${users[6] && users[6].xp || 'None'}\n\n**8. ${eightplace && eightplace || 'Nobody Yet'}**\nLevel: ${users[7] && users[7].level || 'None'}\nXP: ${users[7] && users[7].xp || 'None'}\n\n**9. ${ninthplace && ninthplace || 'Nobody Yet'}**\nLevel: ${users[8] && users[8].level || 'None'}\nXP: ${users[8] && users[8].xp || 'None'}\n\n**10. ${tenthplace && tenthplace || 'Nobody Yet'}**\nLevel: ${users[9] && users[9].level || 'None'}\nXP: ${users[9] && users[9].xp || 'None'}`))
         })
     }
 }
 // LEVEL LEADERBOARD ✓


 // PROFILE ✓
 else if (message.content === `${prefix}rank`) {
     if (message.mentions.users.first()) {
         var iduser = message.mentions.users.first().id
     }
     else if (!message.mentions.users.first()) {
         var iduser = message.author.id
     }
     const member = message.mentions.members.first() || message.member;
     var levelinfo = await leveling.Fetch(iduser)
     var output = await leveling.Leaderboard({
         search: iduser
     })
     if (levelinfo.level > 0) {
         const rank = new canvacord.Rank()
             .setAvatar(member.user.displayAvatarURL({ format: "png", size: 1024 }))
             .setCurrentXP(levelinfo.xp)
             .setRequiredXP(nxtLvl)
             .setProgressBar(["#00FFDE", "#26FF00", "FFFD00", "#FF2D00"], "GRADIENT")
             .setRank(output)
             .setUsername(member.user.username)
             .setStatus(message.guild.members.cache.get(iduser).presence.status)
             .setDiscriminator(member.user.discriminator, color = "#FFFFFF")
             .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/760049923995074560/766916023755997244/sky_light_by_bisbiswas_de3r7zn-250t.jpg")
             .setLevel(levelinfo.level);

         rank.build()
             .then(data => {
                 const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                 message.channel.send(attachment);
             });
     }
     else {
         message.channel.send(new Discord.MessageEmbed()
             .setTitle(`${member.user.tag}`)
             .setColor('#00ff00')
             .setDescription(`You are Level 0 LOL!! Send some messages and try again.`)
         )
     }
 }
 //client.emit('guildMemberAdd', member);