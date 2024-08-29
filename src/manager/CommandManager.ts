import { Client, Command, Routes } from "discord.js";
import path from "node:path";
import fs from "node:fs";
import { clientId } from "..";
import Logger from "../utils/Logger";

class CommandManager {
    private readonly foldersPath: string;

    constructor() {
        this.foldersPath = path.join(__dirname, "..", "commands");
    }

    public registerCommands(client: Client): void {
        const commandFolders = fs.readdirSync(this.foldersPath);

        Logger.info("Registering commands...");

        for (const folder of commandFolders) {
            const commandsPath = path.join(this.foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command: Command = require(filePath).default;

                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                } else {
                    Logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    }

    public reloadCommands(client: Client) {
        const rest = client.rest;

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
    }
}

export default new CommandManager();