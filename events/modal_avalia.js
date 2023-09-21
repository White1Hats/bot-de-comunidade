const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs')


module.exports = {
    name: 'botconfig',
    async execute(interaction) {
      if (interaction.isButton()) {
        if (interaction.customId.startsWith("1estrela")){
  
        const modal_bot_config_feedback = new Discord.ModalBuilder()
        .setCustomId('modal_bot_config_feedback')
        .setTitle(`FeedBack`)
      const feeddback = new Discord.TextInputBuilder()
        .setCustomId('feedback')
        .setLabel('Digite Seu FeedBack')
        .setPlaceholder('Escreva o feedback aqui.')
        .setStyle(Discord.TextInputStyle.Short)
  
      const firstActionRow = new Discord.ActionRowBuilder().addComponents(feeddback);
      modal_bot_config_feedback.addComponents(firstActionRow)
      await interaction.showModal(modal_bot_config_feedback);
    
  
  
        interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
            .setDescription("Obrigado pela Sua avaliação")
            .setColor(config.embeds_color.embed_primary)
          ],
          components: []
        })}}
        if (interaction.isButton()) {
          if (interaction.customId.startsWith("1estrela")){
    
          const modal_bot_config_feedback = new Discord.ModalBuilder()
          .setCustomId('modal_bot_config_feedback')
          .setTitle(`FeedBack`)
        const feeddback = new Discord.TextInputBuilder()
          .setCustomId('feedback')
          .setLabel('Digite Seu FeedBack')
          .setPlaceholder('Escreva o feedback aqui.')
          .setStyle(Discord.TextInputStyle.Short)
    
        const firstActionRow = new Discord.ActionRowBuilder().addComponents(feeddback);
        modal_bot_config_feedback.addComponents(firstActionRow)
        await interaction.showModal(modal_bot_config_feedback);
      
    
    
          interaction.update({
            embeds: [
              new Discord.EmbedBuilder()
              .setDescription("Obrigado pela Sua avaliação")
              .setColor(config.embeds_color.embed_primary)
            ],
            components: []
          })}}


          if (interaction.isButton()) {
            if (interaction.customId.startsWith("2estrela")){
      
            const modal_bot_config_feedback2 = new Discord.ModalBuilder()
            .setCustomId('modal_bot_config_feedback2')
            .setTitle(`FeedBack`)
          const feeddback2 = new Discord.TextInputBuilder()
            .setCustomId('feedback2')
            .setLabel('Digite Seu FeedBack')
            .setPlaceholder('Escreva o feedback aqui.')
            .setStyle(Discord.TextInputStyle.Short)
      
          const firstActionRow = new Discord.ActionRowBuilder().addComponents(feeddback2);
          modal_bot_config_feedback2.addComponents(firstActionRow)
          await interaction.showModal(modal_bot_config_feedback2);
        
      
      
            interaction.update({
              embeds: [
                new Discord.EmbedBuilder()
                .setDescription("Obrigado pela Sua avaliação")
                .setColor(config.embeds_color.embed_primary)
              ],
              components: []
            })}}
            if (interaction.isButton()) {
              if (interaction.customId.startsWith("3estrela")){
        
              const modal_bot_config_feedback2 = new Discord.ModalBuilder()
              .setCustomId('modal_bot_config_feedback3')
              .setTitle(`FeedBack`)
            const feeddback2 = new Discord.TextInputBuilder()
              .setCustomId('feedback3')
              .setLabel('Digite Seu FeedBack')
              .setPlaceholder('Escreva o feedback aqui.')
              .setStyle(Discord.TextInputStyle.Short)
        
            const firstActionRow = new Discord.ActionRowBuilder().addComponents(feeddback2);
            modal_bot_config_feedback2.addComponents(firstActionRow)
            await interaction.showModal(modal_bot_config_feedback2);
          
        
        
              interaction.update({
                embeds: [
                  new Discord.EmbedBuilder()
                  .setDescription("Obrigado pela Sua avaliação")
                  .setColor(config.embeds_color.embed_primary)
                ],
                components: []
              })}}

              if (interaction.isButton()) {
                if (interaction.customId.startsWith("4estrela")){
          
                const modal_bot_config_feedback2 = new Discord.ModalBuilder()
                .setCustomId('modal_bot_config_feedback4')
                .setTitle(`FeedBack`)
              const feeddback2 = new Discord.TextInputBuilder()
                .setCustomId('feedback4')
                .setLabel('Digite Seu FeedBack')
                .setPlaceholder('Escreva o feedback aqui.')
                .setStyle(Discord.TextInputStyle.Short)
          
              const firstActionRow = new Discord.ActionRowBuilder().addComponents(feeddback2);
              modal_bot_config_feedback2.addComponents(firstActionRow)
              await interaction.showModal(modal_bot_config_feedback2);
            
          
          
                interaction.update({
                  embeds: [
                    new Discord.EmbedBuilder()
                    .setDescription("Obrigado pela Sua avaliação")
                    .setColor(config.embeds_color.embed_primary)
                  ],
                  components: []
                })}}

                if (interaction.isButton()) {
                  if (interaction.customId.startsWith("5estrela")){
            
                  const modal_bot_config_feedback2 = new Discord.ModalBuilder()
                  .setCustomId('modal_bot_config_feedback5')
                  .setTitle(`FeedBack`)
                const feeddback2 = new Discord.TextInputBuilder()
                  .setCustomId('feedback5')
                  .setLabel('Digite Seu FeedBack')
                  .setPlaceholder('Escreva o feedback aqui.')
                  .setStyle(Discord.TextInputStyle.Short)
            
                const firstActionRow = new Discord.ActionRowBuilder().addComponents(feeddback2);
                modal_bot_config_feedback2.addComponents(firstActionRow)
                await interaction.showModal(modal_bot_config_feedback2);
            }}
}}