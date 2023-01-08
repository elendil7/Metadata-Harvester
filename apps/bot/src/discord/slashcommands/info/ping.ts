import { CommandInteraction } from 'discord.js';
import DiscordBot from '../../structures/DiscordBot';
import { SlashCommand } from '../../structures/SlashCommand';
import pingEmbededConstructor from '../../embeds/info/ping';
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
