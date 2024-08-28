import { Client, EventHandler, Events } from "discord.js";
import { log } from "console";
import fs from "node:fs";
import path from "node:path";

class EventManager {
    public readonly eventFolder: string;

    constructor() {
        this.eventFolder = path.join(__dirname, "..", "events");
    }

    public registerEvents(client: Client): void {
        const eventFiles = fs.readdirSync(this.eventFolder).filter(file => file.endsWith(".js"));

        for (const file of eventFiles) {
            const filePath = path.join(this.eventFolder, file);
            const eventHandler: EventHandler = require(filePath).default;

            if ('event' in eventHandler && 'once' in eventHandler && 'execute' in eventHandler) {
                client.events.set(eventHandler.event, eventHandler);
                
                log("Registering event handler for " + eventHandler.event + "...");

                if (eventHandler.once) client.once(eventHandler.event, async (...args) => await eventHandler.execute(...args));
                else client.on(eventHandler.event, async (...args) => await eventHandler.execute(...args));
            } else {
                console.log(`[WARNING] The event at ${filePath} is missing a required property.`);
            }
        }
    }
};

export default EventManager;