import { EventHandler, Events } from "discord.js";

const event: EventHandler = {
    event: Events.ClientReady,
    once: false,
    async execute(client) {
        console.log(`Bot Ready! Logged in as ${client.user.tag}`)
    },
};

export default event;