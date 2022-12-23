import { CommandInteraction } from 'discord.js';
import DiscordBot from '../../structures/client';
import { SlashCommand } from '../../structures/slashcommand';
import whoisConstructor from '../../utils/embeds/info/whois';
import getUserBanner from '../../utils/getUserBanner';
import debugPath from '../../../utils/debugPath';
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
				type: 1,
			},
		],
	},

	run: async (
		client: DiscordBot,
		interaction: CommandInteraction,
		args: any[]
	) => {
		try {
			/* 			const target = interaction.mentions.users.first() || message.author;

			// get user roles
			const user = await message.guild!.members.fetch(target);
			const roles = [
				...user.roles.cache
					.filter((role) => role.name !== '@everyone')
					.values(),
			]
				.sort((a, b) => a.name.length - b.name.length)
				.slice(0, 30)
				.join('\n');

			const guildUser = await message.guild!.members.fetch(target);

			const bannerURL = await getUserBanner(target.id);

			interaction.reply({
				embeds: [
					await whoisConstructor(
						client,
						interaction,
						target,
						guildUser,
						roles,
						bannerURL
					),
				],
			}); */
		} catch (e) {
			LOG(e);
		}
	},
} as SlashCommand;
