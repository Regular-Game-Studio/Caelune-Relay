import { REST, Routes } from 'discord.js'
import fs from 'fs'
import { pathToFileURL, fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
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
            commands.push(command.data.toJSON());
        } else {
            console.warn(`[WARNING] ${filePath} missing "data" or "execute" on default export`);
        }
    }
}

const rest = new REST().setToken(<string>process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`[INFO] Started refreshing ${commands.length} application (/) commands.`);

        let data: any
        if (<string>process.env.GLOBAL_COMMANDS == "false") {
            data = await rest.put(Routes.applicationGuildCommands(<string>process.env.CLIENT_ID, <string>process.env.GUILD_ID), { body: commands });
        } else if (<string>process.env.GLOBAL_COMMANDS == "true") {
            data = await rest.put(Routes.applicationCommands(<string>process.env.CLIENT_ID), { body: commands });
        }

        console.log(`[INFO] Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(`[ERROR] Failed to load deploy slash commands ${error}`);
    }
})();
