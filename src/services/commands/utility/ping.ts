import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, type InteractionDeferReplyOptions } from "discord.js";
import embedstatuscolors from "../../../enums/embedstatus.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Tests the bot's latency with discord servers"),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();

        const sent = await interaction.fetchReply();
        const wsLatency =  interaction.client.ws.ping;
        const apiLatency = sent.createdTimestamp - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
            .setColor(embedstatuscolors.ok)
            .setTitle("Pong!")
            .addFields(
                {name: 'Bot roundtrip', value:`${wsLatency}ms`, inline: true},
                {name: 'Discord API roundtrip', value:`${apiLatency}ms`, inline: true},
            )
            .setFooter({text: "API roundtrip includes discords processing time"})

        await interaction.editReply({content: '', embeds: [embed]});
    }
}
