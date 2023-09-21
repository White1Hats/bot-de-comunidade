const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { MatchPairs, TicTacToe } = require('discord-gamecord');


module.exports = {
    name: 'memory',
    description: 'Jogo da memoria',
    options: [
            {
                name: 'emojis',
                description: 'Jogo da memória.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                    name: "comida",
                    value: "100",
                
                },
                {
                    name: "bandeira",
                    value: "10",
                
                },
                {
                    name: "animals",
                    value: "11",
                
                },
                {
                    name: "sport",
                    value: "12",
                
                },
                {
                    name: "cars",
                    value: "13",
                
                },
              ],
              
            }
        ],
    run: async (client, interaction, args) => {
        let emojis = interaction.options.getString('emojis');

if(emojis === '100') {
    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``comida de memória``',
            color: '#2f3136',
            description: 'Clique nos botões abaixo para encontrar os pares!',
        },
        timeoutTime: 6000,
        emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
    });

    Game.startGame();

} else if (emojis === '10') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``bandeira Memory``',
            color: '#2f3136',
            description: 'Clique nos botões abaixo para encontrar os pares!',
        },
        timeoutTime: 6000,
        emojis: ['🇧🇷', '🇧🇫', '🇨🇴', '🇨🇳', '🇫🇮', '🇦🇲', '🇦🇽', '🇦🇨', '🇬🇬', '🇬🇸', '🇯🇪', '🇯🇵', '🇮🇱'],
    });

    Game.startGame();

} else if (emojis === '11') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``Memoria de Animal``',
            color: '#2f3136',
            description: 'Clique nos botões abaixo para encontrar os pares!',
        },
        timeoutTime: 6000,
        emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'],
    });

    Game.startGame();

} else if (emojis === '12') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``sport Memory``',
            color: '#2f3136',
            description: 'Clique nos botões abaixo para encontrar os pares!',
        },
        timeoutTime: 6000,
        emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉', '🎱', '🥏', '🏓', '🏸', '🏒', '⛳'],
    });

    Game.startGame();

} else if (emojis === '13') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``cars Memory``',
            color: '#2f3136',
            description: 'Clique nos botões abaixo para encontrar os pares!',
        },
        timeoutTime: 6000,
        emojis: ['🚔', '🚗', '🚙', '🛺', '🚌', '🚕', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚛'],
    });

    Game.startGame();
     }
      }
       }