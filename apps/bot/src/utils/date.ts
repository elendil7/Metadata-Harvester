const getElapsedHoursMinsSecs = async (oldDate: Date, newDate: Date) => {
	function secondsToHMS(secs: number) {
		function z(n: number) {
			return (n < 10 ? '0' : '') + Math.floor(n);
		}
		secs = Math.abs(secs);
		return (
			z((secs / 3600) | 0) +
			':' +
			z(((secs % 3600) / 60) | 0) +
			':' +
			z(secs % 60)
		);
	}

	return (
		'`' +
		`${secondsToHMS(
			(newDate.getTime() - oldDate.getTime()) / 1000
		)} elapsed` +
		'`'
	);
};
export default getElapsedHoursMinsSecs;
