import Command from '../../structures/Command';
import { Message } from 'discord.js';
import DiscordBot from '../../structures/DiscordBot';
import {
	helpCategoryEmbedConstructor,
	helpCommandEmbedConstructor,
} from '../../embeds/info/help';
import debugPath from '../../../utils/debugPath';
const LOG = debugPath(__filename);
export default class Help extends Command {
	constructor() {
		super();
		this.name = 'help';
		this.aliases = ['help', 'assist', 'aid', 'sendaid'];
		this.group = 'info';
		this.permissions = [];
		this.description = 'Shows a list of commands';
		this.emoji = '❓';
	}
	public async run(client: DiscordBot, message: Message, args: string[]) {
		try {
			// if any arguments are passed
			if (args.length > 0) {
				// attain and re-sanitize user input
				const userInput = args[0].trim().toLowerCase();

				// try to find the command in the client's command collection from the userInput. Store as variable "command" as either a Command object or undefined
				const command =
					client.commands.get(userInput) ||
					client.commands.find((cmd) =>
						cmd.aliases.includes(userInput)
					);

				// if command exists, send command description embed
				if (command) {
					await message.reply({
						embeds: [
							await helpCommandEmbedConstructor(
								client,
								message,
								command
							),
						],
					});
				}
				// otherwise print that command does not exist
				else {
					await message.reply({
						content: `Command \`${userInput}\` does not exist`,
					});
				}
			}
			// otherwise, send the whole help menu to chat
			else {
				await message.reply({
					embeds: [
						await helpCategoryEmbedConstructor(client, message),
					],
				});
			}
		} catch (e) {
			LOG(e);
		}
	}
}
