import fs from 'fs'
import path from 'path'
import type { Command } from '../../types/command.js'
import { fileURLToPath, pathToFileURL } from 'url'
import { Client, Collection, ChatInputCommandInteraction, Events, MessageFlags } from 'discord.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadCommands(): Promise<Collection<any, any>> {
    const commands = new Collection<string, any>();

    const subfolders = fs
        .readdirSync(__dirname, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

    for (const folder of subfolders) {
        const folderPath = path.join(__dirname, folder);

        const files = fs
            .readdirSync(folderPath)
            .filter((f) => f.endsWith('.js'));

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const url = pathToFileURL(filePath).href;
            const mod = await import(url);
            const command = mod.default ?? mod;

            if (command && 'data' in command && 'execute' in command) {
                await commands.set(command.data.name, command);
            } else {
                console.warn(`[WARNING] ${filePath} missing "data" or "execute" on default export`);
            }
        }
    }

    return commands;
}

export { 
    loadCommands
 };