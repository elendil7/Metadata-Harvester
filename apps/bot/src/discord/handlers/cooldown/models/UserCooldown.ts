import ActiveCooldownProperties from './ActiveCooldownProperties';

export default interface UserCooldown {
	cooldowns: {
		all: Map<string, ActiveCooldownProperties>; // map of all cooldowns: Map<commandName, {cooldownTimeInMS, dateAddedInMS}>
		totalTime: number; // total time of all cooldowns (above) in MS
	};
	warningLevel: {
		startTime: number; // when the current level of warningLevel was added
		stage: number; // 0,1,2 = no warning, 3 = stackingWarningLevel + 1. Upon hitting 3, warningLevel resets to 0.
	};
	stackingWarningLevel: {
		startTime: number; // when the current level of stackingWarningLevel was added
		stage: number; // 0 = no warning, 1 = warn, 2 = timeout, 3 = kick, 4 = ban. Should reset to previous WarningLevel every "n" seconds, where "n" varys based on the WarningLevel severity};
	};
}
