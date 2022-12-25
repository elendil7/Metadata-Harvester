import { CommandInteraction } from 'discord.js';
import DiscordBot from '../../structures/client';
import { SlashCommand } from '../../structures/slashcommand';
import pingEmbededConstructor from '../../utils/embeds/info/ping';
import debugPath from '../../../utils/debugPath';
const LOG = debugPath(__filename);

export default {
	data: {
		name: 'ping',
		description: "Gets the bot's ping in ms",
		type: 1,
	},

	run: async (client: DiscordBot, interaction: CommandInteraction) => {
		try {
			interaction.reply({
				embeds: [await pingEmbededConstructor(client, interaction)],
			});
		} catch (e) {
			LOG(e);
		}
	},
} as SlashCommand;
