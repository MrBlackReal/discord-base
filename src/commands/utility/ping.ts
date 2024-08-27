import { ChatInputCommandInteraction, Command, SlashCommandBuilder } from "discord.js";

const command: Command = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    async execute(action: ChatInputCommandInteraction) {
        await action.reply("Pong!");
    }
};

export default command;