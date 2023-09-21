const Discord = require("discord.js");
const { TicTacToe } = require('discord-gamecord');

module.exports = {
  name: "tictactoe",
  description: "Jogue o jogo da velha",
  type: Discord.ApplicationCommandOptionType.ChatInput,
  options: [
    {
        name: "membro",
        description: "Mencione um usuário",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    }
],
  
  run: async (client, interaction, args) => {
    let user = interaction.options.getUser("membro")
    const Game = new TicTacToe({
     message: interaction,
     isSlashGame: false,
     opponent: user,
    embed: {
     title: 'Jogo da velha',
     color: '#5865F2',
     statusTitle: 'Status',
     overTitle: 'Game Over'
     },
   emojis: {
    xButton: '❌',
    oButton: '🔵',
    blankButton: '➖'
  },
   mentionUser: true,
   timeoutTime: 60000,
   xButtonStyle: 'DANGER',
   oButtonStyle: 'PRIMARY',
   turnMessage: '{emoji} | Sua vez de jogar **{player}**.',
   winMessage: '{emoji} | **{player}** Você ganhou.',
   tieMessage: 'O Jogo empatou! Ninguém ganhou!',
   timeoutMessage: 'O jogo ficou inacabado! Ninguém ganhou o jogo!',
   playerOnlyMessage: 'Apenas {player} e {opponent} pode usar esses botões.'
});

Game.startGame();
}};