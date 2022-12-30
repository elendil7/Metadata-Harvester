import { EmbedBuilder } from '@discordjs/builders';
import { User } from 'discord.js';
import CodewarsUserModel from '../../../api/codewars/v1/models/user/CodewarsUserModel';
import { Command_Group_Colours, PNG_Links } from '../../../utils/constants';

export const codewarsUserEmbedConstructor = async (
	codewarsUser: CodewarsUserModel,
	user: User
) => {
	const embed = new EmbedBuilder()
		.setColor(Command_Group_Colours.CODEWARS_COLOUR)
		.setTitle(`Codewars User: ${codewarsUser.username}`)
		.setThumbnail(PNG_Links.CODEWARS_LOGO)
		// create embed fields for all properties of codewarsUser
		.addFields(
			{
				name: 'Name',
				value: codewarsUser.name,
				inline: true,
			},
			{
				name: 'Honor',
				value: '' + codewarsUser.honor,
				inline: true,
			},
			{
				name: 'Leaderboard Position',
				value: String(codewarsUser.leaderboardPosition) || 'N/A',
				inline: true,
			},
			{
				name: 'Clan',
				value: codewarsUser.clan,
				inline: true,
			},
			{
				name: 'Ranks',
				value: `#${codewarsUser.ranks.overall.rank}, @${codewarsUser.ranks.overall.name}`,
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

	if (codewarsUser.skills.length > 0) {
		embed.addFields({
			name: 'Skills',
			value: codewarsUser.skills.join(', '),
			inline: true,
		});
	}

	return embed;
};
