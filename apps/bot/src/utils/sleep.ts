export const sleep = (seconds: number) =>
	new Promise((res) => {
		setTimeout(res, seconds * 1000);
	});

export const randomSleep = async (minSecs: number, maxSecs: number) => {
	return await sleep(
		Math.floor(Math.random() * (maxSecs - minSecs + 1) + minSecs)
	);
};
