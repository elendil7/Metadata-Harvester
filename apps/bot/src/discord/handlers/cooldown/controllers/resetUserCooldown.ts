import ActiveCooldownProperties from '../models/ActiveCooldownProperties';
import UserCooldown from '../models/UserCooldown';

const resetUserCooldown = (msNow: number) => {
	return {
		cooldowns: {
			all: new Map<string, ActiveCooldownProperties>(),
			totalTime: 0,
		},
		warningLevel: {
			startTime: msNow,
			stage: 0,
		},
		stackingWarningLevel: {
			startTime: msNow,
			stage: 0,
		},
	} as UserCooldown;
};

export default resetUserCooldown;
