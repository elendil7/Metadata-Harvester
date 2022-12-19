const sleep = (seconds: number) =>
	new Promise((res) => {
		setTimeout(res, seconds * 1000);
	});

export default sleep;
