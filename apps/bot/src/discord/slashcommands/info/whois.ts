import { CommandInteraction } from 'discord.js';
import DiscordBot from '../../structures/client';
import { SlashCommand } from '../../structures/slashcommand';
import whoisConstructor from '../../embeds/info/whois';
import debugPath from '../../../utils/debugPath';
import errorConstructor from '../../embeds/reusable/errors';
import { getGuildMember } from '../../utils/methods/getGuildMember';
import { getGuild } from '../../utils/compatibility/getGuild';
import { getUserRoles } from '../../utils/methods/getUserRoles';
const LOG = debugPath(__filename);

export default {
	data: {
		// main command (arg 1)
		name: 'whois',
		description: 'Get basic info about selected user',
		type: 1,
		// subcommands!
		options: [
			{
				name: 'user',
				description: 'The user to get basic info about',
				type: 6,
				required: false,
			},
		],
	},

	run: async (client: DiscordBot, interaction: CommandInteraction) => {
		try {
			const target =
				interaction.options.getUser('user') || interaction.user;

			const guild = await getGuild(client, interaction);

			const guildMember = await getGuildMember(target, guild!);

			const roles = await getUserRoles(guildMember).then((res) =>
				res
					.sort((a, b) => a.name.length - b.name.length)
					.slice(0, 30)
					.join(', ')
			);

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
