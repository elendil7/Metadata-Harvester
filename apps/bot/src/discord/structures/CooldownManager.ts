import { User } from 'discord.js';
import UserCooldown from '../handlers/cooldown/models/UserCooldown';
import debugPath from '../../utils/debugPath';
import ActiveCooldownProperties from '../handlers/cooldown/models/ActiveCooldownProperties';
import resetUserCooldown from '../handlers/cooldown/controllers/resetUserCooldown';
const LOG = debugPath(__filename);

export default class CooldownManager {
	private userCooldowns: Map<string, UserCooldown>;

	constructor() {
		this.userCooldowns = new Map<string, UserCooldown>();
		LOG('Cooldowns loaded.');
	}

	// set user's cooldown
	private setCooldown(user: User, uid?: string) {
		this.userCooldowns.set(
			uid || user.id,
			resetUserCooldown(new Date().getTime())
		);
	}

	// get user's cooldown
	public getCooldown(user: User): UserCooldown {
		// grab user's id
		const uid = user.id;

		// Check if user is already in cooldown (by ID)
		// If user is not in cooldown, add them to cooldown
		if (!this.userCooldowns.has(uid)) {
			this.setCooldown(user, uid);
		}

		// return UserCooldown object associated with user id
		// @ts-ignore
		return this.userCooldowns.get(uid);
	}

	// update user's cooldown
	public updateCooldown(uid: string, userCooldown: UserCooldown) {
		this.userCooldowns.set(uid, userCooldown);
	}

	public getWarningLevelMessage(warningLevel: number) {
		switch (warningLevel) {
			case 0:
				return 'No warning';
			case 1:
				return 'Timeout';
			case 2:
				return 'Kick';
			case 3:
				return 'Ban';
			default:
				return 'No warning';
		}
	}
}
