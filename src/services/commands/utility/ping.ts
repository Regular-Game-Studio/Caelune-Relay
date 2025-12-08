import { ChatInputCommandInteraction, SlashCommandBuilder, type InteractionDeferReplyOptions } from "discord.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Tests the bot's latency with discord servers"),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply(
            `Pong!\nRoundtrip Latency ${Date.now() - interaction.createdTimestamp}ms\nWebsocket latency ${interaction.client.ws.ping}ms`
        )
    }
}
