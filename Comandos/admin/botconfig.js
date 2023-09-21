const Discord = require("discord.js")

module.exports = {
  name: "botconfig", // Coloque o nome do comando
  description: "Configure o bot", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        interaction.reply({
            content:`${interaction.user}`,
            embeds: 
            [new Discord.EmbedBuilder()
                .setFooter({ text:"Feito por white.hats"})
            .setDescription("Seja Bem Vindo para o painel de Configuração, aqui você estara configurando tudo que for necessario!")],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel("Canais")
                    .setCustomId("canal_config")
                    .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                    .setLabel("Ticket")
                    .setCustomId("ticket_config")
                    .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                    .setLabel("Cargos")
                    .setCustomId("cargos_config")
                    .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                    .setLabel("Gerais")
                    .setCustomId("gerais_config")
                    .setStyle(Discord.ButtonStyle.Secondary),
                )

            ]
        })
    }
  }}