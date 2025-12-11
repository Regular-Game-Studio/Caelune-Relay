import { Client, Collection, SlashCommandBuilder } from "discord.js"

declare module "discord.js" {
    interface Client {
        cooldowns: Collection<string, unknown>
        commands: Collection<string, unknown>
    }
}