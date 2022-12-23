import { EmbedBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';
import DiscordBot from '../../../structures/client';
import {
	Colour_Codes,
	messageORinteraction,
	PNG_Links,
	Symbols,
} from '../../../../utils/constants';
import debugPath from '../../../../utils/debugPath';
const LOG = debugPath(__filename);

const errorConstructor = (
	client: DiscordBot,
	structure: messageORinteraction,
	error: Error
) => {
	let command;
	let user;
	if (structure instanceof Message) {
		command = structure.content;
		user = structure.author;
	} else {
		command = `${structure.commandName}: ${structure.command?.description}`;
		user = structure.user;
	}

	try {
		// log error to terminal
		LOG(`${Symbols.FAILURE}`, error);

		// construct and send error embed
		const errorMessage = new EmbedBuilder()
			.setColor(Colour_Codes.RED)
			.setAuthor({
				name: `A wild bug has been spotted ${Symbols.BUG}`,
				iconURL: PNG_Links.BUG_EMOJI,
				// url: '',
			})
			.setTitle(`${Symbols.FAILURE} ${error.name}`)
			// .setURL('https://discord.js.org/')
			.setThumbnail(PNG_Links.BUG_COWBOY)
			// .setDescription(`Error content: ${error.message}`)
			// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.addFields(
				{
					name: `Name:`,
					value: error.name,
					inline: true,
				},
				{
					name: `Message:`,
					value: error.message,
					inline: true,
				},
				{
					name: `Location:`,
					value: 'Unavailable' /* ((v) => (v ? v : 'unavailable'))(
					error.stack?.split('\n')[1].split(' ')[1]
				) */,
					inline: false,
				},
				{
					name: `Command responsible for this:`,
					value: '' + command.slice(0, 30),
					inline: false,
				}
			)
			.setImage(PNG_Links.BUG_EVOLUTION)
			.setTimestamp()
			.setFooter({
				text: `User: ${user.tag} | ID: ${user.id}`,
				iconURL: user.displayAvatarURL({
					forceStatic: false,
				}),
			});

		structure.reply({ embeds: [errorMessage] });
	} catch (e) {
		LOG(e);
	}
};

export default errorConstructor;
