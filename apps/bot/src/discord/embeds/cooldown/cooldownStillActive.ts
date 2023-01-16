import { EmbedBuilder } from '@discordjs/builders';
import { User } from 'discord.js';
import { Colour_Codes } from '../../../utils/constants';

export const cooldownStillActiveEmbed = (user: User) => {
	return new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle('You are still on cooldown.')
		.setURL('https://en.wiktionary.org/wiki/cooldown')
		.setThumbnail(user.displayAvatarURL())
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			}
		)
		.addFields({
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		})
		.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag || user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({
				forceStatic: false,
			}),
		});
};
