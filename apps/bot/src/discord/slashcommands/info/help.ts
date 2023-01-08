import { CommandInteraction } from 'discord.js';
import DiscordBot from '../../structures/DiscordBot';
import { SlashCommand } from '../../structures/SlashCommand';
import debugPath from '../../../utils/debugPath';
import {
	helpCategoryEmbedConstructor,
	helpCommandEmbedConstructor,
} from '../../embeds/info/help';
const LOG = debugPath(__filename);

const helpSlashCommand = {
	data: {
		name: 'help',
		description: 'Shows a list of commands',
		type: 1,
		options: [
			{
				name: 'command',
				description: 'The command to get information about',
				type: 3,
				choices: [
					{
						name: 'choice name',
						value: 'choice value',
					},
				],
			},
		],
	},
	run: async (client: DiscordBot, interaction: CommandInteraction) => {
		try {
			const command = await client.getCommand(
				String(interaction.options.get('command')?.value)
			);

			if (command) {
				interaction.reply({
					embeds: [
						await helpCommandEmbedConstructor(
							client,
							interaction,
							command
						),
					],
				});
			} else {
				interaction.reply({
					embeds: [
						await helpCategoryEmbedConstructor(client, interaction),
					],
				});
			}
		} catch (e) {
			LOG(e);
		}
	},
} as SlashCommand;

export default helpSlashCommand;
