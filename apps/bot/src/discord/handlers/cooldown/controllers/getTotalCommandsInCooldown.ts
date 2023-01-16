import ActiveCooldownProperties from '../models/ActiveCooldownProperties';

const totalCmdsInCooldown = (
	allCooldowns: Map<string, ActiveCooldownProperties>
): number => {
	return allCooldowns.size;
};
export default totalCmdsInCooldown;
