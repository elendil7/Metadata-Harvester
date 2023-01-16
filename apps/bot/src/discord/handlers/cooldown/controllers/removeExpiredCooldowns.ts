import { User } from 'discord.js';
import UserCooldown from '../models/UserCooldown';

export const removeExpiredCooldowns = (
	userCooldown: UserCooldown,
	currentTimeMS: number
) => {
	// loop through all of user's cooldowns, and remove any that have passed their expiration time
	for (const [commandName, cooldownProperties] of userCooldown.cooldowns
		.all) {
		// get necessary properties
		const totalTimesUsed = cooldownProperties.totalTimesUsed;
		const cooldownTimeInMS = cooldownProperties.cooldownTimeInMS;
		const totalCooldownTime = cooldownTimeInMS * totalTimesUsed; // total cooldown time (number of times command has been used whilst cooldown is active * predefined cooldown time) (e.g., 5 times used * 2 second cooldown = 10 seconds)
		const dateAddedInMS = cooldownProperties.dateAddedInMS;

		// remove cooldown if it has passed its expiration time
		if (currentTimeMS - dateAddedInMS >= totalCooldownTime) {
			// remove cooldown from Map
			userCooldown.cooldowns.all.delete(commandName);
			// update totalTime of all cooldowns combined
			userCooldown.cooldowns.totalTime -= totalCooldownTime;
		}
	}

	// return updated userCooldown object, with any expired cooldowns removed
	return userCooldown;
};
