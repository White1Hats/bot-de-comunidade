const Discord = require("discord.js");
const config = require("../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ table: "botconfig" });

module.exports = {
  name: "botconfig",
  async execute(interaction, client) {
    const update_button = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setLabel("Voltar")
          .setCustomId("voltar")
          .setStyle(Discord.ButtonStyle.Primary)
      );
    if (interaction.isButton() && interaction.customId === "voltar") {
      interaction.update({
        content: `${interaction.user}`,
        embeds: [
          new Discord.EmbedBuilder()
            .setFooter({ text: "Feito por white.hats" })
            .setDescription(
              "Seja Bem Vindo para o painel de Configuração, aqui você estara configurando tudo que for necessario!"
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setLabel("Canais")
              .setCustomId("canal_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Ticket")
              .setCustomId("ticket_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Cargos")
              .setCustomId("cargos_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Gerais")
              .setCustomId("gerais_config")
              .setStyle(Discord.ButtonStyle.Secondary)
          ),
          update_button,
        ],
      });
    }
    if (interaction.isButton() && interaction.customId === "ticket_config") {
      const creditos = await db.get(`creditos_ticket_${interaction.guild.id}`);
      const categoria = await db.get(
        `categoria_ticket_${interaction.guild.id}`
      );
      const thumbnail = await db.get(
        `thumbnail_ticket_${interaction.guild.id}`
      );

      const embed = new Discord.EmbedBuilder().setDescription(
        `Configure tudo sobre o ticket! \nCreditos: ${creditos} \nId da Categoria Ticket: ${categoria}`
      );

      if (thumbnail) {
        embed.setImage(thumbnail);
      }
      interaction.update({
        embeds: [embed],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setLabel("Categoria")
              .setCustomId("categoria_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Creditos")
              .setCustomId("credits_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("thumbnail")
              .setCustomId("thumbnail_config")
              .setStyle(Discord.ButtonStyle.Secondary)
          ),
          update_button,
        ],
      });
    }
    if (interaction.isButton() && interaction.customId === "cargos_config") {
      const cargo_staff = await db.get(`cargos_staff_${interaction.guild.id}`);
      const cargo_warn1 = await db.get(`warn_1_${interaction.guild.id}`);
      const cargo_warn2 = await db.get(`warn_2_${interaction.guild.id}`);
      const cargo_warn3 = await db.get(`warn_3_${interaction.guild.id}`);

      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder().setDescription(
            `Altere tudo do cargo! \n\n Cargo Staff: ${cargo_staff} \n Cargo de warning 1: ${cargo_warn1}\n Cargo de warning 2: ${cargo_warn2}\n Cargo de warning 3: ${cargo_warn3}`
          ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setLabel("Cargo Staff")
              .setCustomId("cargo_staff_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Cargo warn1")
              .setCustomId("cargo_warn1_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Cargo warn2")
              .setCustomId("cargo_warn2_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Cargo warn3")
              .setCustomId("cargo_warn3_config")
              .setStyle(Discord.ButtonStyle.Secondary)
          ),
          update_button,
        ],
      });
    }
    if (interaction.isButton() && interaction.customId === "gerais_config") {
      const bate_ponto = await db.get(`bate_ponto_${interaction.guild.id}`);

      interaction.update({
        embeds: [
          new Discord.EmbedBuilder().setDescription(
            `Altere o restante dos outros: \nBate Ponto: ${bate_ponto} \n`
          ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setLabel("bate ponto")
              .setCustomId("bater_ponto")
              .setStyle(Discord.ButtonStyle.Secondary),
          ),
          update_button,
        ],
      });
    }

    if (interaction.isButton() && interaction.customId === "canal_config") {
      const avaliation = await db.get(`canal_avalia_${interaction.guild.id}`);
      const denuncia = await db.get(`canal_denuncia_${interaction.guild.id}`);
      const sugestão = await db.get(`canal_sugestion_${interaction.guild.id}`);
      const avalia_ticket = await db.get(
        `canal_avalia_ticket_${interaction.guild.id}`
      );
      const welcome = await db.get(`canal_welcome_${interaction.guild.id}`);
      const saida = await db.get(`canal_saida_${interaction.guild.id}`);
      const logs = await db.get(`canal_logs_${interaction.guild.id}`);

      interaction.update({
        content: `${interaction.user}`,
        embeds: [
          new Discord.EmbedBuilder().setDescription(`Configure todos os canais: 
                    \n\nCanal de avaliação: <#${avaliation}>
                    \nCanal de Denuncia: <#${denuncia}>
                    \nCanal de Sugestão: <#${sugestão}>
                    \nCanal avaliação ticket: <#${avalia_ticket}>
                    \ncanal Welcome: <#${welcome}>
                    \nCanal Saida: <#${saida}>
                    \nCanal de Logs: <#${logs}>`),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setLabel("Avaliação")
              .setCustomId("avaliation_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Denuncia")
              .setCustomId("denuncia_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Sugestão")
              .setCustomId("sugestao_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("Avalia Ticket")
              .setCustomId("avaliation_ticket_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("welcome")
              .setCustomId("welcome_config")
              .setStyle(Discord.ButtonStyle.Secondary)
          ),
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setLabel("Saida")
              .setCustomId("saida_config")
              .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
              .setLabel("logs")
              .setCustomId("logs_config")
              .setStyle(Discord.ButtonStyle.Secondary)
          ),
          update_button,
        ],
      });
    }

    if (interaction.isButton() && interaction.customId === "bater_ponto") {
      await interaction.reply({ content: "Escreva o ID do Server:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`bate_ponto_${interaction.guild.id}`, channelId);
        interaction.editReply({
          content: "Id do Servidor foi alterado com sucesso.",
        });
      });
    }

    if (
      interaction.isButton() &&
      interaction.customId === "avaliation_config"
    ) {
      await interaction.reply({ content: "Escreva o ID do canal:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`canal_avalia_${interaction.guild.id}`, channelId);

        interaction.editReply({ content: "ID do Canal alterado com sucesso." });
      });
    }
    if (interaction.isButton() && interaction.customId === "denuncia_config") {
      await interaction.reply({ content: "Escreva o ID do canal:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`canal_denuncia_${interaction.guild.id}`, channelId);

        interaction.editReply({ content: "ID do Canal alterado com sucesso." });
      });
    }
    if (interaction.isButton() && interaction.customId === "sugestao_config") {
      await interaction.reply({ content: "Escreva o ID do canal:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`canal_sugestion_${interaction.guild.id}`, channelId);

        interaction.editReply({ content: "ID do Canal alterado com sucesso." });
      });
    }
    if (
      interaction.isButton() &&
      interaction.customId === "avaliation_ticket_config"
    ) {
      await interaction.reply({ content: "Escreva o ID do canal:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`canal_avalia_ticket_${interaction.guild.id}`, channelId);

        interaction.editReply({ content: "ID do Canal alterado com sucesso." });
      });
    }
    if (interaction.isButton() && interaction.customId === "welcome_config") {
      await interaction.reply({ content: "Escreva o ID do canal:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`canal_welcome_${interaction.guild.id}`, channelId);

        interaction.editReply({ content: "ID do Canal alterado com sucesso." });
      });
    }
    if (interaction.isButton() && interaction.customId === "saida_config") {
      await interaction.reply({ content: "Escreva o ID do canal:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`canal_saida_${interaction.guild.id}`, channelId);

        interaction.editReply({ content: "ID do Canal alterado com sucesso." });
      });
    }
    if (interaction.isButton() && interaction.customId === "logs_config") {
      await interaction.reply({ content: "Escreva o ID do canal:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`canal_logs_${interaction.guild.id}`, channelId);

        interaction.editReply({ content: "ID do Canal alterado com sucesso." });
      });
    }

    if (interaction.isButton() && interaction.customId === "categoria_config") {
      await interaction.reply({ content: "Escreva o ID da categoria:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`categoria_ticket_${interaction.guild.id}`, channelId);

        interaction.editReply({
          content: "ID da categoria foi alterado com sucesso.",
        });
      });
    }
    if (interaction.isButton() && interaction.customId === "credits_config") {
      await interaction.reply({ content: "Escreva os creditos:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`creditos_ticket_${interaction.guild.id}`, channelId);

        interaction.editReply({
          content: "Os creditos foram alterado com sucesso.",
        });
      });
    }
    if (interaction.isButton() && interaction.customId === "thumbnail_config") {
      await interaction.reply({ content: "Escreva a url da imagem:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`thumbnail_ticket_${interaction.guild.id}`, channelId);

        interaction.editReply({
          content: "A Thumbnail foram alterado com sucesso.",
        });
      });
    }
    if (
      interaction.isButton() &&
      interaction.customId === "cargo_staff_config"
    ) {
      await interaction.reply({ content: "Escreva o ID do cargo:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`cargos_staff_${interaction.guild.id}`, channelId);

        interaction.editReply({
          content: "O Cargo Staff foram alterado com sucesso.",
        });
      });
    }

    if (
      interaction.isButton() &&
      interaction.customId === "cargo_warn1_config"
    ) {
      await interaction.reply({ content: "Escreva o ID do cargo:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`warn_1_${interaction.guild.id}`, channelId);

        interaction.editReply({
          content: "O Cargo warning V1 foram alterado com sucesso.",
        });
      });
    }
    if (
      interaction.isButton() &&
      interaction.customId === "cargo_warn2_config"
    ) {
      await interaction.reply({ content: "Escreva o ID do cargo:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`warn_2_${interaction.guild.id}`, channelId);

        interaction.editReply({
          content: "O Cargo warning V2 foram alterado com sucesso.",
        });
      });
    }
    if (
      interaction.isButton() &&
      interaction.customId === "cargo_warn3_config"
    ) {
      await interaction.reply({ content: "Escreva o ID do cargo:" });

      const collector = interaction.channel.createMessageCollector({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 60000,
      });

      collector.on("end", (collected) => {
        collected.first().delete().catch(console.error);
        if (collected.size === 0) {
          return interaction.followUp({
            content: "Tempo esgotado. Por favor, tente novamente.",
          });
        }

        const channelId = collected.first().content;
        db.set(`warn_3_${interaction.guild.id}`, channelId);

        interaction.editReply({
          content: "O Cargo warning V3 foram alterado com sucesso.",
        });
      });
    }
  },
};
