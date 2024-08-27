import { ChatInputCommandInteraction, Command, SlashCommandBuilder } from 'discord.js';
import { insertParams } from "../../utils/locale";
import localesManager from "../../manager/LocalesManager";

const command: Command = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(action: ChatInputCommandInteraction) {
		const locale = action.locale;
		const translation = localesManager.getTranslation(locale, "commands.utility.user");
		const res = insertParams(translation, action.user.username, action.user.createdTimestamp);

		await action.reply(res);
	},
};

export default command;
