import { Client, EventHandler } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import Logger from "../utils/Logger";

class EventManager {
    public readonly eventFolder: string;

    constructor() {
        this.eventFolder = path.join(__dirname, "..", "events");
    }

    public registerEvents(client: Client): void {
        const eventFiles = fs.readdirSync(this.eventFolder).filter(file => file.endsWith(".js"));

        Logger.info("Registering events...");

        for (const file of eventFiles) {
            const filePath = path.join(this.eventFolder, file);
            const eventHandler: EventHandler = require(filePath).default;

            if ('event' in eventHandler && 'once' in eventHandler && 'execute' in eventHandler) {
                client.events.set(eventHandler.event, eventHandler);

                if (eventHandler.once) {
                    client.once(eventHandler.event, (...args) => eventHandler.execute(...args));
                }
                else {
                    client.on(eventHandler.event, (...args) => eventHandler.execute(...args));
                }
            } else {
                Logger.warn(`[WARNING] The event at ${filePath} is missing a required property.`);
            }
        }
    }
};

export default new EventManager();