const Discord = require("discord.js")

module.exports = {
  name: "help", 
  description: "Painel de comandos do bot.", 
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const embed_painel = new Discord.EmbedBuilder()
        .setTitle('Meus comandos')
        .setDescription(`Caso você tenha alguma duvida, poderá consultar aqui!`)
        .setColor(`Red`)

// embed pix

    const embed_pix = new Discord.EmbedBuilder()
                .setDescription("Este aqui são todos os comandos para ver ox pix") 
                .setColor("Red")
                .addFields(
                    {name: "/pixbruno - pix do bruno", value: " \n/pixmont - pix do mont /pixnory - pix do nory \n/pixran - pix do ran \n/pixvitor - pix do vitor \n/pixwhite - pix do white"},

                )
            
//embed_diversao

    const embed_diversao = new Discord.EmbedBuilder()
                .setDescription("Este aqui são os meus comandos de diversão")
                .setColor("Red")
                .addFields(
                    {name: "/help - ver todos os comandos\n /serverinfo - ver todas as informações do servidor \n /userinfo - ver algumas informações do usuario", value:"/ping - veja o ping do bot"},
                    {name: "**MINIGAMES**", value:"/mina - jogue o jogo de mina \n/memory - jogue o jogo da memoria \n/snake - jogue o jogo da cobrinha \n/tictactoe - jogue o jogo da velha com alguem"}
                )

//embed_adm

    const embed_adm = new Discord.EmbedBuilder()
                .setDescription("Este aqui são os meus comandos de administração")
                .setColor("Red")
                .addFields(
                    {name: "/addemoji - adicionar um emoji \n /painel - abra um painel de avaliação e sugestão \n /say [embed][normal] - faça o bot enviar uma mensagem/embed \n/tabela - envie a tabela de preço \n/ticket - crie um painel para abrir ticket", value:"/clear - remover 100 mensagens rapidamente \n/removercastigo - remover castigo de algum usuario \n/castigo - dar castigo em algum usuario \n/warn - avisar o membro, e depois da 3° vez é banimento \n/kick - tirar algum usuario \nban - banir algum usuario \nunban - desbanir algum usuario"},
                )
                

    const painel = new Discord.ActionRowBuilder().addComponents(
        new Discord.StringSelectMenuBuilder()
            .setCustomId("painel_help")
            .setPlaceholder("Clique aqui!")
            .addOptions(
                {
                    label: "Painel Inicial",
                    value: "painel"
                },
                {
                    label: "pix",
                    description: "Veja os Pixs de todos que estão aqui",
                    value: "pixs"
                },
                {
                    label: "Diversão",
                    description: "Veja meus comandos de diversão.",
                    value: "diversao"
                },
                {
                    label: "Administração",
                    description: "Veja meus comandos de administração.",
                    value: "adm"
                }
            )
    )

    interaction.reply({ embeds: [embed_painel], components: [painel], ephemeral: true }).then( () => {
        interaction.channel.createMessageComponentCollector().on("collect", (c) => {
            const valor = c.values[0];

            if (valor === "painel") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_painel] })
            } else if (valor === "pixs") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_pix] })
            } else if (valor === "diversao") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_diversao] })
            } else if (valor === "adm") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_adm] })
            } 

        })
    })


    
  }
}
