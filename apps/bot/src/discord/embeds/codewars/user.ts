import { EmbedBuilder } from '@discordjs/builders';
import { User } from 'discord.js';
import CodewarsUserModel from '../../../api/codewars/v1/models/user/CodewarsUserModel';
import { fetchUserImage } from '../../../services/puppeteer/codewars/fetchUserImage';
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
		.addFields(
			{
				name: 'Username',
				value: `\`${codewarsUser.username || 'N/A'}\``,
				inline: true,
			},
			{
				name: 'Name',
				value: `\`${codewarsUser.name || 'N/A'}\``,
				inline: true,
			},
			{
				name: 'ID',
				value: `\`${codewarsUser.id || 'N/A'}\``,
				inline: true,
			},
			{
				name: 'Honor',
				value: `\`${'' + codewarsUser.honor || 'N/A'}\``,
				inline: true,
			},
			{
				name: 'Leaderboard',
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
				name: 'Rank',
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

	// get user's profile picture. If image exists, set it as the embed's thumbnail image. Else user default avatar, or codewars image
	const userIconURL = await fetchUserImage(codewarsUser.username);
	if (userIconURL) embed.setThumbnail(userIconURL || PNG_Links.CODEWARS_LOGO);

	return embed;
};
