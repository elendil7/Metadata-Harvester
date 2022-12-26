import { Message } from 'discord.js';
import { DISCORD_BOT_PREFIX, DISCORD_OWNER_ID } from '../../utils/constants';
import debugPath from '../../utils/debugPath';
import {
	inadequatePermissionsEmbedConstructor,
	ownerOnlyEmbedConstructor,
} from '../embeds/reusable/inadequatePermissions';
import { unknownCommand } from '../embeds/reusable/invalidCommand';
import DiscordBot from '../structures/client';
import { getUser } from '../utils/compatibility/getUser';
import { getGuildMember } from '../utils/methods/getGuildMember';
const LOG = debugPath(__filename);

export async function commandHandler(client: DiscordBot, message: Message) {
	try {
		// ignore DMs
		if (!message.guild) return;
		// ignore other bots
		if (message.author.bot) return;
		// ignore if prefix not correct
		if (message.content[0] !== DISCORD_BOT_PREFIX) return;

		// get supposed command (message content)
		const messageContent = message.content.replace(DISCORD_BOT_PREFIX, '');
		// get command arguments by each indefinite spans of whitespace, then filter empty values out (keep falsy values though - only remove empty strings)
		const allArgs = messageContent.split(/ +/).filter((v) => v !== '');
		// get the only arguments required for the command (remove the command name)
		const args = allArgs.slice(1);

		// get the potential command, ensure that command is valid even in mixed case / uppercase
		const potentialCommand = allArgs[0].toLowerCase();

		// get user object
		const user = message.author;

		// if message content includes command name, execute the "run" method on that command
		for (const [cName, cCmd] of client.commands) {
			// console.log(cName, cObj);

			// if user entered a valid command
			if (cCmd.aliases.includes(potentialCommand)) {
				// if command can only be run by owner, and command creator is not the owner
				if (cCmd.ownerOnly && user.id !== DISCORD_OWNER_ID) {
					await message.reply({
						embeds: [await ownerOnlyEmbedConstructor(cCmd, user)],
					});
				}
				// if command requires permissions
				else if (cCmd.permissions.length > 0) {
					// fetch prerequisites (guildMember)
					const guildMember = await getGuildMember(
						user,
						message.guild
					);

					// get user's current permissions
					const userPermissions = guildMember.permissions;

					// check if user has all permissions
					const hasAllPermissions: boolean = cCmd.permissions.every(
						(perm) => userPermissions.has(perm)
					);

					// if user has all the permissions required to execute the command, execute it
					if (hasAllPermissions) {
						await cCmd.run(client, message, args);
					}
					// otherwise, print embed saying that user does not have the required permissions
					else {
						// get user's missing permissions (permissions that the user does not have, but the command requires)
						const missingPermissions: bigint[] =
							cCmd.permissions.filter(
								(perm) => !userPermissions.has(perm)
							);

						// reply with embed saying that user does not have the required permissions
						await message.reply({
							embeds: [
								await inadequatePermissionsEmbedConstructor(
									cCmd,
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
					await cCmd.run(client, message, args);
				}
				// break out of method
				return;
			}
		}

		// if command does not exist
		await message.reply({
			embeds: [await unknownCommand(user, messageContent)],
		});
	} catch (e) {
		LOG(e);
	}
}
