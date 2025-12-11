import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, type InteractionDeferReplyOptions } from "discord.js";
import embedstatuscolors from "../../../enums/embedstatus.js";

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription("Verifies your roblox account with your discord account"),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();
        const robloxURL = "http://localhost:8000/roblox"

        const embed = new EmbedBuilder()
            .setColor(embedstatuscolors.ok)
            .setTitle("Verify Roblox account")
            .addFields(
                {name: 'Link: ', value: `${robloxURL}`, inline: true}
            )
            .setFooter({text: "No personal data is stored beyond your roblox username"});

        await interaction.editReply({content: '', embeds: [embed]});
    }
}
