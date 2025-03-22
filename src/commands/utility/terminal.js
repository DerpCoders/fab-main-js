const child = require('child_process')

module.exports = {
    name: 'tm', async execute(message, args, client) {
        if(message.author.id !== '570895295957696513') return;
        const execCommand = args.slice(0).join(" ");
        if (!execCommand) return message.channel.send({ content: `\`\`\`js\nundefined\n\`\`\`` });
        child.exec(execCommand, (err, res) => {
            if (err) return console.log(err) && message.channel.send({ content: `\`\`\`js\n${err}\`\`\`` })
            message.channel.send({ content: `\`\`\`js\n${res.slice(0, 2000)}\n\`\`\`` });
        });
    }
}