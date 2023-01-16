import { EmbedBuilder, Message } from 'discord.js';
import { DISCORD_BOT_PREFIX, DISCORD_OWNER_ID } from '../../../utils/constants';
import debugPath from '../../../utils/debugPath';
import {
	inadequatePermissionsEmbedConstructor,
	ownerOnlyEmbedConstructor,
} from '../../embeds/reusable/inadequatePermissions';
import { unknownCommand } from '../../embeds/reusable/invalidCommand';
import DiscordBot from '../../structures/DiscordBot';
import { getGuildMember } from '../../utils/methods/getGuildMember';
import { commandCooldownHandler } from '../cooldown/handler.command.cooldown';
const LOG = debugPath(__filename);

export async function commandHandler(client: DiscordBot, message: Message) {
	try {
		// ignore DMs
		if (!message.guild) return;
		// ignore other bots
		if (message.author.bot) return;
		// ignore messages that contain embeds
		if (message.embeds.length > 0) return;
		// ignore if prefix not correct
		if (message.content.trim()[0] !== DISCORD_BOT_PREFIX) return;

		// get supposed command (message content)
		const messageContent = message.content.replace(DISCORD_BOT_PREFIX, '');
		// get command arguments by each indefinite spans of whitespace, then filter empty values out (keep falsy values though - only remove empty strings)
		const args = messageContent.split(/ +/).filter((v) => v !== '');

		// get first argument & get the only arguments required for the command (remove the command name) simultaneously
		const firstArg = args.shift();

		// if first argument is empty "", return
		if (!firstArg) return;

		// get the potential command, ensure that command is valid even in mixed case / uppercase
		const potentialCommand = firstArg.toLowerCase();

		// get user object
		const user = message.author;

		// define command
		let command;

		// if message content includes command name, execute the "run" method on that command
		for (const [cName, cCmd] of client.commands) {
			if (cCmd.aliases.includes(potentialCommand)) {
				// get command and store as external variable (if cmd exists)
				command = cCmd;
				break;
			}
		}

		// if user entered a valid command (command exists)
		if (command) {
			// cooldown implementation (if cooldown is active, send returned embed saying that command is on cooldown, and simultaneously break out of function). Otherwise, do nothing and continue with the rest of the code
			const cooldownEmbed = await commandCooldownHandler(
				command,
				user,
				message.guild
			);
			if (cooldownEmbed) {
				message.reply({ embeds: [cooldownEmbed] });
				return;
			}
		}

		// if user entered a valid command (command exists)
		if (command) {
			// if command can only be run by owner, and command creator is not the owner
			if (command.ownerOnly && user.id !== DISCORD_OWNER_ID) {
				message.reply({
					embeds: [ownerOnlyEmbedConstructor(command, user)],
				});
			}
			// if command requires permissions
			else if (command.permissions.length > 0) {
				// fetch prerequisites (guildMember)
				const guildMember = await getGuildMember(user, message.guild);

				// get user's current permissions
				const userPermissions = guildMember.permissions;

				// check if user has all permissions
				const hasAllPermissions: boolean = command.permissions.every(
					(perm) => userPermissions.has(perm)
				);

				// if user has all the permissions required to execute the command, execute it
				if (hasAllPermissions) {
					command.run(client, message, args);
				}
				// otherwise, print embed saying that user does not have the required permissions
				else {
					// get user's missing permissions (permissions that the user does not have, but the command requires)
					const missingPermissions: bigint[] =
						command.permissions.filter(
							(perm) => !userPermissions.has(perm)
						);

					// reply with embed saying that user does not have the required permissions
					message.reply({
						embeds: [
							inadequatePermissionsEmbedConstructor(
								command,
								user,
								missingPermissions
							),
						],
					});
				}
			}
			// if all checks pass, simply run the command
			else {
				// run command
				command.run(client, message, args);
			}
		} else {
			// if command does not exist
			message.reply({
				embeds: [unknownCommand(user, messageContent)],
			});
		}
	} catch (e) {
		LOG(e);
	}
}
