import Command from '../../structures/command';
import { Message } from 'discord.js';
import DiscordBot from '../../structures/client';
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
			const command = await client.getCommand(args[1]);

			// if command exists, send command description embed
			if (command) {
				message.reply({
					embeds: [
						await helpCommandEmbedConstructor(
							client,
							message,
							command
						),
					],
				});
			}
			// otherwise, send the whole help menu to chat
			else {
				message.reply({
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
