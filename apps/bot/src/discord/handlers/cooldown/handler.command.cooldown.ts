import { EmbedBuilder, Guild, User } from 'discord.js';
import Command from '../../structures/Command';
import { getGuildMember } from '../../utils/methods/getGuildMember';
import { DISCORD_OWNER_ID } from '../../../utils/constants';
import { cooldownStillActiveEmbed } from '../../embeds/cooldown/cooldownStillActive';
import { addCooldown } from './controllers/addCommandCooldown';
import { removeExpiredCooldowns } from './controllers/removeExpiredCooldowns';
import writeUserCooldown from './routes/writeUserCooldown';
import getUserCooldown from './routes/getUserCooldown';
import debugPath from '../../../utils/debugPath';
import { prettyLogObject } from '../../../utils/prettyLogObject';
import totalCmdsInCooldown from './controllers/getTotalCommandsInCooldown';
import highestCmdCooldownCount from './controllers/getHighestCmdCooldownCount';
import resetUserCooldown from './controllers/resetUserCooldown';
const LOG = debugPath(__filename);

export const commandCooldownHandler = async (
	cCmd: Command,
	user: User,
	guild: Guild
): Promise<EmbedBuilder | undefined> => {
	// scope for variables required in both try{} & finally{} blocks
	let userCooldown;

	try {
		// * edge cases
		// get user permissions, if they are a bot owner or admin, return (command execution endorsed, no cooldown required for em)
		const userPermissions = (await getGuildMember(user, guild)).permissions;
		if (
			user.id === DISCORD_OWNER_ID ||
			userPermissions.has('Administrator')
		)
			return;

		// * prerequisites
		// get things to work with
		userCooldown = getUserCooldown(user);
		const currentTimeMS = new Date().getTime();

		// perform basic initial operations on userCooldown object
		// remove expired cooldowns from user object
		userCooldown = removeExpiredCooldowns(userCooldown, currentTimeMS);

		// add new command cooldown to the user's cooldown Map (along with all its properties)
		userCooldown = addCooldown(userCooldown, currentTimeMS, cCmd);

		// increase warningLevel stage by 1
		userCooldown.warningLevel.stage += 1;

		// define more variables
		const allCooldowns = userCooldown.cooldowns.all;

		// if total commands (used by user) (currently in cooldown) is >= n
		// or if highest command cooldown count (of any command) is >= n,
		if (
			totalCmdsInCooldown(allCooldowns) >= 5 ||
			highestCmdCooldownCount(allCooldowns) >= 4
		) {
			// execute warning level handler code, to add either "warninglevel" or "stackingWarningLevel" to UserCooldown object respectively. Warn / Mute / Kick / Ban user if necessary.

			// increase warning level stage by 1
			// if warningLevel stage is >= 3 (should not ever get to anything higher than 3)
			if (userCooldown.warningLevel.stage >= 3) {
				// reset warning level stage to 0 & time to current time
				userCooldown.warningLevel.stage = 0;
				userCooldown.warningLevel.startTime = currentTimeMS;

				// increase stacking warning level stage by 1
				userCooldown.stackingWarningLevel.stage += 1;

				// warning handling as per stackingWarninglevel stage
				switch (userCooldown.stackingWarningLevel.stage) {
					case 1:
						return new EmbedBuilder().setTitle(
							`You just got warned. Stage 1.`
						);

					case 2:
						// mute / timeout user
						return new EmbedBuilder().setTitle(
							`You just got muted. Stage 2.`
						);
					case 3:
						// kick user
						return new EmbedBuilder().setTitle(
							`You just got kicked. Stage 3.`
						);
					case 4:
						// reset stacking warning level stage to 0 & time to current time
						userCooldown.stackingWarningLevel.stage = 0;
						// ban user
						return new EmbedBuilder().setTitle(
							`You just got banned. Stage 4.`
						);
					// extra block for edge case (should never get here)
					default:
						// perform some debugging code as to avoid future errors
						LOG(
							"WarningLevel stage is >= 3, but stackingWarningLevel stage isn't 1, 2, 3 or 4. Check code."
						);
						// reset UserCooldown object to default values
						userCooldown = resetUserCooldown(currentTimeMS);
						break;
				}
			}

			// return command execution denied embed
			return cooldownStillActiveEmbed(user);
		}

		// else, do nothing (command execution allowed)
	} catch (e) {
		LOG(e);
	} finally {
		// always write updated user cooldown to CooldownManager, regardless of return statement in previous function
		// write updated UserCooldown object to the CooldownManager userCooldowns field (Map<string, UserCooldown>)
		// if user is owner, do nothing
		if (userCooldown) {
			prettyLogObject(userCooldown, 'pretty');
			prettyLogObject(userCooldown.cooldowns.all, 'normal');
			writeUserCooldown(userCooldown, user);
		} else
			LOG(
				`owner / admin of name ${user.tag} && id ${user.id} ran the command and was not added to cooldowns, nothing to see here move along`
			);
	}
};
