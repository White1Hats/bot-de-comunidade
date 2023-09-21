const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs')
const { QuickDB } = require("quick.db");
const db2 = new QuickDB({ table: "botconfig" });



module.exports = {
    name: 'denuncia',
    async execute(interaction) {

      const avaliation = await db2.get(`canal_avalia_${interaction.guild.id}`)
const sugestão = await db2.get(`canal_sugestion_${interaction.guild.id}`)
        if (
            interaction.isStringSelectMenu() &&
            interaction.customId === "options_painel"
          ) {
      
            const option = interaction.values[0];
      
            if (option === "sugestion") {
                
                const modal = new Discord.ModalBuilder()
                .setCustomId("modal_sugestion")
                .setTitle(`Faça a Sua Sugestão`);
        
              const title = new Discord.TextInputBuilder()
                .setCustomId("title")
                .setLabel("Qual é a sua Sugestão?")
                .setRequired(true)
                .setMaxLength(150)
                .setStyle(1)
                .setPlaceholder("Sugestão");
        
                const description = new Discord.TextInputBuilder()
                .setCustomId("description")
                .setLabel("Qual é a descrição?")
                .setRequired(true)
                .setMaxLength(255)
                .setStyle(2)
                .setPlaceholder("eu quero que adicione tal coisa...");
    
    
              modal.addComponents(
                new Discord.ActionRowBuilder().addComponents(title),
                new Discord.ActionRowBuilder().addComponents(description),
                );
        
              return interaction.showModal(modal);
                }

                if (option === "avaliation") {
                
                    const modal = new Discord.ModalBuilder()
                    .setCustomId("modal_avalation")
                    .setTitle(`Faça a Sua avaliação`);

                    const numero = new Discord.TextInputBuilder()
                    .setCustomId("number")
                    .setLabel("escolha um numero de 1/5")
                    .setRequired(true)
                    .setMaxLength(150)
                    .setStyle(1)
                    .setPlaceholder("apenas algum desses numeros");
            
                    const description = new Discord.TextInputBuilder()
                    .setCustomId("description")
                    .setLabel("Qual é a descrição da sua avaliação?")
                    .setRequired(true)
                    .setMaxLength(255)
                    .setStyle(2)
                    .setPlaceholder("eu gostei de tal coisa...");
        
        
                  modal.addComponents(
                    new Discord.ActionRowBuilder().addComponents(numero),
                    new Discord.ActionRowBuilder().addComponents(description),
                    );
            
                  return interaction.showModal(modal);
                    }
        
        }


        if (
            interaction.isModalSubmit() &&
            interaction.customId === "modal_avalation"
          ) {
            const chanel = interaction.client.channels.cache.get(avaliation);
            const input = interaction.fields.getTextInputValue("number");
            const descri = interaction.fields.getTextInputValue("description");

        switch (input) {
            case "1": {
                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️ (1/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]
            })
                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "2": {
                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️ (2/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})
                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "3": {

                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️⭐️ (3/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})

                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "4": {
                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️⭐️⭐️ (4/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})

                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            case "5": {

                chanel.send({embeds:[
                    new Discord.EmbedBuilder()
                    .setTitle("❤️ | Nova Avaliação")
                    .addFields({ name:"👥 | Avaliação Enviada Por:", value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({name: "😍 | Nota:", value:"⭐️⭐️⭐️⭐️⭐️ (5/5)"})
                    .addFields({ name: "✨ | Avaliação:", value: descri})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                    
                ]})

                interaction.reply({content:"Sua Avaliação Foi feita com sucesso!", ephemeral:true})
            } break;
            default: {
              interaction.reply({content:"Você não escolheu numero de 1 a 5", ephemeral:true});
          } break;

    }
          }
          if (
            interaction.isModalSubmit() &&
            interaction.customId === "modal_sugestion"
          ) {
            const title = interaction.fields.getTextInputValue("title");
            const description = interaction.fields.getTextInputValue("description");
            const chanel = interaction.guild.channels.cache.get(sugestão)
            
            await chanel.send({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription(`❤️ | Nova Sugestão`)
                    .addFields({ name:`👥 | Usuario que fez a sugestão:`, value:`\`${interaction.user.username} - ${interaction.user.id}\``})
                    .addFields({ name:`💡 | Sua Sugestão:`, value:`${title}`})
                    .addFields({ name:`📑 | Descrição:`, value:`${description}`})
                    .addFields({ name: "⏰ | Data / Horário:", value: `<t:${~~(new Date() / 1000)}:R>`})
                ]
            })

            interaction.reply({content:`${interaction.user} Sua Sugestão foi enviada com sucesso!`, ephemeral:true})

          }
}}