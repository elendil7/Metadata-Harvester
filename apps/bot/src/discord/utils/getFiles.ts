import { join } from 'path';
import { readdirSync } from 'fs';
import debug from 'debug';
import { Collection } from 'discord.js';

const LOG = debug('Metadata-Harvester:apps:bot:src:discord:utils:getFiles.ts');

export const getEvents = async () => {
	try {
		// for every directory in events folder, get event name, return array of events
		const path = join(__dirname, '../events');
		return readdirSync(path, 'utf-8')
			.filter(
				(file) =>
					file.endsWith('.ts') && !file.startsWith('register.events')
			)
			.map((file) => file.split('.ts')[0]);
	} catch (e) {
		LOG(e);
	}
};

export const getCommands = async () => {
	try {
		// for every directory AND subdirectory (1 level deep) in commands folder, get command names, return Collection of commandGroups (subdirectories) and their respective commands (files)
		const path = join(__dirname, '../commands');

		let commandGroups = new Collection<string, string[]>();

		const subDirectories = readdirSync(path, 'utf-8').filter(
			(file) => !file.endsWith('.ts')
		);

		// add each command (file) (string in array) to its resepctive commandGroup (directory) (string)
		// example of commandGroups collection: Collection {commandGroup: [command1,command2,command3]}
		subDirectories.forEach((dirName) => {
			const commandsInDir = readdirSync(
				`${path}/${dirName}`,
				'utf-8'
			).filter((file) => file.endsWith('.ts'));
			commandGroups.set(dirName, commandsInDir);
		});

		return commandGroups;

		/* readdirSync(`${path}/${dirName}`, 'utf-8').filter((file) =>
					file.endsWith('.ts')
				) */
	} catch (e) {
		LOG(e);
	}
};
