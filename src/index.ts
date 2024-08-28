import { Client, Events, GatewayIntentBits, Collection, REST, Routes, Command, Locale, EventHandler } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import EventManager from "./manager/EventManager";

dotenv.config();

const token = process.env.BOT_TOKEN || "token";
const clientId = process.env.BOT_ID || "id";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();
client.events = new Collection<string, EventHandler>();

const eventManager = new EventManager();
eventManager.registerEvents(client);

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command: Command = require(filePath).default;

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    const commands: any = [];

    client.commands.forEach(cmd => commands.push(cmd.data.toJSON()));

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data: any = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

client.login(token);