import { SlashCommandBuilder, Command, ChatInputCommandInteraction } from 'discord.js';
import { insertParams } from "../../utils/StringUtils";
import localesManager from "../../manager/LocalesManager";

const command: Command = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(action: ChatInputCommandInteraction) {
		const locale = action.locale;
		const translation = localesManager.getLocale(locale);
		const res = insertParams(translation.commands.utility.server, action.guild?.name, action.guild?.memberCount);

		await action.reply(res);
	}
};

export default command;