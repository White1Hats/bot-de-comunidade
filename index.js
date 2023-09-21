const Discord = require("discord.js")
const { GatewayIntentBits } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const config = require("./config.json")

// DB
const { QuickDB } = require('quick.db');
global.db = new QuickDB();
//
const { ActivityType } = require("discord.js");
const db2 = new QuickDB({ table: "botconfig" });
const client = new Discord.Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    '32767'
]
    });
const client2 = config.id_entrada_saida.Servidor

    const creditos = db2.get(`creditos_ticket_${client2}`)
    const categoria =  db2.get(`categoria_ticket_${client2}`)
    const thumbnail =  db2.get(`thumbnail_ticket_${client2}`)
    
    const cargo_staff =  db2.get(`cargos_staff_${client2}`)
    const cargo_warn1 =  db2.get(`warn_1_${client2}`)
    const cargo_warn2 =  db2.get(`warn_2_${client2}`)
    const cargo_warn3 =  db2.get(`warn_3_${client2}`)
    const bate_ponto =  db2.get(`bate_ponto_${client2}`)
    const chatgpt =  db2.get(`key_gpt_${client2}`)
    
    const avaliation =  db2.get(`canal_avalia_${client2}`)
    const denuncia =  db2.get(`canal_denuncia_${client2}`)
    const sugestão =  db2.get(`canal_sugestion_${client2}`)
    const avalia_ticket =  db.get(`canal_avalia_ticket_${client2}`)
    const welcome =  db2.get(`canal_welcome_${client2}`)
    const saida =  db2.get(`canal_saida_${client2}`)
    const gpt =  db2.get(`canal_gpt_${client2}`)
    const logs =  db2.get(`canal_logs_${client2}`)



module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)


/*============================= | Ant-Crash | =========================================*/
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});




/*============================= | EVENTOS | =========================================*/
client.on("interactionCreate", require('./events/denuncia').execute);
client.on("interactionCreate", require('./events/sugestion').execute);
client.on("interactionCreate", require('./events/startTicket').execute);
client.on("interactionCreate", require('./events/modal_avalia').execute);
client.on("interactionCreate", require('./events/precos').execute);
client.on("interactionCreate", require('./events/bate-ponto').execute);
client.on("interactionCreate", require('./events/botconfig').execute);


/*============================= | ENTRADA E SAIDA | =========================================*/
client.on('guildMemberAdd', async (member) => {

  const servers = config.id_entrada_saida.Servidor
    if(!servers.includes(member.guild.id)) return;
    const channel = client.channels.cache.get(welcome)
    if(!channel) return;

  const embed = new Discord.EmbedBuilder()            
  .setColor(config.embeds_color.embed_primary)
  
  .setDescription(`Bem vindo(a)❤ ${member}, Atualmente estamos com **${member.guild.memberCount}** membro(s)!`)
  //.setFooter({ text: member.user.tag})

  channel.send({ embeds: [embed] })
  })

  client.on('guildMemberRemove', async (member) => {

    const servers = config.id_entrada_saida.Servidor
    if(!servers.includes(member.guild.id)) return;
    const channel = client.channels.cache.get(saida)
    if(!channel) return;
  
    const embed = new Discord.EmbedBuilder()            
    .setColor(config.embeds_color.embed_primary)
    
    .setDescription(`O Membro: ${member}, saiu do Servidor💔 Agora estamos com **${member.guild.memberCount}** membro(s)!`)
  
    channel.send({ embeds: [embed] })
    });




/*============================= | STATUS RICH PRESENCE | =========================================*/

client.on("ready", () => {
  const messages = [
      `😥 estás com Duvida?`,
      `✅ Abra Ticket para tirar a sua duvida!`,
      `❤ Mont Shop Está de volta!`,
      `/ajuda para ver meus comandos`,
      `❤ eu tenho ${client.users.cache.size} amigos`,
      `👨 estou em ${client.guilds.cache.size} grupos`,
      `👾 Discord Developer: white.hats`
  ]

  var position = 0;

  setInterval(() => client.user.setPresence({
      activities: [{
          name: `${messages[position++ % messages.length]}`,
          type: ActivityType.Playing,
          url: 'https://www.youtube.com/watch?v=a3DxVqMwUAQ'
      }]
  }), 1000 * 10);

  client.user.setStatus("online");
});

/*============================= | CHAT GPT / OPENAI | =========================================*/

const configuration = new Configuration({
  apiKey: config.chat_gpt.key_openai
});

const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== config.chat_gpt.canal_id) return;
  if (message.content.startsWith('!')) return;

  let conversationLog = [
    { role: 'system', content: 'You are a friendly chatbot.' },
  ];

  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    
    prevMessages.forEach((msg) => {
      if (msg.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id == client.user.id) {
        conversationLog.push({
          role: 'assistant',
          content: msg.content,
          name: msg.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }

      if (msg.author.id == message.author.id) {
        conversationLog.push({
          role: 'user',
          content: msg.content,
          name: message.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }
    });

    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        // max_tokens: 256, // limit token usage
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });
    message.reply(result.data.choices[0].message);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});
