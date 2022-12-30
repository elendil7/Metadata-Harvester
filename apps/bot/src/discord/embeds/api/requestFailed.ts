import { EmbedBuilder } from '@discordjs/builders';
import {
	Colour_Codes,
	Status_Codes_Codewars,
	Symbols,
} from '../../../utils/constants';
import { User } from 'discord.js';

export const requestFailedEmbedConstructor = async (
	statusCode: string,
	user: User
) => {
	const issue =
		Status_Codes_Codewars[
			statusCode as keyof typeof Status_Codes_Codewars
		].split(' -- ');

	return new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle(`${Symbols.FAILURE} Request Failed`)
		.addFields(
			{
				name: 'Status code:',
				value: `\`${statusCode}\``,
				inline: false,
			},
			{
				name: 'Error',
				value: `\`${issue[0]}\``,
				inline: false,
			},
			{
				name: 'Issue',
				value: `\`${issue[1]}\``,
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({ forceStatic: false }),
		});
};
