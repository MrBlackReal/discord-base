import { log } from "console";
import { EventHandler, Events } from "discord.js";

const event: EventHandler = {
    event: Events.ClientReady,
    once: true,
    execute(client) {
        log(`Bot Ready! Logged in as ${client.user.tag}`)
    },
};

export default event;