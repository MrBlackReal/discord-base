import { ChatInputCommandInteraction, Command, SlashCommandBuilder } from "discord.js";
import LocalesManager from "../../manager/LocalesManager";

const command: Command = {
    data: new SlashCommandBuilder().setName("error").setDescription("Causes an artificial error!")
        .addStringOption(option => option.setName("message").setDescription("What error message should it be today sir?").setRequired(true)),
    async execute(action: ChatInputCommandInteraction) {
        if (action.user.id == "377862824564621312" /* This is just my discord uid so nobody besides me can cause an unwanted error */)
            throw new Error(action.options.getString("message", true))

        const locale = LocalesManager.getLocale(action.locale);
        const msg = locale.commands.error;

        if (action.replied || action.deferred) {
            await action.followUp({ content: msg, ephemeral: true });
        } else {
            await action.reply({ content: msg, ephemeral: true });
        }
    }
};

export default command;