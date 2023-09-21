const Discord = require("discord.js")
const config = require("../../config.json")
const { QuickDB } = require('quick.db');
const db2 = new QuickDB({ table: "botconfig" });

module.exports = {
  name: "painel", // Coloque o nome do comando
  description: "Abra o painel sugestao e avaliacao", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const thumbnail = await db2.get(`thumbnail_ticket_${interaction.guild.id}`)
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        interaction.reply({content:"painel enviado com sucesso", ephemeral:true})
        interaction.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("Blue")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription("Caso tenha gostado de algo ou queira de nós adicione algo, escolha conforme sua necessidade!")
                    .setImage(thumbnail)
                    .setFooter({ text: `Copyright © Mont Shop` })
            ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                    .setCustomId("options_painel")
                    .setPlaceholder("Escolha uma opção!")
                    .addOptions(
                        {
                            label: "Sugestão",
                            value: `sugestion`,
                        },
                        {
                            label: "Avaliar",
                            value: `avaliation`,
                        },
              )
                )
            ]
        })
    }

  }
}