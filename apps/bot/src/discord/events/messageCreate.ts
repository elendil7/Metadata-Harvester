import EventHandler from './register.events';
import { DISCORD_BOT_PREFIX } from '../../utils/constants';
import { Message } from 'discord.js';

export default class MessageCreate extends EventHandler {
	async run(message: Message) {
		const content = message.content;
		// check if prefix correct
		if (message.content[0] === DISCORD_BOT_PREFIX) return;
		// check if command is correct
		const command = this.client.getCommand(
			message.content.replace(this.client.prefix, '')
		);

		if (command) command.run(message);
	}
}
