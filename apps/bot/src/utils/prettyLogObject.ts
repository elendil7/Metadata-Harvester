import { Debugger } from 'debug';

type formatOptions = 'normal' | 'pretty';
type objOrStr = object | string;

export const prettyLogObject = (
	object: any,
	formatMethod?: formatOptions,
	LOG?: Debugger
) => {
	let output: objOrStr;

	if (formatMethod === 'normal') {
		output = object;
	} else {
		output = JSON.stringify(object, null, 4);
	}

	console.log('\n');
	if (LOG) LOG(output);
	else console.log(output);
	console.log('\n');
};
