import {
	ApplicationCommandOptionType,
	CommandInteraction,
	Role,
} from 'discord.js';
import DiscordBot from '../../structures/client';
import { SlashCommand } from '../../structures/slashcommand';
import whoisConstructor from '../../utils/embeds/info/whois';
import debugPath from '../../../utils/debugPath';
import errorConstructor from '../../utils/embeds/reusable/errors';
const LOG = debugPath(__filename);

export default {
	data: {
		// main command (arg 1)
		name: 'whois',
		description: 'Get basic info about selected user.',
		type: 1,
		// subcommands!
		options: [
			{
				name: 'user',
				description: 'Mention the user.',
				type: 6,
				required: false,
			},
		],
	},

	run: async (
		client: DiscordBot,
		interaction: CommandInteraction,
		args: any[]
	) => {
		try {
			const target =
				interaction.options.getUser('user') || interaction.user;

			const guild = client.guilds.cache.get(String(interaction.guildId));

			const guildMember = await guild!.members.fetch({
				user: target,
				withPresences: true,
			});

			const roles = [
				...guildMember.roles.cache
					.filter((role) => role.name !== '@everyone')
					.values(),
			]
				.sort((a, b) => a.name.length - b.name.length)
				.slice(0, 30)
				.join(', ');

			const embed1 = await whoisConstructor(
				client,
				interaction,
				target,
				guildMember,
				roles
			);

			interaction.reply({ embeds: [embed1] });
		} catch (e: any) {
			LOG(e);
			errorConstructor(client, interaction, e);
		}
	},
} as SlashCommand;
