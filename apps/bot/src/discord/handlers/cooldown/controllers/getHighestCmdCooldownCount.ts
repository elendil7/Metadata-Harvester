import ActiveCooldownProperties from '../models/ActiveCooldownProperties';
import UserCooldown from '../models/UserCooldown';

const highestCmdCooldownCount = (
	allCooldowns: Map<string, ActiveCooldownProperties>
): number => {
	let highestCount = 0;
	allCooldowns.forEach((cooldown) => {
		if (cooldown.totalTimesUsed > highestCount) {
			highestCount = cooldown.totalTimesUsed;
		}
	});
	return highestCount;
};
export default highestCmdCooldownCount;
