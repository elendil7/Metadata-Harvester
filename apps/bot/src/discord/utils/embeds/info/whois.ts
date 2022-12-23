import { EmbedBuilder } from '@discordjs/builders';
import { GuildMember, Message, User } from 'discord.js';
import { Colour_Codes } from '../../../../utils/constants';
import DiscordBot from '../../../structures/client';

const whoisConstructor = async (
	client: DiscordBot,
	message: Message,
	target: User,
	guildMember: GuildMember,
	roles: string,
	bannerURL: string
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
				name: 'Roles:',
				value: roles.slice(0, 3000) || 'No roles.',
				inline: false,
			}
		)
		.setImage(bannerURL)
		.setTimestamp()
		.setFooter({
			text: `User: ${message.author.tag} | ID: ${message.author.id}`,
			iconURL: message.author.displayAvatarURL({
				forceStatic: false,
			}),
		});

	// add activities as field embeds to embed, then return it.
	const activities = guildMember.presence!.activities;
	for (let i = 0; i < activities.length; ++i) {
		const a = activities[i];
		let valueStr: string = '';
		const emoji = a.emoji?.name || '';
		if (a.state) valueStr += `\n${emoji} *${a.state}*`;
		if (a.details) valueStr += `\n${emoji} *${a.details}*`;
		whoisEmbed.addFields({
			name: `(${i + 1}) ${a.name}`,
			value: valueStr,
			inline: true,
		});
	}

	// console.log(activities);

	return whoisEmbed;
};

export default whoisConstructor;
