import DiscordBot from '../../structures/client';
import { EmbedBuilder } from '@discordjs/builders';
import {
	Symbols,
	Colour_Codes,
	DISCORD_BOT_PREFIX,
} from '../../../utils/constants';
import { CommandInteraction } from 'discord.js';

const invalidSlashCommandConstructor = async (
	client: DiscordBot,
	interaction: CommandInteraction
) => {
	return new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle(`${Symbols.FAILURE} Invalid Slash Command`)
		.addFields(
			{
				name: `Slash command:`,
				value: interaction.commandName,
				inline: true,
			},
			{
				name: `Issue:`,
				value: 'No such command exists',
				inline: true,
			},
			{
				name: `Proper usage:`,
				value: `/${interaction.commandName}`,
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
			text: `User: ${interaction.user.tag} | ID: ${interaction.user.id}`,
			iconURL: interaction.user.displayAvatarURL({ forceStatic: false }),
		});
};

export default invalidSlashCommandConstructor;
