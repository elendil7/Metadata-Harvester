import { CommandInteraction, Message } from 'discord.js';
import {
	messageORinteraction,
	userORclientuser,
} from '../../../utils/constants';
import DiscordBot from '../../structures/client';

// get User
export const getUser = async (
	client: DiscordBot,
	structure: messageORinteraction
) => {
	let user: userORclientuser = client.user!;
	if (structure instanceof Message) {
		user = structure.author;
	} else if (structure instanceof CommandInteraction) {
		user = structure.user;
	}
	return user;
};
