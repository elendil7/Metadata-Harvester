export default interface ActiveCooldownProperties {
	cooldownTimeInMS: number; // the command's cooldown time in MS
	dateAddedInMS: number; // the date the cooldown was added in MS
	totalTimesUsed: number; // the total number of times the command has been used by the user while the cooldown is active
}
