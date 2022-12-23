import { EmbedBuilder } from '@discordjs/builders';
import { GuildMember, Message, User } from 'discord.js';
import { Colour_Codes } from '../../../../utils/constants';
import getElapsedHoursMinsSecs from '../../../../utils/date';
import DiscordBot from '../../../structures/client';
import getUserBanner from '../../getUserBanner';

const whoisConstructor = async (
	client: DiscordBot,
	message: Message,
	target: User,
	guildMember: GuildMember,
	roles: string
) => {
	const whoisEmbed = new EmbedBuilder()
		.setColor(Colour_Codes.GREEN)
		.setAuthor({
			name: target.tag,
			iconURL: target.displayAvatarURL(),
			// url: "",
		})
		.setThumbnail(target.displayAvatarURL({ forceStatic: false }))
		.addFields(
			{
				name: 'Joined:',
				value: guildMember.joinedAt!.toUTCString(),
				inline: true,
			},
			{
				name: 'Registered:',
				value: target.createdAt.toUTCString(),
				inline: true,
			},
			{
				name: 'ID:',
				value: target.id,
				inline: true,
			},
			{
				name: 'Roles:',
				value: roles.slice(0, 3000) || 'No roles.',
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${message.author.tag} | ID: ${message.author.id}`,
			iconURL: message.author.displayAvatarURL({
				forceStatic: false,
			}),
		});

	// add activities as field embeds to embed, then return it.
	const presence = guildMember.presence;
	const activities = presence ? presence.activities : [];
	// console.log(activities);
	for (let i = 0; i < activities.length; ++i) {
		const a = activities[i];
		let valueStr: string = '';
		const emoji = a.emoji?.name || '';
		if (a.state) valueStr += `\n${emoji} *${a.state}*`;
		if (a.details) valueStr += `\n*${a.details}*`;
		let timeElapsed = a.timestamps?.start
			? '\n' +
			  (await getElapsedHoursMinsSecs(a.timestamps.start, new Date()))
			: '';

		whoisEmbed.addFields({
			name: `(${i + 1}) ${a.name}`,
			value:
				(valueStr || `*No further details available.*`) + timeElapsed,
			inline: true,
		});
	}

	// add user's banner (if exists)
	// get user's banner URL (convoluted method, as discord.js does not support it)
	const bannerURL = await getUserBanner(target.id);
	if (bannerURL) whoisEmbed.setImage(bannerURL);

	return whoisEmbed;
};

export default whoisConstructor;
