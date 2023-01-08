import { CommandInteraction, EmbedBuilder } from 'discord.js';
import debugPath from '../../../utils/debugPath';
import timeUntilNextAocEmbedConstructor from '../../embeds/adventofcode/timeTillNext';
import errorConstructor from '../../embeds/reusable/errors';
import DiscordBot from '../../structures/DiscordBot';
import { SlashCommand } from '../../structures/SlashCommand';
const LOG = debugPath(__filename);

export default {
	data: {
		name: 'aoc',
		description: 'Advent of code related commands',
		type: 1,
		options: [
			{
				name: 'time',
				description: 'Check how much time until the next AOC',
				type: 1,
				options: [
					{
						name: 'customdate',
						description:
							'The date from which to look for the next AOC event (format: YYYY:MM:DD:HH)',
						type: 3,
						required: false,
					},
				],
			},
		],
	},

	run: async (client: DiscordBot, interaction: CommandInteraction) => {
		try {
			// if argument for slash command is "time"
			if (interaction.options.data[0].name === 'time') {
				// get input value from user for "customdate" option
				const customDateArg =
					interaction.options.get('customdate')?.value;

				// construct embed with optional date argument
				let timeLeftEmbed: EmbedBuilder;
				if (customDateArg) {
					timeLeftEmbed = await timeUntilNextAocEmbedConstructor(
						client,
						interaction,
						String(customDateArg)
					);
				} else {
					timeLeftEmbed = await timeUntilNextAocEmbedConstructor(
						client,
						interaction
					);
				}

				// send complete embed to discord
				interaction.reply({
					embeds: [timeLeftEmbed],
				});
			}
		} catch (e: any) {
			LOG(e);
			errorConstructor(client, interaction, e);
		}
	},
} as SlashCommand;
