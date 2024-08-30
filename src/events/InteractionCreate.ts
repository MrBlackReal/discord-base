import { EventHandler, Events } from "discord.js";
import LocalesManager from "../manager/LocalesManager";

const event: EventHandler = {
    event: Events.InteractionCreate,
    once: false,
    async execute(action) {
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
    
            const locale = LocalesManager.getLocale(action.locale);
            const msg = locale.commands.error;

            if (action.replied || action.deferred) {
                await action.followUp({ content: msg, ephemeral: true });
            } else {
                await action.reply({ content: msg, ephemeral: true });
            }
        }
    },
};

export default event;