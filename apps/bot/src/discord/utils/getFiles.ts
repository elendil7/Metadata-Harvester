import { join } from 'path';
import { readdirSync } from 'fs';
import { Collection } from 'discord.js';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

export const getEvents = async (searchDir: string) => {
	try {
		// construct excluded file
		const excludedFile = `!load.${searchDir}`;

		// get path to specified directory
		const path = join(__dirname, `../${searchDir}`);

		// for every directory in events folder, get event name, return array of events
		return readdirSync(path, 'utf-8')
			.filter(
				(file) => file.endsWith('.ts') && !file.includes(excludedFile)
			)
			.map((file) => file.split('.ts')[0]);
	} catch (e) {
		LOG(e);
	}
};

export const getCommands = async (searchDir: string) => {
	try {
		// construct excluded file
		const excludedFile = `!load.${searchDir}`;

		// get path to specified directory
		const path = join(__dirname, `../${searchDir}`);

		// create collection for storing commands in it
		let commandGroups = new Collection<string, string[]>();

		// recursively scan directory & subdirectories for .ts command files (excluding "register.{searchDir}")
		// scan directory for any subdirectories (excluding ts)
		const subDirectories = readdirSync(path, 'utf-8').filter(
			(dir) => !dir.endsWith('.ts')
		);

		// add each command (file) (string in array) to its resepctive commandGroup (directory) (string)
		// example of commandGroups collection: Collection {commandGroup: [command1,command2,command3]}
		subDirectories.forEach((dirName) => {
			const commandsInDir = readdirSync(`${path}/${dirName}`, 'utf-8')
				.filter(
					(file) =>
						file.endsWith('.ts') && !file.includes(excludedFile)
				)
				.map((file) => file.split('.ts')[0]);
			commandGroups.set(dirName, commandsInDir);
		});

		return commandGroups;
	} catch (e) {
		LOG(e);
	}
};
