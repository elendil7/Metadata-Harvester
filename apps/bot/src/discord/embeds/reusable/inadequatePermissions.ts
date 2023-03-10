import { EmbedBuilder } from '@discordjs/builders';
import { User } from 'discord.js';
import {
	Colour_Codes,
	DISCORD_BOT_PREFIX,
	Discord_Permissions,
	Symbols,
} from '../../../utils/constants';
import Command from '../../structures/Command';

export const inadequatePermissionsEmbedConstructor = (
	command: Command,
	user: User,
	missingPermissions: bigint[]
) => {
	return new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle(`${Symbols.FAILURE} Inadequate Permissions`)
		.addFields(
			{
				name: `Command:`,
				value: `\`${command.name}\``,
				inline: false,
			},
			{
				name: `Issue:`,
				value: '`You do not have the required permissions to execute this command.`',
				inline: false,
			},
			{
				name: `Permissions required:`,
				value: command.permissions
					.map((v) => {
						const z = String(v);
						return `\`${
							z in Discord_Permissions
								? Discord_Permissions[
										z as keyof typeof Discord_Permissions
								  ]
								: v
						}\``;
					})
					.join(', '),
				inline: true,
			},
			{
				name: `Missing permissions`,
				value: missingPermissions
					.map((v) => {
						const z = String(v);
						return `\`${
							z in Discord_Permissions
								? Discord_Permissions[
										z as keyof typeof Discord_Permissions
								  ]
								: v
						}\``;
					})
					.join(', '),
				inline: true,
			},
			{
				name: `Further steps:`,
				value: `\`Run ${DISCORD_BOT_PREFIX}help for more information on commands.\``,
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({ forceStatic: false }),
		});
};

export const ownerOnlyEmbedConstructor = (command: Command, user: User) => {
	return new EmbedBuilder()
		.setColor(Colour_Codes.RED)
		.setTitle(`${Symbols.FAILURE} Inadequate Permissions`)
		.addFields(
			{
				name: `Command:`,
				value: `\`${command.name}\``,
				inline: false,
			},
			{
				name: `Issue:`,
				value: '`This command can only be executed by the bot owner.`',
				inline: false,
			},
			{
				name: `Further steps:`,
				value: `\`Run ${DISCORD_BOT_PREFIX}help for more information on available commands.\``,
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({ forceStatic: false }),
		});
};
