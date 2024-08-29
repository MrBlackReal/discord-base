import { ChatInputCommandInteraction, Command, SlashCommandBuilder } from 'discord.js';
import { insertParams } from "../../utils/StringUtils";
import localesManager from "../../manager/LocalesManager";

const command: Command = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(action: ChatInputCommandInteraction) {
		const locale = action.locale;
		const translation = localesManager.getLocale(locale);
		const res = insertParams(translation.commands.utility.user, action.user.username, action.user.createdAt.toLocaleDateString(locale));

		await action.reply(res);
	},
};

export default command;
