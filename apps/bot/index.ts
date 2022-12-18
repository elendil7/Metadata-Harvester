require('dotenv').config();
import debug from 'debug';
import { Symbols } from './src/utils/constants';
import { initiateClient } from './src/discord/startDiscordBot';

const LOG = debug('Metadata-Harvester:apps:bot:index.ts');

const execute = async () => {
	LOG(`${Symbols.LOADING} Loading bot components sequentially...`);

	// * Full discord bot initialization
	/* 
        - Discord bot (client, commands, events)
        - Databases
        - API (server)
    */

	// start discord bot
	const bot = initiateClient();

	// resister events
	await bot.loadEvents();

	// register commands
	await bot.loadCommands();

	LOG(`${Symbols.SUCCESS} Bot successfully loaded!`);
};

execute();
