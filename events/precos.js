const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs')


module.exports = {
    name: 'precos',
    async execute(interaction) {

        const embed1_mm2 = 
        new Discord.EmbedBuilder()
        .setColor(config.embeds_color.embed_primary)
        .setTitle("Pagina 1")
        .setImage("https://media.discordapp.net/attachments/1113216899833147455/1146621583100760094/Comp_1_oooo_0000.png");

        const embed2_mm2 = 
        new Discord.EmbedBuilder()
        .setColor(config.embeds_color.embed_primary)
        .setTitle("Pagina 2")
        .setImage("https://media.discordapp.net/attachments/1113216899833147455/1146621583528570980/Comp_1_part_2_godlys_mont_0000.png");

        const embed3_mm2 = 
        new Discord.EmbedBuilder()
        .setColor(config.embeds_color.embed_primary)
        .setTitle("Pagina 3")
        .setImage("https://media.discordapp.net/attachments/1113216899833147455/1146621583901868144/Comp_1_ultima_godlys_0000.png");

        

        if (interaction.isButton() && interaction.customId === "tabeladhc") {
            interaction.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setColor(config.embeds_color.embed_primary)
                    .setImage("https://media.discordapp.net/attachments/1113216899833147455/1150216424292368484/Comp_1_gfx_dhc_ran_0000.png")
                ],
                ephemeral:true
            })
        }
        if (interaction.isButton() && interaction.customId === "mm2") {
            interaction.reply({
                embeds:[embed1_mm2],
                ephemeral:true,
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId("pagina2")
                        .setEmoji("<:c_white_seta_tde:1145009287488340018>")
                        .setStyle(Discord.ButtonStyle.Primary)
                    )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "pagina2") {
            interaction.update({
                embeds:[embed2_mm2],
                ephemeral:true,
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId("pagina1")
                        .setEmoji("<:leftseta:1147261116372758651>")
                        .setStyle(Discord.ButtonStyle.Primary),
                        new Discord.ButtonBuilder()
                        .setCustomId("pagina3")
                        .setEmoji("<:c_white_seta_tde:1145009287488340018>")
                        .setStyle(Discord.ButtonStyle.Primary)
                    )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "pagina1") {
            interaction.update({
                embeds:[embed1_mm2],
                ephemeral:true,
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId("pagina2")
                        .setEmoji("<:c_white_seta_tde:1145009287488340018>")
                        .setStyle(Discord.ButtonStyle.Primary)
                    )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "pagina3") {
            interaction.update({
                embeds:[embed3_mm2],
                ephemeral:true,
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId("pagina2")
                        .setEmoji("<:leftseta:1147261116372758651>")
                        .setStyle(Discord.ButtonStyle.Primary)
                    )
                ]
            })
        }






        if (interaction.isButton() && interaction.customId === "grupo_rbx") {
            interaction.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setColor(config.embeds_color.embed_primary)
                    .setImage("https://cdn.discordapp.com/attachments/846108856227856385/1147143276051312670/Comp_1_oooooooo_0000.png")
                    .setDescription(`<:cdl_pessoa:1127799875589906502> **| Duvidas?**\nAcesse nosso Canal: <#1153070631076778014>\n\n<:radar_reg_papers:1129829792095666246> **| Ticket:**\nNosso Ticket. <#1153070624630120549> \n\n<:carrinho_white:1129993728162013204> **| Stock:**\nAviso de Stock. <#1153070621308235796> \n\n> <a:adenuncia:1130967273255997542> Aceitamos Somente Pix. <a:adenuncia:1130967273255997542>\n> **Valor minimo: 500 de Robux, sem exeção.**\n\n**<a:aemoji_:1131420213510951112> Compras permitidas somente depois do prazo de 15 dias dentro do grupo.**\n*Atensiosamente Equipe Mont Shop <a:aBlue_Hearts:1130542141836369971> *`)
                ],
                ephemeral:true
            })
        }
        if (interaction.isButton() && interaction.customId === "gamepass_rbx") {
            interaction.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setColor(config.embeds_color.embed_primary)
                    .setImage("https://cdn.discordapp.com/attachments/846108856227856385/1147143257508298902/Comp_1_por_gamepass_0000.png")
                    .setDescription(`<:cdl_pessoa:1127799875589906502> **| Duvidas?**\nAcesse nosso Canal: <#1153070631076778014>\n\n<:radar_reg_papers:1129829792095666246> **| Ticket:**\nNosso Ticket. <#1153070624630120549> \n\n<:carrinho_white:1129993728162013204> **| Stock:**\nAviso de Stock. <#1153070621308235796> \n\n> <a:adenuncia:1130967273255997542> Aceitamos Somente Pix. <a:adenuncia:1130967273255997542>\n> **Valor minimo: 500 de Robux, sem exeção.**\n\n*Atensiosamente Equipe Mont Shop <a:aBlue_Hearts:1130542141836369971> *`)
                ],
                ephemeral:true
            })
        }

    }}