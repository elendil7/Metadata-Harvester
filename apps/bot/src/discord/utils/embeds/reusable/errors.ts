import { EmbedBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';
import DiscordBot from '../../../structures/client';
import { Colour_Codes, Symbols } from '../../../../utils/constants';
import debugPath from '../../../../utils/debugPath';
const LOG = debugPath(__filename);

const errorConstructor = (
	client: DiscordBot,
	message: Message,
	error: Error
) => {
	try {
		// log error to terminal
		LOG(`${Symbols.FAILURE} ${error.name}`, error);

		// construct and send error embed
		const errorMessage = new EmbedBuilder()
			.setColor(Colour_Codes.RED)
			.setTitle(error.name)
			// .setURL('https://discord.js.org/')
			.setAuthor({
				name: `A wild bug has been spotted ${Symbols.BUG}`,
				iconURL:
					'https://hotemoji.com/images/dl/3/bug-emoji-by-google.png',
				// url: '',
			})
			.setThumbnail('https://cdn3.emoji.gg/emojis/cowboybug.png')
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
					value: message.cleanContent.slice(0, 30),
					inline: false,
				}
			)
			.setImage(
				'https://yaytext.com/static/849ed9f31f0598a4b5c4df1057844e63/31987/bug-emoji.png'
			)
			.setTimestamp()
			.setFooter({
				text: `User: ${message.author.tag} | ID: ${message.author.id}`,
				iconURL: message.author.displayAvatarURL({
					forceStatic: false,
				}),
			});

		message.reply({ embeds: [errorMessage] });
	} catch (e) {
		LOG(e);
	}
};

export default errorConstructor;
