import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js'
import { loadCommands } from './services/commands/handler.js'
import { loadEvents } from './services/events/handler.js';
import dotenv from 'dotenv'

dotenv.config();

const discord_token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = await loadCommands();

await loadEvents(client);

client.login(discord_token);
