import { CommandInteraction } from 'discord.js';
import debugPath from '../../utils/debugPath';
import invalidSlashCommandConstructor from '../embeds/reusable/invalidSlashCommand';
import DiscordBot from '../structures/client';
const LOG = debugPath(__filename);

export async function slashCommandHandler(
	client: DiscordBot,
	interaction: CommandInteraction
) {
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
			const invalidSlashCommand = await invalidSlashCommandConstructor(
				client,
				interaction
			);
			interaction.reply({ embeds: [invalidSlashCommand] });
		}
	} catch (e) {
		LOG(e);
	}
}
