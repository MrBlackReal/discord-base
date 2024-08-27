import { SlashCommandBuilder, ChatInputCommandInteraction, Command } from 'discord.js';
import { insertParams } from "../../utils/locale";
import localesManager from "../../manager/LocalesManager";

const command: Command = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(action: ChatInputCommandInteraction) {
		const locale = action.locale;
		const translation = localesManager.getTranslation(locale, "commands.utility.server");
		const res = insertParams(translation, action.guild?.name, action.guild?.memberCount);

		await action.reply(res);
	},
};

export default command;