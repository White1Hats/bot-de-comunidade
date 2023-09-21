const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../../config.json")
const db2 = new QuickDB({ table: "botconfig" });


module.exports = {
    name: "warn",
    description: "setar warn em um membro",
    type: 1,
    options: [{
        name: 'usuário',
        description: 'Mencione um usuário ou forneça um ID.',
        type: 6,
        required: true
    }],
    permissions: {},
  run: async (client, interaction, args) => {
    const cargo_staff = await db2.get(`cargos_staff_${interaction.guild.id}`)
    const permitido = cargo_staff
    const cargo_warn1 = await db2.get(`warn_1_${interaction.guild.id}`)
    const cargo_warn2 = await db2.get(`warn_2_${interaction.guild.id}`)
    const cargo_warn3 = await db2.get(`warn_3_${interaction.guild.id}`)
    const logs2 = await db2.get(`canal_logs_${interaction.guild.id}`)

    if (!interaction.member.roles.cache.some(r =>[`${permitido}`].includes(r.id))) {

            
        const dama = new Discord.EmbedBuilder()
        .setDescription(`Você não tem **permissão** para usar este comando!`)
        .setTimestamp()
        
        return interaction.reply({embeds: [dama],})
}

    const membro = interaction.options.getUser("usuário");

    if (!membro) {
      return interaction.reply('você precisa mencionar um usuário para advertir.');
    }

    const member = interaction.guild.members.cache.get(membro.id);
    if (!member) {
      return interaction.reply('usuário não encontrado no servidor.');
    }

    if (membro.bot) {
      return interaction.reply('bots não podem ser advertidos.');
    }

    if (interaction.user.id === membro.id) {
      return interaction.reply('você não pode dar warn a si mesmo.');
    }


    const cargo1 = cargo_warn1
    const cargo2 = cargo_warn2
    const cargo3 = cargo_warn3

  
    const logs = logs2;

    if (member.roles.cache.has(cargo3)) {
      member.ban({ reason: 'Banido por ultrapassar o limite de advertências.' })
        .then(() => {

          let warnban = new Discord.EmbedBuilder()
          .setTitle("Membro Banido")
          .setFields(
            {
              name: "**Advertido:**\n",
              value: `Usuário: ${membro}\nCargo: <@&${cargo3}>\n`,
              inline: false,
            },
            {
              name: "**Advertido por:**\n",
              value: `${interaction.user}\n\n`,
              inline: false,
            })
            .setFooter({ text: `Usuário ${membro.username} foi banido por ultrapassar o limite de advertências.` })
            interaction.reply({embeds: [warnban]});

          const logChannel = client.channels.cache.get(logs);

          logChannel.send(`Usuário \`${membro.username}\` foi banido por ultrapassar o limite de advertências.`);

          membro.send('Você foi banido por ultrapassar o limite de advertências.').catch((error) => {
            console.error('Erro ao enviar mensagem privada para o usuário:', error);
            });
      
       
        })
        .catch((error) => {
          console.error('Erro ao banir o usuário:', error);
        });
    } else if (member.roles.cache.has(cargo2)) {

      await db.add(`quant_${interaction.user.id}`, 1);	
      const total = await db.get(`quant_${interaction.user.id}`);
         const contador = total;

       member.roles.remove(cargo2)
        .then(() => {
          member.roles.add(cargo3)
            .then(() => {

              let warn3 = new Discord.EmbedBuilder()
              .setTitle("Nova Advertencia")
              .setFields(
                {
                  name: "**Advertido:**\n",
                  value: `Usuário: ${membro}\nCargo: <@&${cargo3}>\n`,
                  inline: false,
                },
                {
                  name: "**Advertido por:**\n",
                  value: `${interaction.user}\n\n`,
                  inline: false,
                })
                .setFooter({ text: `${interaction.user.username} já advertiu ${contador} usuários` })
                interaction.reply({embeds: [warn3]});

              const logChannel = client.channels.cache.get(logs);

              logChannel.send(`Usuário \`${membro.username}\` recebeu uma advertência (Nível 3).`);

              membro.send('Você recebeu uma advertência (Nível 3) no servidor.').catch((error) => {

                console.error('Erro ao enviar mensagem privada para o usuário:', error);
                });
            })
            .catch((error) => {
                interaction.reply(`Você deve configurar os cargos no painel`)
              console.error('Erro ao adicionar o cargo de advertência nível 3 ao usuário:', error);
            });
        })
        .catch((error) => {
          console.error('Erro ao remover o cargo de advertência nível 2 do usuário:', error);
        });

    } else if (member.roles.cache.has(cargo1)) {

      await db.add(`quant_${interaction.user.id}`, 1);	
      const total = await db.get(`quant_${interaction.user.id}`);

         const contador = total;

      member.roles.remove(cargo1)
    
        .then(() => {
        
          member.roles.add(cargo2)
          
            .then(() => {
              let warn2 = new Discord.EmbedBuilder()
              .setTitle("Nova Advertencia")
              .setFields(
                {
                  name: "**Advertido:**\n",
                  value: `Usuário: ${membro}\nCargo: <@&${cargo2}>\n`,
                  inline: false,
                },
                {
                  name: "**Advertido por:**\n",
                  value: `${interaction.user}\n\n`,
                  inline: false,
                })
                .setFooter({ text: `${interaction.user.username} já advertiu ${contador} usuários` })
                interaction.reply({embeds: [warn2]});

              const logChannel = client.channels.cache.get(logs);

              logChannel.send(`Usuário \`${membro.username}\` recebeu uma advertência (Nível 2).`);

              membro.send('Você recebeu uma advertência (Nível 2) no servidor.').catch((error) => {
                console.error('Erro ao enviar mensagem privada para o usuário:', error);
                });
            })
            .catch((error) => {
                interaction.reply(`Você deve configurar os cargos no painel`)
              console.error('Erro ao adicionar o cargo de advertência nível 2 ao usuário:', error);
            });
        })
        .catch((error) => {
          console.error('Erro ao remover o cargo de advertência nível 1 do usuário:', error);
        });
    } else {
 
       await db.add(`quant_${interaction.user.id}`, 1);	
      const total = await db.get(`quant_${interaction.user.id}`);

         const contador = total;
      member.roles.add(cargo1)
        .then(() => {

          let warn1 = new Discord.EmbedBuilder()
          .setTitle("Nova Advertencia")
          .setFields(
            {
              name: "**Advertido:**\n",
              value: `Usuário: ${membro}\nCargo: <@&${cargo1}>\n`,
              inline: false,
            },
            {
              name: "**Advertido por:**\n",
              value: `${interaction.user}\n\n`,
              inline: false,
            })
            .setFooter({ text: `${interaction.user.username} já advertiu ${contador} usuários` })
            interaction.reply({embeds: [warn1]});

          const logChannel = client.channels.cache.get(logs);

          logChannel.send(`Usuário \`${membro.username}\` recebeu uma advertência (Nível 1).`);
          membro.send('Você recebeu uma advertência (Nível 1) no servidor.').catch((error) => {

          console.error('Erro ao enviar mensagem privada para o usuário:', error);
          });
        })
        .catch((error) => {
            interaction.reply(`Você deve configurar os cargos no painel`)
          console.error('Erro ao adicionar o cargo de advertência nível 1 ao usuário:', error);
        });
    }
  }
}

