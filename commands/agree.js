const Discord = require('discord.js');

module.exports = {
    name: 'agree',
    description: 'agree',
    execute(message, args){
        message.channel.send('Type "agree" here to gain access to this server');
        message.delete({timeout: 2000});
    }
}