import DiscordBot from '../../structures/DiscordBot';
import { EmbedBuilder } from '@discordjs/builders';
import { Message, User } from 'discord.js';
import {
	Symbols,
	Colour_Codes,
	DISCORD_BOT_PREFIX,
} from '../../../utils/constants';
import Command from '../../structures/Command';

export const invalidCommandConstructor = async (
	user: User,
	command: Command
) => {
	return new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle(`${Symbols.FAILURE} Invalid Command`)
		.addFields(
			{
				name: `Command:`,
				value: `\`${command.name}\``,
				inline: true,
			},
			{
				name: `Issue:`,
				value: `\`Command was entered incorrectly.\``,
				inline: true,
			},
			{
				name: `Proper usage:`,
				value: command.aliases
					.map((v) => `\`${DISCORD_BOT_PREFIX + v}\``)
					.join(', '),
				inline: true,
			},
			{
				name: `What to do now?`,
				value: `\`Run ${DISCORD_BOT_PREFIX}help command for information on commands.\``,
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({ forceStatic: false }),
		});
};

export const unknownCommand = (user: User, messageContent: string) => {
	// create embed that says command is unknown
	return new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle(`${Symbols.FAILURE} Unknown Command`)
		.addFields(
			{
				name: `Command:`,
				value: `\`${messageContent.trim().slice(0, 30)}\``,
				inline: false,
			},
			{
				name: `Issue:`,
				value: '`No such command exists`',
				inline: false,
			},
			{
				name: `What to do now?`,
				value: `\`Run ${DISCORD_BOT_PREFIX}help command for information on commands.\``,
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({ forceStatic: false }),
		});
};
