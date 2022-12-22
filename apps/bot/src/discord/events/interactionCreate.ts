import DiscordBot from '../structures/client';
import { CommandInteraction } from 'discord.js';
import invalidSlashCommandConstructor from '../utils/embeds/reusable/invalidSlashCommand';
import { Symbols } from '../../utils/constants';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

export default {
	name: 'interactionCreate',
	once: false,

	async run(client: DiscordBot, interaction: CommandInteraction) {
		// LOG(interaction.commandName, interaction.command);

		// try to execute command, catch any errors
		try {
			// Only handle slash command interctions (ignore buttons, etc)
			if (!interaction.isCommand() || !interaction.isChatInputCommand())
				return;

			// get slash command
			const command = client.slashCommands.get(interaction.commandName);

			// if command exists, execute it. Otherwise send error embed (invalid slash command)
			if (command) {
				await command.run(client, interaction);
			} else {
				const invalidSlashCommand =
					await invalidSlashCommandConstructor(client, interaction);
				interaction.reply({ embeds: [invalidSlashCommand] });
			}
		} catch (e) {
			LOG(e);
			const message = `${Symbols.FAILURE} There was an error while executing this command.`;
			if (interaction.replied)
				interaction.followUp({
					content: message,
					ephemeral: true,
				});
			else interaction.reply({ content: message, ephemeral: true });
		}
	},
};
