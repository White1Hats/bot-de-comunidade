const Discord = require("discord.js");
const config = require("../config.json");
const moment = require("moment-timezone");
const sourcebin = require("sourcebin");
const { QuickDB } = require("quick.db");
let ticketAssumedBy = new Map(); // aqui seria o id do cara
let ticketassumir = new Map();
const db2 = new QuickDB({ table: "botconfig" });




module.exports = {
  name: "startTicket",
  async execute(interaction, client) {

    const creditos = await db2.get(`creditos_ticket_${interaction.guild.id}`)
const categoria = await db2.get(`categoria_ticket_${interaction.guild.id}`)
const logs = await db2.get(`canal_logs_${interaction.guild.id}`)
const cargo_staff = await db2.get(`cargos_staff_${interaction.guild.id}`)


    if (interaction.isButton() && interaction.customId === "start_ticket") {
      const channel = interaction.guild.channels.cache.find(
        (c) =>
          c.name ===
          `🎫-${interaction.user.username.toLowerCase().replace(/ /g, "-")}`
      );

      if (channel)
        return interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_error)
              .setDescription(
                `<a:errado1:1124475561545318462> | Você já possui um ticket aberto em ${channel}.`
              ),
          ],
          ephemeral: true,
        });

      const modal = new Discord.ModalBuilder()
        .setCustomId("modal_ticket")
        .setTitle(`Abrir novo ticket`);

      const title = new Discord.TextInputBuilder()
        .setCustomId("title")
        .setLabel("Qual é o motivo do ticket?")
        .setRequired(true)
        .setMaxLength(150)
        .setStyle(1)
        .setPlaceholder("Dúvida");

      const description = new Discord.TextInputBuilder()
        .setCustomId("description")
        .setLabel("Qual é o a descrição?")
        .setRequired(false)
        .setMaxLength(255)
        .setStyle(2)
        .setPlaceholder("Queria saber mais informações sobre...");

      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(title),
        new Discord.ActionRowBuilder().addComponents(description)
      );

      return interaction.showModal(modal);
    }

    if (
      interaction.isModalSubmit() &&
      interaction.customId === "modal_ticket"
    ) {
      const title = interaction.fields.getTextInputValue("title");
      const description =
        interaction.fields.getTextInputValue("description") || "Nenhum.";
      const categoria = await db2.get(`categoria_ticket_${interaction.guild.id}`)

      const cargo_staff = await db2.get(`cargos_staff_${interaction.guild.id}`)

      const channel = await interaction.guild.channels.create({
        name: `🎫-${interaction.user.username}`,
        type: 0,
        parent: categoria,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["ViewChannel"],
          },
          {
            id: interaction.user.id,
            allow: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "AddReactions",
            ],
          },
          {
            id: cargo_staff,
            allow: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "AddReactions",
            ],
          },
        ],
      });

      db.set(`ticket_${channel.id}`, {
        owner_id: interaction.user.id,
        title,
        description,
      });

      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_success)
            .setDescription(
              `<a:Dancarino:1124475537096708176> | Olá ${interaction.user}, Seu ticket criado com sucesso em ${channel}.`
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("🔗")
              .setLabel("Acessar ticket")
              .setStyle(5)
              .setURL(`${channel.url}`)
          ),
        ],
        ephemeral: true,
      });

      channel.send({
        content: `||${interaction.user} - ${interaction.guild.roles.cache.get(
          cargo_staff
        )}||`,
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setAuthor({
              name: interaction.guild.name,
              iconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setThumbnail(
              `${interaction.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 4096,
              })}`
            )
            .setDescription(
              `> **<:users:1132775070956265603> | Usuario: <@${
                interaction.user.id
              }>** \n> \n> **<:CalendarioLost7v2:1140580692472889425> | Horario: __${moment()
                .utc()
                .tz("America/Sao_Paulo")
                .format(
                  "DD/MM/Y - HH:mm:ss"
                )}__** \n> \n> <a:emoji_9:1124475548115144825>**| Informação:** __Aguarde atenciosamente a equipe atende-lo, você também pode interagir com os botões abaixo caso precise de algo.__ \n> \n> <:information:1140580431801110578>**| Motivo do ticket:** \n> \`\`\`${title}\`\`\` \n> \n> <:prancheta2:1130047888458797146>**| Descrição do ticket** \n> \`\`\`${description}\`\`\``
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("close_ticket")
              .setEmoji("<a:errado1:1124475561545318462>")
              .setLabel("Fechar")
              .setStyle(4),
            new Discord.ButtonBuilder()
              .setCustomId("painel_member")
              .setEmoji("<:users:1132775070956265603>")
              .setLabel("Membro")
              .setStyle(2),
            new Discord.ButtonBuilder()
              .setCustomId("painel_staff")
              .setEmoji("<:staff:1140581291348205618>")
              .setLabel("Staff")
              .setStyle(2),
            new Discord.ButtonBuilder()
              .setCustomId("assumir_ticket")
              .setLabel("Assumir Ticket")
              .setStyle(2)
              .setEmoji("<a:Owner:1131104451776749671>"),
          ),
        ],
      });
    }

    if (interaction.isButton() && interaction.customId === "close_ticket") {
      const ticket = await db2.get(`ticket_${interaction.channel.id}`);

      const logs = await db2.get(`canal_logs_${interaction.guild.id}`)
      const chanel = interaction.guild.channels.cache.get(
        logs
      );
      const user = await interaction.guild.members.cache.get(ticket.owner_id);
      const cargo_staff = await db2.get(`cargos_staff_${interaction.guild.id}`)
      if (
        interaction.user.id !== user.id &&
        !interaction.member.roles.cache.get(cargo_staff)
      )
        return interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_error)
              .setDescription(
                `<a:errado1:1124475561545318462> | Você não tem permissão de utilizar esta opção!`
              ),
          ],
          ephemeral: true,
        });
      const ticketOwnerId = ticketAssumedBy.get(interaction.channel.id);
      const staffass = await interaction.guild.members.fetch(ticketOwnerId); //isso aq seria oq, pegar o id do cara fonte: chat gpt
      //eu tinha tentado isso;-;
      chanel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`Ticket Fechado ${interaction.channel.url}`)
            .setDescription(
              `Ticket Criado por: ${user} (\`${user}\`) \nTicket Fechado por: <@${
                interaction.user.id
              }> (\`${interaction.user.id}\`) \n**__Horario: ${moment()
                .utc()
                .tz("America/Sao_Paulo")
                .format("DD/MM/Y - HH:mm:ss")}___** \nStaff que Assumiu: <@${
                ticketAssumedBy.get(`ticket_${interaction.user.id}`) ?? "Nenhum"
              }> \`(${
                ticketAssumedBy.get(`ticket_${interaction.user.id}`) ?? "Nenhum"
              })\``
            )
            .setColor(config.embeds_color.embed_success),
        ],
      }); 

      interaction.channel.edit({
        name: `closed-${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["ViewChannel"],
          },
          {
            id: user.id,
            deny: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "AddReactions",
            ],
          },
          {
            id: cargo_staff,
            allow: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "AddReactions",
            ],
          },
        ],
      });

      user.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `> <a:cadeado_azul:1130049190303649863> Olá ${interaction.user}, seu ticket ${interaction.channel} foi fechado, caso tenha alguma dúvida entre em contato com a administração!`
            )
            .addFields(
              {
                name: "<:prancheta2:1130047888458797146> Fechado por",
                value: `\`\`\`${interaction.user.tag}\`\`\``,
              },
              {
                name: "<:verde_data:1130048234270769282> Data de fechamento",
                value: `\`\`\`${moment()
                  .utc()
                  .tz("America/Sao_Paulo")
                  .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
              }
            ),
        ],
      });

      interaction.update({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `<a:cadeado_azul:1130049190303649863> O ticket foi fechado por ${interaction.user}.`
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("open_ticket")
              .setEmoji("<a:1111104374039662704:1124475416707616828>")
              .setLabel("Abrir")
              .setStyle(4),
            new Discord.ButtonBuilder()
              .setCustomId("delete_ticket")
              .setEmoji("<:lixeira:1124475580843294730>")
              .setLabel("Deletar")
              .setStyle(4),
            new Discord.ButtonBuilder()
              .setCustomId("painel_member")
              .setEmoji("<:users:1132775070956265603>")
              .setLabel("Membro")
              .setStyle(2)
              .setDisabled(true),
            new Discord.ButtonBuilder()
              .setCustomId("painel_staff")
              .setEmoji("<:staff:1140581291348205618>")
              .setLabel("Staff")
              .setStyle(2)
              .setDisabled(true),
            new Discord.ButtonBuilder()
              .setCustomId("assumir_ticket")
              .setLabel("Assumir Ticket")
              .setStyle(2)
              .setDisabled(true)
              .setEmoji("<a:Owner:1131104451776749671>")
          ),
        ],
      });
    } else if (
      interaction.isButton() &&
      interaction.customId === "open_ticket"
    ) {
      const ticket = await db2.get(`ticket_${interaction.channel.id}`);
      const ticketOwnerId = ticketAssumedBy.get(interaction.channel.id);
      const staffass =
        (await interaction.guild.members.fetch(ticketOwnerId)) || "nenhum";
      const chanel = interaction.guild.channels.cache.get(
        logs
      );
      const user = await interaction.guild.members.cache.get(ticket.owner_id);

      if (
        interaction.user.id !== user.id &&
        !interaction.member.roles.cache.get(cargo_staff)
      )
        return interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_error)
              .setDescription(
                `<a:errado1:1124475561545318462> | Você não tem permissão de utilizar esta opção!`
              ),
          ],
          ephemeral: true,
        });

      chanel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_success)
            .setTitle(`Ticket Aberto ${interaction.channel.url}`)
            .setDescription(
              `Criador do Ticket: ${user} (\`${user}\`) \nQuem Abriu o ticket: <@${
                interaction.user.id
              }> (\`${interaction.user.id}\`) \n**__Horario: ${moment()
                .utc()
                .tz("America/Sao_Paulo")
                .format("DD/MM/Y - HH:mm:ss")}___** \nStaff que Assumiu: <@${
                ticketAssumedBy.get(`ticket_${interaction.user.id}`) ?? "Nenhum"
              }> \`(${
                ticketAssumedBy.get(`ticket_${interaction.user.id}`) ?? "Nenhum"
              })\``
            ),
        ],
      });

      interaction.channel.edit({
        name: `🎫-${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["ViewChannel"],
          },
          {
            id: user.id,
            allow: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "AddReactions",
            ],
          },
          {
            id: cargo_staff,
            allow: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "AddReactions",
            ],
          },
        ],
      });

      user.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `> <:b_cadeadocdf:1130047359259267072> Olá ${interaction.user}, seu ticket ${interaction.channel} foi aberto, caso tenha alguma dúvida entre em contato com a administração!`
            )
            .addFields(
              {
                name: "<:prancheta2:1130047888458797146> aberto por",
                value: `\`\`\`${interaction.user.tag}\`\`\``,
              },
              {
                name: "<:verde_data:1130048234270769282> Data de fechamento",
                value: `\`\`\`${moment()
                  .utc()
                  .tz("America/Sao_Paulo")
                  .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
              }
            ),
        ],
      });

      interaction.update({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `> <:users:1132775070956265603> **| Usuario: <@${user}>** \n> \n> **<:CalendarioLost7v2:1140580692472889425> | Horario: __${moment()
                .utc()
                .tz("America/Sao_Paulo")
                .format(
                  "DD/MM/Y - HH:mm:ss"
                )}__** \n> \n> <a:emoji_9:1124475548115144825>**| Informação:** __Aguarde atenciosamente a equipe atende-lo, você também pode interagir com os botões abaixo caso precise de algo.__ \n> \n> <:b_cadeadocdf:1130047359259267072>**| Ticket Aberto Por: <@${
                interaction.user.id
              }>**`
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("close_ticket")
              .setEmoji("<a:errado1:1124475561545318462>")
              .setLabel("Fechar")
              .setStyle(4),
            new Discord.ButtonBuilder()
              .setCustomId("painel_member")
              .setEmoji("<:users:1132775070956265603>")
              .setLabel("Membro")
              .setStyle(2),
            new Discord.ButtonBuilder()
              .setCustomId("painel_staff")
              .setEmoji("<:staff:1140581291348205618>")
              .setLabel("Staff")
              .setStyle(2),
            new Discord.ButtonBuilder()
              .setCustomId("assumir_ticket")
              .setLabel("Assumir Ticket")
              .setStyle(2)
              .setEmoji("<a:Owner:1131104451776749671>"),
          ),
        ],
      });
    } else if (
      interaction.isButton() &&
      interaction.customId === "painel_member"
    ) {
      const ticket = await db2.get(`ticket_${interaction.channel.id}`);

      const user = await interaction.guild.members.cache.get(ticket.owner_id);

      if (interaction.user.id !== user.id && !interaction.member.roles.cache.get(cargo_staff))
        return interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_error)
              .setDescription(
                `<a:errado1:1124475561545318462> | Você não tem permissão para abrir está função, somente o dono do ticket.`
              ),
          ],
          ephemeral: true,
        });

      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `<a:1111104374039662704:1124475416707616828> | Painel Membro aberto com sucesso, escolha uma das opções abaixo:`
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
              .setCustomId("options_member")
              .setPlaceholder("Escolha uma opção!")
              .addOptions(
                {
                  label: "Criar call",
                  value: `create_call`,
                  emoji: "<:maiscash:1124475584018382948>",
                },
                {
                  label: "Deletar call",
                  value: `delete_call`,
                  emoji: "<:lixeira:1124475580843294730>",
                },
                {
                  label: "Adicionar usuário",
                  value: `add_user`,
                  emoji: "<a:emoji_82:1124475557409722408>",
                },
                {
                  label: "Remover usuário",
                  value: `remove_user`,
                  emoji: "<a:errado1:1124475561545318462>",
                },
                {
                  label: "Salvar logs",
                  value: `transcript`,
                  emoji: "<:emjPastHurley:1124475544357052498>",
                },
                {
                  label: "Notificar Staff",
                  value: `notify_staff`,
                  emoji: "<a:notify:1137562224022528080>",
                }
              )
          ),
        ],
        ephemeral: true,
      });
    } else if (
      interaction.isStringSelectMenu() &&
      interaction.customId === "options_member"
    ) {
      const ticket = await db2.get(`ticket_${interaction.channel.id}`);
      const user = await interaction.guild.members.cache.get(ticket.owner_id);

      const option = interaction.values[0];

      if (option === "create_call") {
        const channel_find = await interaction.guild.channels.cache.find(
          (c) =>
            c.name ===
            `📞-${interaction.user.username.toLowerCase().replace(/ /g, "-")}`
        );

        if (channel_find)
          return interaction.update({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_error)
                .setDescription(
                  `<a:errado1:1124475561545318462> | Você já possui uma call aberta em ${channel_find}`
                ),
            ],
            components: [
              new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setStyle(5)
                  .setLabel("Entrar na call")
                  .setURL(channel_find.url)
              ),
            ],
            ephemeral: true,
          });

        const channel = await interaction.guild.channels.create({
          name: `📞-${interaction.user.username
            .toLowerCase()
            .replace(/ /g, "-")}`,
          type: 2,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel"],
            },
            {
              id: interaction.user.id,
              allow: ["Connect", "ViewChannel"],
            },
            {
              id: cargo_staff,
              allow: ["Connect", "ViewChannel"],
            },
          ],
        });

        interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_success)
              .setDescription(
                `<a:1111104374039662704:1124475416707616828> | Call criada com sucesso em ${channel}`
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(5)
                .setLabel("Entrar na call")
                .setURL(channel.url)
            ),
          ],
          ephemeral: true,
        });
      } else if (option === "delete_call") {
        const channel_find = await interaction.guild.channels.cache.find(
          (c) =>
            c.name ===
            `📞-${interaction.user.username.toLowerCase().replace(/ /g, "-")}`
        );

        if (!channel_find)
          return interaction.update({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_error)
                .setDescription(
                  `<a:errado1:1124475561545318462> | Você não nenhuma possui uma call aberta!`
                ),
            ],
            components: [],
            ephemeral: true,
          });

        await channel_find.delete();

        interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_success)
              .setDescription(
                `<a:1111104374039662704:1124475416707616828> | Call deletada com sucesso!`
              ),
          ],
          components: [],
          ephemeral: true,
        });
      } else if (option === "add_user") {
        interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `👤 | Marce ou envie o ID do usuário que você deseja adicionar!`
              ),
          ],
          components: [],
          ephemeral: true,
        });

        const filter = (i) => i.member.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({
          filter,
        });

        collector.on("collect", async (collect) => {
          const user_content = await collect.content;
          collect.delete();

          const user_collected =
            interaction.guild.members.cache.get(user_content);

          if (!user_collected)
            return interaction.editReply({
              embeds: [
                new Discord.EmbedBuilder()
                  .setColor(config.embeds_color.embed_error)
                  .setDescription(
                    `<a:errado1:1124475561545318462> | Não foi possível encontrar o usuário \`${user_content}\`, tente novamente!`
                  ),
              ],
              components: [],
              ephemeral: true,
            });

          if (
            interaction.channel
              .permissionsFor(user_collected.id)
              .has("ViewChannel")
          )
            return interaction.editReply({
              embeds: [
                new Discord.EmbedBuilder()
                  .setColor(config.embeds_color.embed_error)
                  .setDescription(
                    `<a:errado1:1124475561545318462> | O usuário ${user_collected}(\`${user_collected.id}\`) já possui acesso ao ticket!`
                  ),
              ],
              components: [],
              ephemeral: true,
            });

          await interaction.channel.edit({
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: ["ViewChannel"],
              },
              {
                id: user.id,
                allow: [
                  "ViewChannel",
                  "SendMessages",
                  "AttachFiles",
                  "AddReactions",
                  "ReadMessageHistory",
                ],
              },
              {
                id: user_collected.id,
                allow: [
                  "ViewChannel",
                  "SendMessages",
                  "AttachFiles",
                  "AddReactions",
                  "ReadMessageHistory",
                ],
              },
              {
                id: cargo_staff,
                allow: [
                  "ViewChannel",
                  "SendMessages",
                  "AttachFiles",
                  "AddReactions",
                  "ReadMessageHistory",
                ],
              },
            ],
          });

          interaction.editReply({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_success)
                .setDescription(
                  `<a:1111104374039662704:1124475416707616828> | O usuário ${user_collected}(\`${user_collected.id}\`) foi adicionado com sucesso!`
                ),
            ],
            components: [],
            ephemeral: true,
          });

          collector.stop();
        });
      } else if (option === "notify_staff") {
        const supportRoleId = cargo_staff; // Substitua pelo ID do cargo de suporte
        const supportRole = interaction.guild.roles.cache.get(supportRoleId);
        const embed1 = new Discord.EmbedBuilder()
          .setDescription(
            `O Usuario <@${interaction.user.id}> está esperando no ticket: ${interaction.channel}`
          ) // Adicione a descrição aqui
          .setColor(config.embeds_color.embed_success);
        const components = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setStyle(5)
            .setLabel("Ticket")
            .setURL(interaction.channel.url)
        );

        if (!supportRole) {
          return interaction.reply(
            "Função de suporte não encontrada. Verifique a configuração."
          );
        }

        // Envia a mensagem para cada usuário com o cargo de suporte
        interaction.guild.members.cache
          .filter((member) => member.roles.cache.has(supportRoleId))
          .each(async (member) => {
            try {
              const user = await member.user.createDM();
              await user.send({ embeds: [embed1], components: [components] });
            } catch (error) {
              console.error(
                `Erro ao enviar a mensagem privada para ${member.user.tag}: ${error}`
              );
            }
          });

        await interaction.reply({
          content: ` <a:1111104374039662704:1124475416707616828>|** <@${interaction.user.id}> Os Staffs foram notificado com sucesso**`,
          ephemeral: true, // A resposta será visível somente para o usuário que executou o comando
        });
      } else if (option === "remove_user") {
        interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `👤 | Marce ou envie o ID do usuário que você deseja remover!`
              ),
          ],
          components: [],
          ephemeral: true,
        });

        const filter = (i) => i.member.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({
          filter,
        });

        collector.on("collect", async (collect) => {
          const user_content = await collect.content;
          collect.delete();

          const user_collected =
            interaction.guild.members.cache.get(user_content);

          if (!user_collected)
            return interaction.editReply({
              embeds: [
                new Discord.EmbedBuilder()
                  .setColor(config.embeds_color.embed_error)
                  .setDescription(
                    `<a:errado1:1124475561545318462> | Não foi possível encontrar o usuário \`${user_content}\`, tente novamente!`
                  ),
              ],
              components: [],
              ephemeral: true,
            });

          if (
            !interaction.channel
              .permissionsFor(user_collected.id)
              .has("ViewChannel")
          )
            return interaction.editReply({
              embeds: [
                new Discord.EmbedBuilder()
                  .setColor(config.embeds_color.embed_error)
                  .setDescription(
                    `<a:errado1:1124475561545318462> | O usuário ${user_collected}(\`${user_collected.id}\`) não possui acesso ao ticket!`
                  ),
              ],
              components: [],
              ephemeral: true,
            });

          await interaction.channel.edit({
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: ["ViewChannel"],
              },
              {
                id: user_collected.id,
                denny: ["ViewChannel"],
              },
              {
                id: user.id,
                allow: [
                  "ViewChannel",
                  "SendMessages",
                  "AttachFiles",
                  "AddReactions",
                  "ReadMessageHistory",
                ],
              },
              {
                id: cargo_staff,
                allow: [
                  "ViewChannel",
                  "SendMessages",
                  "AttachFiles",
                  "AddReactions",
                  "ReadMessageHistory",
                ],
              },
            ],
          });

          interaction.editReply({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_success)
                .setDescription(
                  `<a:1111104374039662704:1124475416707616828> | O usuário ${user_collected}(\`${user_collected.id}\`) foi removido com sucesso!`
                ),
            ],
            components: [],
            ephemeral: true,
          });

          collector.stop();
        });
      } else if (option === "transcript") {
        await interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<a:carregando_2:1124475451973316798> Salvando logs do ticket ${interaction.channel}, aguarde um pouco...`
              ),
          ],
          components: [],
          ephemeral: true,
        });

        let output = interaction.channel.messages.cache
          .filter((m) => m.author.bot !== true)
          .map(
            (m) =>
              `${new Date(m.createdTimestamp).toLocaleString("pt-BR")}-${
                m.author.username
              }#${m.author.discriminator}: ${
                m.attachments.size > 0
                  ? m.attachments.first().proxyURL
                  : m.content
              }`
          )
          .reverse()
          .join("\n");

        if (output.length < 1) output = "Nenhuma conversa aqui :)";

        try {
          response = await sourcebin.create({
            title: `Histórico do ticket: ${interaction.channel.name}`,
            description: `Copyright © ${creditos}`,
            files: [
              {
                content: output,
                language: "text",
              },
            ],
          });
        } catch (e) {
          return interaction.editReply({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_error)
                .setDescription(
                  `<a:errado1:1124475561545318462> | Ocorreu um erro ao salvar as logs do ticket ${interaction.channel}, tente novamente!`
                ),
            ],
            components: [],
            ephemeral: true,
          });
        }

        await interaction.user.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setTitle(
                `<:prancheta2:1130047888458797146> Historico de mensagens do ticket`
              )
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
              .addFields(
                {
                  name: "<:F_Canal:1130049735911280640> Canal:",
                  value: `\`\`\`${interaction.channel.name}\`\`\``,
                  inline: false,
                },
                {
                  name: "<:tempoJEFF:1130049930526986301> Protocolo:",
                  value: `\`\`\`${interaction.channel.id}\`\`\``,
                  inline: true,
                },
                {
                  name: "<:verde_data:1130048234270769282> Data de emissão",
                  value: `\`\`\`${moment()
                    .utc()
                    .tz("America/Sao_Paulo")
                    .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
                }
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(5)
                .setEmoji("<:prancheta2:1130047888458797146>")
                .setLabel("Ir para logs")
                .setURL(response.url)
            ),
          ],
        });

        interaction.editReply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<a:1111104374039662704:1124475416707616828> | As logs do ticket ${interaction.channel} foram enviadas em seu privado!`
              ),
          ],
          components: [],
          ephemeral: true,
        });
      }
    } else if (
      interaction.isButton() &&
      interaction.customId === "painel_staff"
    ) {
      if (!interaction.member.roles.cache.get(cargo_staff))
        return interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_error)
              .setDescription(
                `<a:errado1:1124475561545318462> | Você não tem permissão para abrir está função, somente a administração.`
              ),
          ],
          ephemeral: true,
        });

      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `<a:1111104374039662704:1124475416707616828> | Staff aberto com sucesso, escolha uma das opções abaixo:`
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
              .setCustomId("options_staff")
              .setPlaceholder("Escolha uma opção!")
              .addOptions(
                {
                  label: "Salvar logs",
                  value: `transcript`,
                  emoji: "<:emjPastHurley:1124475544357052498>",
                },
                {
                  label: "Deletar ticket",
                  value: `delete_ticket`,
                  emoji: "<a:errado1:1124475561545318462>",
                },
                {
                  label: "notificar usuario",
                  value: `notify_user`,
                  emoji: "<a:emoji_9:1124475548115144825>",
                }
              )
          ),
        ],
        ephemeral: true,
      });
    } else if (
      interaction.isStringSelectMenu() &&
      interaction.customId === "options_staff"
    ) {
      const ticket = await db2.get(`ticket_${interaction.channel.id}`);
      const user = await interaction.guild.members.cache.get(ticket.owner_id);

      const option = interaction.values[0];

      if (option === "notify_user") {
        await user.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<:tempoJEFF:1130049930526986301> Um staff está aguardando sua resposta no ticket ${interaction.channel}`
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(5)
                .setLabel("Ir para ticket")
                .setURL(interaction.channel.url)
            ),
          ],
        });

        interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_success)
              .setDescription(
                `<a:1111104374039662704:1124475416707616828> | O usuário ${user} foi notificado com sucesso!`
              ),
          ],
          components: [],
          ephemeral: true,
        });
      } else if (option === "transcript") {
        await interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<a:carregando_2:1124475451973316798> Salvando logs do ticket ${interaction.channel}, aguarde um pouco...`
              ),
          ],
          components: [],
          ephemeral: true,
        });

        let output = interaction.channel.messages.cache
          .filter((m) => m.author.bot !== true)
          .map(
            (m) =>
              `${new Date(m.createdTimestamp).toLocaleString("pt-BR")}-${
                m.author.username
              }#${m.author.discriminator}: ${
                m.attachments.size > 0
                  ? m.attachments.first().proxyURL
                  : m.content
              }`
          )
          .reverse()
          .join("\n");

        if (output.length < 1) output = "Nenhuma conversa aqui :)";

        try {
          response = await sourcebin.create({
            title: `Histórico do ticket: ${interaction.channel.name}`,
            description: `Copyright © ${creditos}`,
            files: [
              {
                content: output,
                language: "text",
              },
            ],
          });
        } catch (e) {
          return interaction.editReply({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_error)
                .setDescription(
                  `<a:errado1:1124475561545318462> | Ocorreu um erro ao salvar as logs do ticket ${interaction.channel}, tente novamente!`
                ),
            ],
            components: [],
            ephemeral: true,
          });
        }

        await interaction.user.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setTitle(
                `<:prancheta2:1130047888458797146> Historico de mensagens do ticket`
              )
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
              .addFields(
                {
                  name: "<:F_Canal:1130049735911280640> Canal:",
                  value: `\`\`\`${interaction.channel.name}\`\`\``,
                  inline: false,
                },
                {
                  name: "<:tempoJEFF:1130049930526986301> Protocolo:",
                  value: `\`\`\`${interaction.channel.id}\`\`\``,
                  inline: true,
                },
                {
                  name: "<:verde_data:1130048234270769282> Data de emissão",
                  value: `\`\`\`${moment()
                    .utc()
                    .tz("America/Sao_Paulo")
                    .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
                }
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(5)
                .setEmoji("<:prancheta2:1130047888458797146>")
                .setLabel("Ir para logs")
                .setURL(response.url)
            ),
          ],
        });

        interaction.editReply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<a:1111104374039662704:1124475416707616828> | As logs do ticket ${interaction.channel} foram enviadas em seu privado!`
              ),
          ],
          components: [],
          ephemeral: true,
        });
      } else if (option === "delete_ticket") {
        await interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<a:carregando_2:1124475451973316798> | Apagando ticket em 5 segundos...`
              ),
          ],
          components: [],
          ephemeral: true,
        });

        for (let i = 4; i >= 1; i--) {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          interaction.editReply({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_invisible)
                .setDescription(
                  `<a:carregando_2:1124475451973316798> | Apagando ticket em ${i} segundos...`
                ),
            ],
            components: [],
            ephemeral: true,
          });
        }

        let output = interaction.channel.messages.cache
          .filter((m) => m.author.bot !== true)
          .map(
            (m) =>
              `${new Date(m.createdTimestamp).toLocaleString("pt-BR")}-${
                m.author.username
              }#${m.author.discriminator}: ${
                m.attachments.size > 0
                  ? m.attachments.first().proxyURL
                  : m.content
              }`
          )
          .reverse()
          .join("\n");

        if (output.length < 1) output = "Nenhuma conversa aqui :)";

        try {
          response = await sourcebin.create({
            title: `Histórico do ticket: ${interaction.channel.name}`,
            description: `Copyright © ${creditos}`,
            files: [
              {
                content: output,
                language: "text",
              },
            ],
          });
        } catch (e) {
          return interaction.editReply({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(config.embeds_color.embed_error)
                .setDescription(
                  `<a:errado1:1124475561545318462> | Ocorreu um erro ao salvar as logs do ticket ${interaction.channel}, tente novamente!`
                ),
            ],
            components: [],
            ephemeral: true,
          });
        }

        await interaction.user.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `Seu ticket foi deletado por ${interaction.user}, para mais informações entre em contato com a administração!`
              ),
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setTitle(
                `<:prancheta2:1130047888458797146> Historico de mensagens do ticket`
              )
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
              .addFields(
                {
                  name: "<:F_Canal:1130049735911280640> Canal:",
                  value: `\`\`\`${interaction.channel.name}\`\`\``,
                  inline: false,
                },
                {
                  name: "<:tempoJEFF:1130049930526986301> Protocolo:",
                  value: `\`\`\`${interaction.channel.id}\`\`\``,
                  inline: true,
                },
                {
                  name: "<:verde_data:1130048234270769282> Data de emissão",
                  value: `\`\`\`${moment()
                    .utc()
                    .tz("America/Sao_Paulo")
                    .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
                }
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(5)
                .setEmoji("<:prancheta2:1130047888458797146>")
                .setLabel("Ir para logs")
                .setURL(response.url)
            ),
          ],
        });

        const channel_send = interaction.guild.channels.cache.get(
          logs
        );
        await channel_send.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setTitle(
                `<:prancheta2:1130047888458797146> Historico de mensagens do ticket ${interaction.channel.name.replace(
                  "closed-",
                  ""
                )}`
              )
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
              .addFields(
                {
                  name: "<:F_Canal:1130049735911280640> Canal:",
                  value: `\`\`\`${interaction.channel.name}\`\`\``,
                  inline: false,
                },
                {
                  name: "<:tempoJEFF:1130049930526986301> Protocolo:",
                  value: `\`\`\`${interaction.channel.id}\`\`\``,
                  inline: true,
                },
                {
                  name: "<:verde_data:1130048234270769282> Data de emissão",
                  value: `\`\`\`${moment()
                    .utc()
                    .tz("America/Sao_Paulo")
                    .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
                }
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(5)
                .setEmoji("<:prancheta2:1130047888458797146>")
                .setLabel("Ir para logs")
                .setURL(response.url)
            ),
          ],
        });
        interaction.channel.delete();
      }
    }
    if (interaction.isButton() && interaction.customId === "assumir_ticket") {
      const ticket = await db2.get(`ticket_${interaction.channel.id}`);
      const user = await interaction.guild.members.cache.get(ticket.owner_id);
      const chanel = interaction.guild.channels.cache.get(
        logs
      );
      const title = ticket.title;
      const description = ticket.description;
      const staffRoleName = cargo_staff;
      const member = interaction.member;
      const isStaff = member.roles.cache.some(
        (role) => role.id === staffRoleName
      );
      await ticketAssumedBy.set(
        `ticket_${interaction.user.id}`,
        interaction.user.id
      ); // aqui seria ele pegando e trocando o id o cara que vai assumir ticket, não tá na db, fiquei com raiva de fazer pra ele ir pra db'='

      ticketassumir.set(interaction.channel.id, interaction.user.id);


      if (isStaff) {
        await user.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<:tempoJEFF:1130049930526986301> O staff <@${interaction.user.id}> assumiu o ticket ${interaction.channel}`
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setEmoji("🔗")
                .setLabel("Acessar ticket")
                .setStyle(5)
                .setURL(`${interaction.channel.url}`)
            ),
          ],
        });

        interaction.channel.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setDescription(
                `o Staff <@${interaction.user.id}> Assumiu esse ticket! ${user}`
              )
              .setColor(config.embeds_color.embed_invisible),
          ],
        });

        interaction.update({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setAuthor({
                name: interaction.guild.name,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
              })
              .setThumbnail(
                `${interaction.user.displayAvatarURL({
                  dynamic: true,
                  format: "png",
                  size: 4096,
                })}`
              )
              .setDescription(
                `> **<:users:1132775070956265603> | Usuario: <@${
                  interaction.user.id
                }>** \n> \n> **<:CalendarioLost7v2:1140580692472889425> | Horario: __${moment()
                  .utc()
                  .tz("America/Sao_Paulo")
                  .format(
                    "DD/MM/Y - HH:mm:ss"
                  )}__** \n> \n> <a:emoji_9:1124475548115144825>**| Informação:** __Aguarde atenciosamente a equipe atende-lo, você também pode interagir com os botões abaixo caso precise de algo.__ \n> \n> <:information:1140580431801110578>**| Motivo do ticket:** \n> \`\`\`${title}\`\`\` \n> \n> <:prancheta2:1130047888458797146>**| Descrição do ticket** \n> \`\`\`${description}\`\`\`\n> \n> **<a:Owner:1131104451776749671> | Staff que está cuidando:** <@${
                  interaction.user.id
                }>`
              ),
          ],
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("close_ticket")
                .setEmoji("<a:errado1:1124475561545318462>")
                .setLabel("Fechar")
                .setStyle(4),
              new Discord.ButtonBuilder()
                .setCustomId("painel_member")
                .setEmoji("<:users:1132775070956265603>")
                .setLabel("Membro")
                .setStyle(2),
              new Discord.ButtonBuilder()
                .setCustomId("painel_staff")
                .setEmoji("<:staff:1140581291348205618>")
                .setLabel("Staff")
                .setStyle(2),
              new Discord.ButtonBuilder()
                .setCustomId("cham_stafi")
                .setLabel("Chamar Staff")
                .setStyle(2)
                .setEmoji("<a:Owner:1131104451776749671>"),
            ),
          ],
          ephemeral: false,
        });
      }

      chanel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_success)
            .setTitle(`Assumiram o ticket ${interaction.channel.url}`)
            .setDescription(
              `Aberto por: ${user} (\`${user}\`) \nAssumido por: <@${
                interaction.user.id
              }> (\`${interaction.user.id}\`) \n**__Horario: ${moment()
                .utc()
                .tz("America/Sao_Paulo")
                .format("DD/MM/Y - HH:mm:ss")}___** \n`
            ),
        ],
      });
    }
    if (interaction.isButton() && interaction.customId === "cham_stafi") {
      const ticketOwnerId = ticketassumir.get(interaction.channel.id);
      const staffass = await interaction.guild.members.fetch(ticketOwnerId);

      interaction.reply({
        content:`<@${interaction.user.id}>`,
        embeds: [
          new Discord.EmbedBuilder()
          .setColor(config.embeds_color.embed_primary)
          .setDescription(`Staff notificado com Sucesso`)
        ],
        ephemeral: true
      })

      await staffass.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `<:tempoJEFF:1130049930526986301> O usuario <@${interaction.user.id}> está te chamando no ticket: ${interaction.channel}`
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("🔗")
              .setLabel("Acessar ticket")
              .setStyle(5)
              .setURL(`${interaction.channel.url}`)
          ),
        ],
      });
    }
    else if (
      interaction.isButton() &&
      interaction.customId === "delete_ticket"
    ) {
      const ticket = await db2.get(`ticket_${interaction.channel.id}`);
      //ticketAssumedBy.get(`ticket_${interaction.user.id}`) ?? "Nenhum"
      const user = await interaction.guild.members.cache.get(ticket.owner_id);
      

      await interaction.update({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `<a:carregando_2:1124475451973316798> | Apagando ticket em 5 segundos...`
            ),
        ],
        components: [],
      });

      for (let i = 4; i >= 1; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        interaction.editReply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_invisible)
              .setDescription(
                `<a:carregando_2:1124475451973316798> | Apagando ticket em ${i} segundos...`
              ),
          ],
          components: [],
        });
      }

      let output = interaction.channel.messages.cache
        .filter((m) => m.author.bot !== true)
        .map(
          (m) =>
            `${new Date(m.createdTimestamp).toLocaleString("pt-BR")}-${
              m.author.username
            }#${m.author.discriminator}: ${
              m.attachments.size > 0
                ? m.attachments.first().proxyURL
                : m.content
            }`
        )
        .reverse()
        .join("\n");

      if (output.length < 1) output = "Nenhuma conversa aqui :)";

      try {
        response = await sourcebin.create({
          title: `Histórico do ticket: ${interaction.channel.name}`,
          description: `Copyright © ${creditos}`,
          files: [
            {
              content: output,
              language: "text",
            },
          ],
        });
      } catch (e) {
        return interaction.editReply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor(config.embeds_color.embed_error)
              .setDescription(
                `<a:errado1:1124475561545318462> | Ocorreu um erro ao salvar as logs do ticket ${interaction.channel}, tente novamente!`
              ),
          ],
          components: [],
          ephemeral: true,
        });
      }

      await user.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setDescription(
              `Seu ticket foi deletado por ${interaction.user}, para mais informações entre em contato com a administração!`
            ),
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setTitle(
              `<:prancheta2:1130047888458797146> Historico de mensagens do ticket`
            )
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
              {
                name: "<:F_Canal:1130049735911280640> Canal:",
                value: `\`\`\`${interaction.channel.name}\`\`\``,
                inline: false,
              },
              {
                name: "<:tempoJEFF:1130049930526986301> Protocolo:",
                value: `\`\`\`${interaction.channel.id}\`\`\``,
                inline: true,
              },
              {
                name: "<:verde_data:1130048234270769282> Data de emissão",
                value: `\`\`\`${moment()
                  .utc()
                  .tz("America/Sao_Paulo")
                  .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
              }
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setStyle(5)
              .setEmoji("<:prancheta2:1130047888458797146>")
              .setLabel("Ir para logs")
              .setURL(response.url)
          ),
        ],
      });

      const channel_send = interaction.guild.channels.cache.get(
        logs
      );
      await channel_send.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(config.embeds_color.embed_invisible)
            .setTitle(
              `<:prancheta2:1130047888458797146> Historico de mensagens do ticket ${interaction.channel.name.replace(
                "closed-",
                ""
              )}`
            )
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
              {
                name: "<:F_Canal:1130049735911280640> Canal:",
                value: `\`\`\`${interaction.channel.name}\`\`\``,
                inline: false,
              },
              {
                name: "<:tempoJEFF:1130049930526986301> Protocolo:",
                value: `\`\`\`${interaction.channel.id}\`\`\``,
                inline: true,
              },
              {
                name: "<:verde_data:1130048234270769282> Data de emissão",
                value: `\`\`\`${moment()
                  .utc()
                  .tz("America/Sao_Paulo")
                  .format("DD/MM/Y - HH:mm:ss")}\`\`\``,
              }
            ),
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setStyle(5)
              .setEmoji("<:prancheta2:1130047888458797146>")
              .setLabel("Ir para logs")
              .setURL(response.url)
          ),
        ],
      });
      user.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`Avaliação do Serviço`)
            .setDescription(
              `Por Favor, dê sua nota para o nosso Serviço/Atendimento`
            )
            .setColor(config.embeds_color.embed_primary),
        ],
        components: [
          new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setStyle(2)
                .setCustomId("1estrela")
                .setLabel("⭐")
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setStyle(2)
                .setCustomId("2estrela")
                .setLabel("⭐⭐")
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setStyle(2)
                .setCustomId("3estrela")
                .setLabel("⭐⭐⭐")
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setStyle(2)
                .setCustomId("4estrela")
                .setLabel("⭐⭐⭐⭐")
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setStyle(2)
                .setCustomId("5estrela")
                .setLabel("⭐⭐⭐⭐⭐")
            ),
        ],
      });
      interaction.channel.delete();
    }

    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "modal_bot_config_feedback") {

      //const input = interaction.fields.getTextInputValue("id do input da avaliação");
      //if (input === "1") {
      //code
     // }




      interaction.deferUpdate();
      const feed = interaction.fields.getTextInputValue("feedback");
      const chanel = interaction.client.channels.cache.get(
        avalia_ticket
      );
      await chanel.send({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐ 1/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
      });
      interaction.editReply({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐ 1/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
        components: [],
      });
    }

    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "modal_bot_config_feedback2") {
      interaction.deferUpdate();
      const feed = interaction.fields.getTextInputValue("feedback2");
      const chanel = interaction.client.channels.cache.get(
        avalia_ticket
      );
      await chanel.send({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐⭐ 2/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
      });
      interaction.editReply({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐⭐ 2/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
        components: [],
      });
    }


    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "modal_bot_config_feedback3") {
      interaction.deferUpdate();
      const feed = interaction.fields.getTextInputValue("feedback3");
      const chanel = interaction.client.channels.cache.get(
        avalia_ticket
      );
      await chanel.send({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐⭐⭐ 3/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
      });
      interaction.editReply({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐⭐⭐ 3/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
        components: [],
      });
    }

    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "modal_bot_config_feedback4") {
      interaction.deferUpdate();
      const feed = interaction.fields.getTextInputValue("feedback4");
      const chanel = interaction.client.channels.cache.get(
       avalia_ticket
      );
      await chanel.send({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐⭐⭐⭐ 4/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
      });
      interaction.editReply({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐⭐⭐⭐ 4/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
        components: [],
      });
    }



    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "modal_bot_config_feedback5") {
      const feed = interaction.fields.getTextInputValue("feedback5");
      const chanel = interaction.client.channels.cache.get(avalia_ticket);
      await chanel.send({
        embeds: [
            new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
          .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
          .addFields({name: `💘 | Sua Nota`, value: `⭐⭐⭐⭐⭐ 5/5`})
          .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
      ],
      });

      interaction.update({
        embeds: [
          new Discord.EmbedBuilder().setDescription(`😍 | Nova Avaliação`)
        .addFields({name:`👥 | Usuario:`, value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`})          
        .addFields({name: `💘 | Sua Nota`, value: `⭐⭐⭐⭐⭐ 5/5`})
        .addFields({name: `💌 | Seu FeedBack`, value: `${feed}`})    
    ],
        components: [],
      });
    }

  },
};
