import { EmbedBuilder } from '@discordjs/builders';
import { GuildMember, Message, User } from 'discord.js';
import { Colour_Codes } from '../../../../utils/constants';
import DiscordBot from '../../../structures/client';

const whoisConstructor = async (
	client: DiscordBot,
	message: Message,
	target: User,
	guildUser: GuildMember,
	roles: string,
	bannerURL: string
) => {
	return new EmbedBuilder()
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
				value: guildUser.joinedAt!.toUTCString(),
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
};

export default whoisConstructor;
