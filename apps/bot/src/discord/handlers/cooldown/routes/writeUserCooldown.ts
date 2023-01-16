import { User } from 'discord.js';
import { cooldownManager } from '../../../..';
import UserCooldown from '../models/UserCooldown';

const writeUserCooldown = (userCooldown: UserCooldown, user: User): void => {
	// write updated UserCooldown object to the CooldownManager userCooldowns field (Map<string, UserCooldown>)
	cooldownManager.updateCooldown(user.id, userCooldown);
};
export default writeUserCooldown;
