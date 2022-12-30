import { EmbedBuilder } from '@discordjs/builders';
import { User } from 'discord.js';
import CodewarsUserModel from '../../../api/codewars/v1/models/user/CodewarsUserModel';
import {
	Command_Group_Colours,
	PNG_Links,
	Symbols,
} from '../../../utils/constants';

export const codewarsUserEmbedConstructor = async (
	codewarsUser: CodewarsUserModel,
	user: User
) => {
	const embed = new EmbedBuilder()
		.setColor(Command_Group_Colours.CODEWARS_COLOUR)
		.setTitle(
			`${Symbols.BOAR} Codewars User: ${codewarsUser.username} ${Symbols.DUCK}`
		)
		.setThumbnail(PNG_Links.CODEWARS_LOGO)
		.addFields(
			{
				name: 'Name',
				value: `\`${codewarsUser.name || 'N/A'}\``,
				inline: true,
			},
			{
				name: 'Honor',
				value: `\`${'' + codewarsUser.honor || 'N/A'}\``,
				inline: true,
			},
			{
				name: 'Leaderboard Position',
				value: `\`${
					codewarsUser.leaderboardPosition
						? '#' + codewarsUser.leaderboardPosition
						: 'N/A'
				}\``,
				inline: true,
			},
			{
				name: 'Clan',
				value: `\`${codewarsUser.clan || 'N/A'}\``,
				inline: true,
			},
			{
				name: 'Ranks',
				value: `\`${codewarsUser.ranks.overall.name || 'N/A'}\``,
				inline: true,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag || user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({
				forceStatic: false,
			}),
		});

	if (codewarsUser.skills) {
		embed.addFields({
			name: 'Skills',
			value:
				codewarsUser.skills.map((v) => `\`${v}\``).join(', ') ||
				'`N/A`',
			inline: true,
		});
	}

	return embed;
};
