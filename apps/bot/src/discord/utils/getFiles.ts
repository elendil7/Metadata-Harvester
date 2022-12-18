import { join } from 'path';
import { readdirSync } from 'fs';

export const getEvents = () => {
	try {
		const path = join(__dirname, '../events');
		return readdirSync(path, 'utf-8')
			.filter((file) => file.endsWith('.ts'))
			.map((file) => file.split('.ts')[0]);
	} catch (e) {
		console.error(e);
	}
};

export const getCommands = () => {
	try {
		const path = join(__dirname, '../commands');
		return readdirSync(path, 'utf-8')
			.filter((file) => file.endsWith('.ts'))
			.map((file) => file.split('.ts')[0]);
	} catch (e) {
		console.error(e);
	}
};
