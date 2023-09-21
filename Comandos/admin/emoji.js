const { PermissionFlagsBits, ApplicationCommandOptionType, parseEmoji } = require("discord.js");

module.exports = {
    name: "addemoji",
    description: "adicionar emoji",
    default_member_permissions: [PermissionFlagsBits.ManageChannels],
    options: [
        {
            name: "emojis",
            description: "adicione 1 ou mais emojis",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        await interaction.deferReply()

        const Emojis = interaction.options.getString("emojis");
        const emojiRegex = /<a?:(.*?):(\d+)>/g;
        const emojiMatches = Emojis.match(emojiRegex);

        if (!emojiMatches) {
            return interaction.editReply({ content: "Emoji não encontrado", ephemeral: true });
        }

        const addedEmojis = [];

        for (const emojiString of emojiMatches) {
            const parsed = parseEmoji(emojiString);
            const link = `https://cdn.discordapp.com/emojis/${parsed.id}${parsed.animated ? '.gif' : '.png'}`;

            try {
                const emoji = await interaction.guild.emojis.create({ attachment: link, name: parsed.name });
                addedEmojis.push(emoji);
            } catch (error) {
                console.error(error);
                return interaction.editReply({ content: `Erro ao adicionar emoji ${parsed.name}.`, ephemeral: true });
            }
        }

        if (addedEmojis.length > 1) {
            const addedEmojiNames = addedEmojis.map(emoji => `${emoji}`).join(" ");
            await interaction.editReply({ content: `Emoji Adicionado: ${addedEmojiNames}`, });
        } else if (addedEmojis.length === 1) {
            await interaction.editReply({ content: `${addedEmojis} | Emoji adicionado com Sucesso!`, });
        }

    }
}