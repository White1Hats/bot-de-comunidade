const config = require('../config.json');
const dc = require("discord.js");
const moment = require("moment");
let nsei = []
let tempo1 = []
const { QuickDB } = require("quick.db");
const db2 = new QuickDB({ table: "botconfig" });


module.exports = {
    name: 'bateponto',
    async execute(interaction, int, client) {
        const bate_ponto = await db2.get(`bate_ponto_${interaction.guild.id}`)
        const logs = await db2.get(`canal_logs_${interaction.guild.id}`)

        if (interaction.isButton() && interaction.customId === "iniciar_bate_ponto") {
            if(nsei.includes(interaction.user.id)) {
                const reply3 = new dc.EmbedBuilder()
                .setDescription(`< **você já possui um ponto aberto.**  `)
                .setColor(config.embeds_color.embed_primary)
                interaction.client.channels.cache.get(logs);
                return await interaction.reply({ embeds: [reply3], ephemeral: true })    
                };
              
               nsei.push(interaction.user.id)
          
                       
                const reply1 = new dc.EmbedBuilder()
                .setDescription(`${interaction.user}  Seu ponto foi **INICIADO** com sucesso. `)
                .setColor(config.embeds_color.embed_primary)
          
          
                
                interaction.reply({ embeds: [reply1], ephemeral: true })
          
                
                let array = [interaction.user.id]
          
                if(interaction.user.customId == "entrar") {
                    array.push(interaction.user)
                } else if(interaction.user.customId == "sair") {
                    array = array.filter(user => user.id != interaction.user.id)
                }
          
                let canalLogs = interaction.client.channels.cache.get(bate_ponto); 
          
                tempo1[interaction.user.id] = `<t:${moment(interaction.createdTimestamp).unix()}>`
                const tempo = tempo1[interaction.user.id];
                const embedE = new dc.EmbedBuilder()
                .setTitle(`**NOVO PONTO INICIADO**  \n\n_ INFORMAÇÕES ABAIXO:_`)
                .setThumbnail(interaction.user.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png' }))
                .setDescription(`horário de entrada: ${tempo}\n Membro: **${interaction.user.username} (${interaction.user.id})**`)
                .setColor(config.embeds_color.embed_primary)
                .setFooter({
                iconURL: interaction.guild.iconURL({ dynamic: true }),
                text: (`Pontos Staffs.`)
                    })
                .setTimestamp()
          
                
                canalLogs.send({ embeds: [embedE]})
        }
        if (interaction.isButton() && interaction.customId === "fechar_bate_ponto") {

            if(!nsei.includes(interaction.user.id)) {
                const reply3 = new dc.EmbedBuilder()
              .setDescription(`Você não possui ponto **ABERTO.**`)
              .setColor(config.embeds_color.embed_primary)
              interaction.client.channels.cache.get(bate_ponto);
              return await interaction.reply({ embeds: [reply3], ephemeral: true }) 
              } 
        
              nsei = nsei.filter((el) => {
                return el != interaction.user.id
              })
        
              const tempo2 = `<t:${moment(interaction.createdTimestamp).unix()}>`
              let canalLogs = interaction.client.channels.cache.get(bate_ponto); //ID do canal que serÃ¡ enviada logs do bateponto
              
              const tempo = tempo1[interaction.user.id];

              const reply2 = new dc.EmbedBuilder()
              .setDescription(`${interaction.user}  Seu ponto foi **FINALIZADO** com sucesso.`)
              .setColor(config.embeds_color.embed_primary)
        
              interaction.reply({ embeds: [reply2], ephemeral: true })
        
              const embedS = new dc.EmbedBuilder()
              .setTitle(`**PONTO FINALIZADO**\n\n_  INFORMAÇÕES ABAIXO:_`)
              .setThumbnail(interaction.user.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png' }))
              .setDescription(`Horario de Entrada: ${tempo} \nhorário de saída: ${tempo2}\nMembro: **${interaction.user.username} (${interaction.user.id})**`)
              .setColor(config.embeds_color.embed_primary)
              .setFooter({
              iconURL: interaction.guild.iconURL({ dynamic: true }),
              text: (`Pontos Staffs.`)
                  })
              .setTimestamp()
        
              canalLogs.send({ embeds: [embedS]})

        }


  

    }}