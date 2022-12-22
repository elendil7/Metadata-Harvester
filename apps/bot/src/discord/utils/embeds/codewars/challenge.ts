import { EmbedBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';
import { Colour_Codes } from '../../../../utils/constants';
import DiscordBot from '../../../structures/client';
import { Symbols } from '../../../../utils/constants';

const codewarsChallengeConstruction = (
	client: DiscordBot,
	message: Message,
	challenge: any
) => {
	const challengeEmbed = new EmbedBuilder()
		.setColor(Colour_Codes.DARKPURPLE)
		.setTitle(`(${challenge.rank.name}) ${challenge.name}`)
		.setURL(challenge.url)
		// .setDescription('Some description here')
		.setThumbnail(
			'https://pbs.twimg.com/profile_images/1560302876529917956/GZMANt2y_400x400.jpg'
		)
		.addFields(
			{
				name: `${Symbols.USER} Created By:`,
				value: challenge.createdBy.url,
				inline: true,
			},
			{
				name: `${Symbols.CALENDAR} Creation Date:`,
				value: challenge.createdAt,
				inline: true,
			},
			{
				name: `${Symbols.STAR} Stars:`,
				value: '' + challenge.totalStars,
				inline: true,
			},
			{
				name: `${Symbols.LANGUAGE} Languages:`,
				value: challenge.languages.join(', '),
				inline: true,
			},
			{
				name: `${Symbols.WEIGHTLIFTING} Attempts:`,
				value: '' + challenge.totalAttempts,
				inline: true,
			},
			{
				name: `${Symbols.SUCCESS_VARIATION} Completions:`,
				value: '' + challenge.totalCompleted,
				inline: true,
			}
		)
		.setDescription(
			`${challenge.description
				.replace(/<[^>]*>?/gm, '')
				.split('\n')
				.slice(0, 30)
				.join('\n')}\n\n***<<<First 30 lines>>>***\n`
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${message.author.tag} | ID: ${message.author.id}`,
			iconURL: message.author.displayAvatarURL({ forceStatic: false }),
		});

	message.reply({ embeds: [challengeEmbed] });
};

export default codewarsChallengeConstruction;
