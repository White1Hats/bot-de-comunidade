const Discord = require("discord.js")
const config = require("../../config.json")
const { QuickDB } = require("quick.db");
const db2 = new QuickDB({ table: "botconfig" });

module.exports = {
  name: "bate-ponto", // Coloque o nome do comando
  description: "faça uma embed que envie um painel bate-ponto", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const thumbnail = await db2.get(`thumbnail_ticket_${interaction.guild.id}`)
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {

        interaction.reply({
            content:"enviado com sucesso"
        })
        interaction.channel.send({
            embeds:[
                new Discord.EmbedBuilder()
                .setDescription("Mont Shop - Bate Ponto \n\n ** Clique no botão: ✅ Para iniciar seu bate-ponto \n Clique no botão: ❌ Para iniciar seu bate-ponto**")
                .setImage(thumbnail)
                .setColor(config.embeds_color.embed_primary)
            ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel("Iniciar")
                    .setEmoji("✅")
                    .setCustomId("iniciar_bate_ponto")
                    .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                    .setLabel("Fechar")
                    .setEmoji("❌")
                    .setCustomId("fechar_bate_ponto")
                    .setStyle(Discord.ButtonStyle.Secondary),
                )
            ]
        })

    }

  }
}