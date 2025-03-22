const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, MessageFlags, Message } = require('discord.js');

module.exports = {
  name: 'tictactoe',
  /** 
   * @param {Message} message 
   */
  async execute(message) {
    const emptyBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let playerTurn = true;

    function checkWinner(board) {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
      ];
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return board.includes(' ') ? null : 'draw';
    }

    function getAiMove(board) {
      let emptyIndices = board.map((val, idx) => val === ' ' ? idx : null).filter(v => v !== null);
      return emptyIndices.length ? emptyIndices[Math.floor(Math.random() * emptyIndices.length)] : -1;
    }

    async function updateBoard(interaction, index) {
      if (!playerTurn || emptyBoard[index] !== ' ') return;
      emptyBoard[index] = 'X';
      playerTurn = false;

      let winner = checkWinner(emptyBoard);
      if (winner) return endGame(interaction, winner);

      let aiMove = getAiMove(emptyBoard);
      if (aiMove !== -1) emptyBoard[aiMove] = 'O';

      winner = checkWinner(emptyBoard);
      if (winner) return endGame(interaction, winner);

      playerTurn = true;
      await interaction.update({ embeds: [generateEmbed()], components: generateButtons() });
    }

    async function endGame(interaction, winner) {
      let resultText = (winner === 'draw') ? "It's a draw!" : `Winner: ${winner}`;
      if (winner === 'X') message.reply({content: ':tada: Congratulations! You Won!'});
      else if (winner === 'O') message.reply({content: 'Better Luck next time.'})
      await interaction.update({
        embeds: [generateEmbed(resultText)],
        components: [] 
      });
    }

    function generateEmbed(status = 'Your turn! Click a button.') {
      return new EmbedBuilder()
        .setTitle("Tic-Tac-Toe 🏆")
        .setDescription(`Player: **X** | Bot: **O**\n\n${formatBoard(emptyBoard)}`)
        .setColor("#ffcc00")
        .setFooter({text: status});
    }

    function generateButtons() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
          let buttons = [];
          for (let j = 0; j < 3; j++) {
            let idx = i * 3 + j;
            buttons.push(new ButtonBuilder()
              .setCustomId(idx.toString())
              .setLabel(emptyBoard[idx] !== ' ' ? emptyBoard[idx] : '⬜') 
              .setStyle(emptyBoard[idx] === ' ' ? ButtonStyle.Secondary : ButtonStyle.Primary)
              .setDisabled(emptyBoard[idx] !== ' '));
          }
          rows.push(new ActionRowBuilder().addComponents(buttons));
        }
        return rows;
      }      

    function formatBoard(board) {
      return `\`\`\`\n${board.slice(0, 3).join(' | ')}\n---------\n${board.slice(3, 6).join(' | ')}\n---------\n${board.slice(6, 9).join(' | ')}\n\`\`\``;
    }

    let gameMessage = await message.channel.send({
      embeds: [generateEmbed()],
      components: generateButtons()
    });

    const collector = gameMessage.createMessageComponentCollector({ time: 60000 });

    collector.on('collect', async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        return await interaction.reply({ content: "This is not your game!", flags:  MessageFlags.Ephemeral });
      }
      await updateBoard(interaction, parseInt(interaction.customId));
    });

    collector.on('end', async () => {
      await gameMessage.edit({ components: [] });
    });
  }
};
