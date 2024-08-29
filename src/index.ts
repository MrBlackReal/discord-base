import { Client, GatewayIntentBits, Collection, REST, Command, EventHandler } from "discord.js";
import dotenv from "dotenv";
import EventManager from "./manager/EventManager";
import CommandManager from "./manager/CommandManager";
import WebServerManager from "./manager/WebServerManager";

dotenv.config();

const token = process.env.BOT_TOKEN || "token";
export const clientId = process.env.BOT_ID || "id";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();
client.events = new Collection<string, EventHandler>();
client.rest = new REST().setToken(token);

CommandManager.registerCommands(client);
EventManager.registerEvents(client);
WebServerManager.start(client);

client.login(token);