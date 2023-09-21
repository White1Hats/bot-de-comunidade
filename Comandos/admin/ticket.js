const Discord = require("discord.js");
const config = require('../../config.json');
const { QuickDB } = require("quick.db");
const db2 = new QuickDB({ table: "botconfig" });



module.exports = {
    name: "ticket",
    description: "Utilize para enviar uma embed para abrir um ticket",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const creditos = await db2.get(`creditos_ticket_${interaction.guild.id}`)
        const thumbnail = await db2.get(`thumbnail_ticket_${interaction.guild.id}`)
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({
            content: `**⛔ | ${interaction.user}, Você precisa da permissão \`ADMNISTRATOR\` para usar este comando!**`,
            ephemeral: true,
        })

        await interaction.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor(config.embeds_color.embed_invisible)
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .addFields(
                        { name: '<a:emoji_9:1124475548115144825> **| Infomações**', value: `> Olá, se você esta lendo isso aqui, provavelmente está precisando de ajuda clique no botão abaixo para tirar suas duvidas` },
                        { name: '<:CalendarioLost7v2:1140580692472889425> **| Horario de atendimento**', value: `> Segunda a Sabado (12:00 até as 00:00 Horas)` }
                    )
                    .setImage(thumbnail)
                    .setFooter({ text: `Copyright © ${creditos}` })
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('start_ticket')
                            .setLabel('Ticket')
                            .setEmoji('<:emjPastHurley:1124475544357052498>')
                            .setStyle(2)
                    )
            ]
        });

        interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor(config.embeds_color.embed_success)
                    .setDescription(`🌟 | Embed enviada com sucesso!`)
            ],
            ephemeral: true
        })
    }
}