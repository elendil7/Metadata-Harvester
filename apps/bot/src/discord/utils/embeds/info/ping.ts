import { EmbedBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';
import {
	Colour_Codes,
	Gif_Links,
	messageORinteraction,
	Symbols,
} from '../../../../utils/constants';
import DiscordBot from '../../../structures/client';

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
		.setThumbnail(Gif_Links.ANIMATED_CHECKMARK)
		.setDescription(
			[
				'**Client latency**',
				'```' +
					`${Math.abs(Date.now() - structure.createdTimestamp)}ms` +
					'```',
				'**Websocket latency**',
				'```' + `${client.ws.ping}ms` + '```',
				'**Database latency**',
				'```' + 'N.A.' + '```',
			].join('\n')
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
