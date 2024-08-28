import { Client, GatewayIntentBits, Collection, REST, Routes, Command, EventHandler } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import EventManager from "./manager/EventManager";
import CommandManager from "./manager/CommandManager";

dotenv.config();

const token = process.env.BOT_TOKEN || "token";
export const clientId = process.env.BOT_ID || "id";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();
client.events = new Collection<string, EventHandler>();
client.rest = new REST().setToken(token);

const commandManager = new CommandManager(client);
commandManager.registerCommands();

const eventManager = new EventManager(client);
eventManager.registerEvents();

client.login(token);