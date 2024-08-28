import { Client, Events, GatewayIntentBits, Collection, REST, Routes, Command, Locale } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN || "token";
const clientId = process.env.BOT_ID || "id";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();

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

client.once(Events.ClientReady, c => console.log(`Bot Ready! Logged in as ${c.user.tag}`));

client.on(Events.InteractionCreate, async action => {
    if (!action.isChatInputCommand())
        return;

    const cmd = action.client.commands.get(action.commandName);

    if (!cmd) {
        console.error(`No command matching ${action.commandName} was found.`);
        return;
    }

    try {
        await cmd.execute(action);
    } catch (err) {
        console.error(err);

        if (action.replied || action.deferred) {
            await action.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await action.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(token);