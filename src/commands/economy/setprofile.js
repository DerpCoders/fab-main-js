const mongoose = require('mongoose');
const Discord = require('discord.js');
const ecoSchema = require('../../../database/models/ecoSchema');

module.exports = {
    name: 'setprofile', async execute(message, args, client) {
        let data = await ecoSchema.findOne({
            userID: message.author.id,
        });
        if (data) return message.reply('your profile is already saved, if you want to delete or edit your profile, use `editprofile` and `deleteprofile` commands!');
        let filter = (m) => m.author.id === message.author.id;
        const questions = [
            'what should everyone call you? nickname -',
            'what is your age?',
            'your gender? (i wont tell anyone)'
        ]
        let index = 0;
        let collector = new Discord.MessageCollector(message.channel, filter, { max: 3, time: 120000 });
        message.reply(questions[index++]);
        collector.on('collect', msg => {
            if (index < questions.length) {
                msg.channel.send({content: questions[index++]});
            }
        });
        collector.on('end', async collected => {
            let genders = ['male', 'female', 'other'];
            let msgArray = collected.array();
            if (collected.size < 3) return message.channel.send({content: `${message.author} better luck next time dude, you didnt provide required information :c`});
            else if(parseInt(msgArray[1].content) > 100) return message.channel.send({content: '⚠ **Invalid age provided**, choose a number between 1 - 100'});
            else if(!genders.includes(collected.last().content.toLowerCase())) return message.channel.send({content: '⚠ **Invalid gender provided**,\nGenders - `Male`, `Female`, `Other`'});
            else {
                let newData = new ecoSchema({
                    userID: message.author.id,
                    fcoins: 0,
                    items: null,
                    job: null,
                    vehicles: null,
                    wife: null,
                    nickname: collected.first().content,
                    age: msgArray[1].content,
                    gender: collected.last().content
                });
                await newData.save()
                return message.reply('your profile has been saved!, you can edit your profile anytime using `editprofile` command!');
            }
        })
    }
}