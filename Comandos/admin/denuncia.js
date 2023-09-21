const Discord = require("discord.js")
const config = require("../../config.json")
const { QuickDB } = require('quick.db');
const db2 = new QuickDB({ table: "botconfig" });
module.exports = {
  name: "denuncia", // Coloque o nome do comando
  description: "Abra um painel de denuncia", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {

        interaction.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("Blue")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription("Faça Sua Denuncia Aqui! \n Para denunciar, basta clicar no botão abaixo")
                    .setFooter({ text: `Copyright © Mont Shop` })
                    .setImage()
            ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel("Denuncie Aqui")
                    .setCustomId("denunciar")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji("<a:pepeFurto:1124475608504737863>")
                )
            ]
        })

        interaction.reply({
            content:`${interaction.user} Painel De Denuncia enviada com sucesso!`,
            ephemeral:true
        })

    }


  }
}