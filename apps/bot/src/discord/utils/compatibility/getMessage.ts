import { CommandInteraction, Message } from 'discord.js';
import { messageORinteraction } from '../../../utils/constants';
import DiscordBot from '../../structures/DiscordBot';

// get Message
export const getMessage = async (
	client: DiscordBot,
	structure: messageORinteraction
) => {
	let message = 'Undefined Message';
	if (structure instanceof Message) {
		message = structure.content;
	} else if (structure instanceof CommandInteraction) {
		message = structure.options.data.toString();
	}
	return message;
};
