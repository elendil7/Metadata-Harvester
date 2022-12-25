import { EmbedBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';
import {
	Colour_Codes,
	GIF_Links,
	messageORinteraction,
	Symbols,
} from '../../../utils/constants';
import DiscordBot from '../../structures/client';

const pingEmbededConstructor = async (
	client: DiscordBot,
	structure: messageORinteraction
) => {
	// if structure is a Message obj, store author property. Otherwise store user property (for CommandInteraction obj).
	// this is for compatibility purposes for the embed builder as seen below (message.author === interaction.user)
	let user = structure instanceof Message ? structure.author : structure.user;

	return new EmbedBuilder()
		.setColor(Colour_Codes.AQUA)
		.setTitle(`${Symbols.TABLE_TENNIS} Pong! ${Symbols.TABLE_TENNIS}`)
		.setThumbnail(GIF_Links.ANIMATED_CHECKMARK)
		.addFields(
			{
				name: 'Client latency',
				value:
					'```' +
					`${Math.abs(Date.now() - structure.createdTimestamp)}ms` +
					'```',
				inline: false,
			},
			{
				name: 'Websocket latency',
				value: '```' + `${client.ws.ping}ms` + '```',
				inline: false,
			},
			{
				name: 'Database latency',
				value: '```' + `N.A.` + '```',
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag || user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({
				forceStatic: false,
			}),
		});
};

export default pingEmbededConstructor;
