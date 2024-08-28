import { EventHandler, Events } from "discord.js";

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
    
            if (action.replied || action.deferred) {
                await action.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await action.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};

export default event;