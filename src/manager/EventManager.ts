import { Client, EventHandler, Events } from "discord.js";
import { log } from "console";
import fs from "node:fs";
import path from "node:path";

class EventManager {
    private readonly client: Client;
    public readonly eventFolder: string;

    constructor(client: Client) {
        this.client = client;
        this.eventFolder = path.join(__dirname, "..", "events");
    }

    public registerEvents(): void {
        const eventFiles = fs.readdirSync(this.eventFolder).filter(file => file.endsWith(".js"));

        log("Registering events...");

        for (const file of eventFiles) {
            const filePath = path.join(this.eventFolder, file);
            const eventHandler: EventHandler = require(filePath).default;

            if ('event' in eventHandler && 'once' in eventHandler && 'execute' in eventHandler) {
                this.client.events.set(eventHandler.event, eventHandler);

                if (eventHandler.once) this.client.once(eventHandler.event, (...args) => eventHandler.execute(...args));
                else this.client.on(eventHandler.event, (...args) => eventHandler.execute(...args));
            } else {
                console.log(`[WARNING] The event at ${filePath} is missing a required property.`);
            }
        }
    }
};

export default EventManager;