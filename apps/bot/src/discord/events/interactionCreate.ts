import DiscordBot from '../structures/DiscordBot';
import { CommandInteraction } from 'discord.js';
import invalidSlashCommandConstructor from '../embeds/reusable/invalidSlashCommand';
import { Symbols } from '../../utils/constants';
import debugPath from '../../utils/debugPath';
import { slashCommandHandler } from '../handlers/command/handler.slash';
const LOG = debugPath(__filename);

export default {
	name: 'interactionCreate',
	once: false,

	async run(client: DiscordBot, interaction: CommandInteraction) {
		// LOG(interaction.commandName, interaction.command);

		// try to execute command, catch any errors
		try {
			await slashCommandHandler(client, interaction);
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
