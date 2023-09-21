const { ChannelType } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'server',
    description: 'sub comando',
    options: [
        {
            name: 'info',
            description: 'mostre informação do servidor',
            type: Discord.ApplicationCommandOptionType.Subcommand,
        },
    ],
    run: async(client, interaction) => {

        switch (interaction.options.getSubcommand()) {

            case 'info': {  

                const owner_id = interaction.guild.ownerId;
                const owner = interaction.guild.members.cache.get(owner_id);    
                const members = interaction.guild.memberCount;
                const roles = interaction.guild.roles.cache.size;
                const channels = interaction.guild.channels.cache.size;
                const server = interaction.guild;
                const text = interaction.guild.channels.cache.filter(a => a.type === ChannelType.GuildText).size;
                const voice = interaction.guild.channels.cache.filter(a => a.type === ChannelType.GuildVoice).size;
                const category = interaction.guild.channels.cache.filter(a => a.type === ChannelType.GuildCategory).size;
                const forum = interaction.guild.channels.cache.filter(a => a.type === ChannelType.GuildForum).size;
                const staticEmoji = interaction.guild.emojis.cache.filter((e) => !e.animated).size;
                const animatedEmoji = interaction.guild.emojis.cache.filter((e) => e.animated ).size;
                const emojis = interaction.guild.emojis.cache.size;
                const boosts = interaction.guild.premiumSubscriptionCount;
                const createdDate = interaction.guild.createdAt.toLocaleDateString("eng");
                const serverIcon = interaction.guild.iconURL({ dynamic: true })
                const serverRegion = interaction.guildLocale;
                const verfLevel = interaction.guild.verificationLevel;
                const levelBoost = server.premiumSubscriptionCount;
                
                if (!serverIcon) { serverIcon = '' }

                    
                const EmbedInfo = new Discord.EmbedBuilder()
                .setThumbnail(`${server.iconURL({ dynamic: true })}`)
                .setTitle(`${server.name}`)
                .setDescription(`**ID**: ${server.id}\n\n**Owner**: ${owner}\n\n**Created Date**: ${createdDate}\n`)
                .addFields(
                    {
                        name: 'Region',
                        value: `${serverRegion}`,
                        inline: true
                    },
                    {
                        name: 'Verification',
                        value: `level ${verfLevel}`,
                        inline: true
                    },
                    {
                        name: 'Member Count',
                        value: `${members}`,
                        inline: true
                    },
                    {
                        name: 'Boosts',
                        value: `level ${levelBoost}\n${boosts} boosts`,
                        inline: true
                    },
                    {
                        name: 'Roles',
                        value: `${roles} roles`,
                        inline: true
                    },
                    {
                        name: 'Channels',
                        value: `Textual: ${text}\nVoice: ${voice}\nCategory: ${category}\nForum: ${forum}\nTotal: ${channels}`,
                        inline: true
                    },
                    {
                        name: 'Emojis',
                        value: `Static: ${staticEmoji}\nAnimated: ${animatedEmoji}\nTotal: ${emojis}`,
                        inline: true
                    }
                );

                interaction.reply({ embeds: [EmbedInfo] })

                break;
            }

        }

    }
}