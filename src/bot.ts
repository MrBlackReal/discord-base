import { Client, Collection, Command, EventHandler, GatewayIntentBits, REST } from "discord.js";
import CommandManager from "./manager/CommandManager";
import EventManager from "./manager/EventManager";
import { token } from ".";
import {Logger} from "./utils/Logger";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.logger = new Logger(`Shard ${(client.shard?.count || 0) - 1}`);
client.commands = new Collection<string, Command>();
client.events = new Collection<string, EventHandler>();
client.rest = new REST().setToken(token);

CommandManager.registerCommands(client);

if (process.argv.includes("load"))
    CommandManager.reloadCommands(client);

EventManager.registerEvents(client);

client.login(token);