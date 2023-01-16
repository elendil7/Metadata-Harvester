import { User } from 'discord.js';
import { cooldownManager } from '../../../..';
import UserCooldown from '../models/UserCooldown';

const getUserCooldown = (user: User): UserCooldown => {
	return cooldownManager.getCooldown(user);
};

export default getUserCooldown;
