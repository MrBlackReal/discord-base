import { ShardingManager } from "discord.js";
import dotenv from "dotenv";
import Logger from "./utils/Logger";
import WebServerManager from "./manager/WebServerManager";
import path from "node:path";

dotenv.config();

export const token: string = process.env.BOT_TOKEN || "token";
export const clientId: string = process.env.BOT_ID || "id";
export const port: number = Number(process.env.PORT) || 1337;

export const manager: ShardingManager = new ShardingManager(path.join(__dirname, "bot.js"), {
	shardArgs: ['--ansi', '--color'],
    token: token,
    totalShards: "auto"
});

WebServerManager.start(manager, port);

manager.on("shardCreate", shard => Logger.info("Launched new Shard with id {0}", shard.id));

manager.spawn().catch(err => Logger.error("Error while Sharding: {0}", err.statusText));