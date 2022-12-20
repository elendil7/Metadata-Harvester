require('dotenv').config();
import debug from 'debug';
import { DISCORD_BOT_TOKEN, Symbols } from './utils/constants';
import { initiateClient } from './discord/startDiscordBot';

const LOG = debug('Metadata-Harvester:apps:bot:index.ts');

const execute = async () => {
	LOG(`<<<${new Date().toUTCString()}>>>`);
	LOG(`${Symbols.LOADING} Loading program components sequentially...`);

	// * Full discord bot initialization
	/* 
        - Discord bot (client, commands, events)
        - Databases
        - API (server)
    */

	// initiate instance of DiscordBot
	const DiscordBot = await initiateClient();

	// resister events
	await DiscordBot.loadEvents();

	// register commands
	await DiscordBot.loadCommands();

	// start discord bot (with partials, intents, and cache)
	await DiscordBot.start(DISCORD_BOT_TOKEN);

	LOG(`${Symbols.SUCCESS} Program successfully loaded!`);
};

execute();
