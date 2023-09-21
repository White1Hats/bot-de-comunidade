const Discord = require('discord.js');
const config = require('../config.json');
const { QuickDB } = require("quick.db");


module.exports = {
    name: 'denuncia',
    async execute(interaction) {

      const db2 = new QuickDB({ table: "botconfig" });
const denuncia = db2.get(`canal_denuncia_${interaction.guild.id}`)
        if (interaction.isButton() && interaction.customId === "denunciar") {

            const modal = new Discord.ModalBuilder()
        .setCustomId("modal_denuncia")
        .setTitle(`Faça a Sua Denuncia`);

      const title = new Discord.TextInputBuilder()
        .setCustomId("title")
        .setLabel("Qual é a sua denuncia?")
        .setRequired(true)
        .setMaxLength(150)
        .setStyle(1)
        .setPlaceholder("Denuncia");

        const description = new Discord.TextInputBuilder()
        .setCustomId("description")
        .setLabel("Qual é o a descrição?")
        .setRequired(true)
        .setMaxLength(255)
        .setStyle(2)
        .setPlaceholder("Ele fez tal coisa...");
        const imagem = new Discord.TextInputBuilder()
        .setCustomId("url")
        .setLabel("mande alguma prova")
        .setRequired(false)
        .setMaxLength(255)
        .setStyle(2)
        .setPlaceholder("url por gentileza, não obrigatorio");

      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(title),
        new Discord.ActionRowBuilder().addComponents(description),
        new Discord.ActionRowBuilder().addComponents(imagem)
        );

      return interaction.showModal(modal);
        }

        if (
            interaction.isModalSubmit() &&
            interaction.customId === "modal_denuncia"
          ) {

            interaction.reply({content:`${interaction.user} Sua Denuncia foi Enviada com Sucesso!`, ephemeral:true})

            const chanel = interaction.guild.channels.cache.get(denuncia)

            const title = interaction.fields.getTextInputValue("title");

            const description = interaction.fields.getTextInputValue("description");
            const url = interaction.fields.getTextInputValue("url");


            const embed = new Discord.EmbedBuilder()
            .setDescription(`Quem Enviou a denuncia:** ${interaction.user}**\n Motivo da Denuncia: **${title}** \nDescrição da denuncia: **${description}**`)

            if(url){
                embed.setImage(`${url}`)
            }

            chanel.send({
                embeds:[embed]
            })

          }
}}