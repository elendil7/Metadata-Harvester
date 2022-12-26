import { CommandInteraction, EmbedBuilder, Message } from 'discord.js';
import {
	Category_Emojis,
	Command_Group_Colours,
	DISCORD_BOT_PREFIX,
	Discord_Permissions,
	messageORinteraction,
} from '../../../utils/constants';
import DiscordBot from '../../structures/client';
import Command from '../../structures/command';
import { getUser } from '../../utils/compatibility/getUser';

export const helpCategoryEmbedConstructor = async (
	client: DiscordBot,
	structure: messageORinteraction
) => {
	const user = await getUser(client, structure);

	const embed = new EmbedBuilder()
		.setColor(Command_Group_Colours.INFO_COLOUR)
		.setTitle('Help Menu')
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag || user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({
				forceStatic: false,
			}),
		});

	if (structure instanceof Message) {
		// get command groups
		interface CommandGroups {
			[key: string]: Command[];
		}

		const groupedCommands: CommandGroups = {};

		client.commands.forEach((v, k) => {
			const group = v.group;
			if (!groupedCommands[group]) groupedCommands[group] = [];
			groupedCommands[group].push(v);
		});

		for (const key in groupedCommands) {
			const val = groupedCommands[key];
			embed.addFields({
				// @ts-ignore
				name: `${
					Category_Emojis[
						key.toUpperCase() as keyof typeof Category_Emojis
					] + ' ' || ''
				}${key[0].toUpperCase() + key.slice(1)}`,
				value: val.map((cmd: Command) => `\`${cmd.name}\``).join(', '),
				inline: true,
			});
		}
	} else if (structure instanceof CommandInteraction) {
		client.slashCommands.forEach((v, k) => {
			embed.addFields({
				name: k,
				value: `\`${v.data.description}\`\nGroup: ${v.group}`,
				inline: false,
			});
		});
	}

	return embed;
};

export const helpCommandEmbedConstructor = async (
	client: DiscordBot,
	structure: messageORinteraction,
	command: Command
) => {
	const user = await getUser(client, structure);

	const embed = new EmbedBuilder()
		.setColor(Command_Group_Colours.INFO_COLOUR)
		.setTitle(command.name)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag || user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({
				forceStatic: false,
			}),
		});

	if (structure instanceof Message) {
		embed.addFields(
			{
				name: 'Aliases',
				value:
					command.aliases
						.map((v) => `\`${DISCORD_BOT_PREFIX}${v}\``)
						.join(', ') || '`None`',
				inline: false,
			},
			{
				name: 'Permissions required',
				value:
					command.permissions
						.map((v) => {
							// check if value v is a key inside the Discord_Permissions enum. If it is, return the enum value, else return the key (permission BigInt number)
							const z = String(v);
							return `\`${
								z in Discord_Permissions
									? Discord_Permissions[
											// hacky way to assert that z is a key type of the Discord_Permissions enum (without using @ts-ignore)
											z as keyof typeof Discord_Permissions
									  ]
									: v
							}\``;
						})
						.join(', ') || '`None`',
				inline: false,
			},
			{
				name: 'Description',
				value: `\`${command.description || 'None'}\``,
				inline: false,
			}
		);
	} else if (structure instanceof CommandInteraction) {
	}

	return embed;
};
