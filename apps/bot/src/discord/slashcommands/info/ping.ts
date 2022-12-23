import { CommandInteraction } from 'discord.js';
import DiscordBot from '../../structures/client';
import { SlashCommand } from '../../structures/slashcommand';
import pingEmbededConstructor from '../../utils/embeds/info/ping';

export default {
	data: {
		name: 'ping',
		description: 'Gets bot ping in ms.',
		type: 1,
	},

	run: async (
		client: DiscordBot,
		interaction: CommandInteraction,
		args: any[]
	) => {
		interaction.reply({
			embeds: [await pingEmbededConstructor(client, interaction)],
		});
	},
} as SlashCommand;
