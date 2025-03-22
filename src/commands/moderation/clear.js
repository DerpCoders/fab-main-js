const { set } = require("mongoose");
const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: "clear", async execute(message, args) {
    let msgs = 0;
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("❌ **You don't have the permission to delete messages.**")
      .then((sentmsg) => {
        setTimeout(() => {
          sentmsg.delete()
        }, 5000)
      });
    message.delete();
    if (!args[0])
      return message.channel
        .send({ content: "❌**Please mention the no. of msgs you want to clear.**" })
        .then((sentmsg) => {
          setTimeout(() => {
            sentmsg.delete()
          }, 5000)
        });
    var number = args[0];
    var numbers = parseInt(number);
    if (isNaN(numbers)) return message.channel.send({ content: '⚠️ Invalid Arguments\nExpected: `clear <int>`' })
    if (numbers > 99) {
      for (let index = 0; index <= 3; index++) {
        await message.channel.messages.fetch()
          .then(async messages => {
            await message.channel.bulkDelete(messages);
            let messagesDeleted = messages.array().length;
            msgs = msgs + messagesDeleted;
            message.channel.send({ content: `**✅ ${msgs} message(s) deleted**` }).then(sentmsg => {
              setTimeout(() => {
                sentmsg.delete();
              }, 5000)
            })
          });
      }
    } else {
      message.channel.messages.fetch({ limit: numbers }).then((messages) => {
        message.channel.bulkDelete(messages).then(() => {
          message.channel.send({ content: `**✅ ${numbers} message(s) deleted**` }).then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 5000)
          });
        });
      });
    }
  }
}