import { CommandInteraction, Guild, Message } from 'discord.js';
import { messageORinteraction } from '../../../utils/constants';
import DiscordBot from '../../structures/client';

export const getGuild = async (
	client: DiscordBot,
	structure: messageORinteraction
) => {
	let guild: Guild | null | undefined;
	if (structure instanceof Message) {
		guild = structure.guild;
	} else if (structure instanceof CommandInteraction) {
		guild = client.guilds.cache.get(String(structure.guildId));
	}
	return guild;
};
