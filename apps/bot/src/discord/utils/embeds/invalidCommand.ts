import { DiscordBot } from '../../startDiscordBot';
import { EmbedBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';
import {
	Symbols,
	Colour_Codes,
	DISCORD_BOT_PREFIX,
} from '../../../utils/constants';
import Command from '../../commands/register.commands';

const invalidCommandConstructor = (
	client: DiscordBot,
	message: Message,
	args: string[],
	command: Command
) => {
	const invalidCommandEmbed = new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle(`${Symbols.FAILURE} Invalid Command`)
		// .setURL('https://discord.js.org/')
		/* 		.setAuthor({
			name: `A wild bug has been spotted ${Symbols.BUG}`,
			iconURL: 'https://hotemoji.com/images/dl/3/bug-emoji-by-google.png',
			// url: '',
		}) */
		// .setThumbnail('https://cdn3.emoji.gg/emojis/cowboybug.png')
		// .setDescription(`Error content: ${error.message}`)
		// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{
				name: `Command:`,
				value: message.content,
				inline: true,
			},
			{
				name: `Issue:`,
				value: 'No such command exists',
				inline: true,
			},
			{
				name: `Proper usage:`,
				value: command.aliases
					.map((v) => DISCORD_BOT_PREFIX + v)
					.join(', '),
				inline: true,
			},
			{
				name: `What to do now?`,
				value: `Run ${DISCORD_BOT_PREFIX}help command for information on commands.`,
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${message.author.tag} | ID: ${message.author.id}`,
			iconURL: message.author.displayAvatarURL({ forceStatic: false }),
		});

	message.reply({ embeds: [invalidCommandEmbed] });
};

export default invalidCommandConstructor;
