import { Message } from 'discord.js';
import DiscordBot from '../structures/DiscordBot';
import errorConstructor from '../embeds/reusable/errors';
import { commandHandler } from '../handlers/command/handler.command';

export default {
	name: 'messageCreate',
	once: false,

	async run(client: DiscordBot, message: Message) {
		try {
			await commandHandler(client, message);
		} catch (e: any) {
			await errorConstructor(client, message, e);
		}
	},
};
