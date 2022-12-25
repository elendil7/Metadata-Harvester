import { CommandInteraction } from 'discord.js';
import DiscordBot from '../../structures/client';
import { SlashCommand } from '../../structures/slashcommand';
import debugPath from '../../../utils/debugPath';
const LOG = debugPath(__filename);

export default {
	data: {
		name: 'help',
		description: 'Shows a list of commands',
		type: 1,
		options: [
			{
				name: 'command',
				description: 'The command to get information about',
				type: 3,
				required: false,
			},
		],
	},
	run: async (client: DiscordBot, interaction: CommandInteraction) => {
		try {
			const command = interaction.options.get('command')?.value;
		} catch (e) {
			LOG(e);
		}
	},
} as SlashCommand;
