import { User } from 'discord.js';
import UserCooldown from '../models/UserCooldown';
import Command from '../../../structures/Command';

export const addCooldown = (
	userCooldown: UserCooldown,
	currentTimeMS: number,
	cCmd: Command
) => {
	// define some variables
	const commandCooldown = cCmd.cooldown || 2000;
	const timesCommandHasBeenUsed =
		userCooldown.cooldowns.all.get(cCmd.name)?.totalTimesUsed || 0;

	// update ActiveCooldownProperties
	userCooldown.cooldowns.all.set(cCmd.name, {
		cooldownTimeInMS: commandCooldown,
		dateAddedInMS: currentTimeMS,
		totalTimesUsed: timesCommandHasBeenUsed + 1,
	});

	// update net total cooldown time
	userCooldown.cooldowns.totalTime += commandCooldown;

	// return cooldown to be used in main flow
	return userCooldown;
};
